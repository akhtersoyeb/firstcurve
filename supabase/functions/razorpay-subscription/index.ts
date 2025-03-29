import { createClient } from "https://esm.sh/@supabase/supabase-js";
// import { createHmac, timingSafeEqual } from "https://deno.land/std@0.220.0/crypto/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
  {
    global: {
      headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}` },
    },
  }
);

// Function to verify Razorpay webhook signature
async function verifySignature(body: string, receivedSignature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const expectedSignature = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expectedSignature === receivedSignature;
}

serve(async (req: Request) => {
  try {
    console.l
    // Read Razorpay webhook secret
    const RAZORPAY_WEBHOOK_SECRET = Deno.env.get("RAZORPAY_WEBHOOK_SECRET")!;
    
    // Get raw body for signature verification
    const body = await req.text();
    const receivedSignature = req.headers.get("x-razorpay-signature");

    if (!receivedSignature || !verifySignature(body, receivedSignature, RAZORPAY_WEBHOOK_SECRET)) {
      throw new Error("Invalid signature");
    }

    // Parse JSON body after verification
    const event = JSON.parse(body);
    const subscription_id = event.payload.subscription?.entity?.id;
    const new_status = event.payload.subscription?.entity?.status;
    console.log(subscription_id, new_status);
    

    if (!subscription_id || !new_status) {
      return new Response(JSON.stringify({ error: "Missing subscription data" }), { status: 400 });
    }

    // Update the subscription status in Supabase
    const { error } = await supabase
      .from("profiles")
      .update({ subscription_status: new_status })
      .eq("subscription_id", subscription_id);
    
    if (error) {
      console.error('Error updating subscription status:', error);
    } else {
      console.log('Subscription status updated successfully.')
    }

    if (error) {
      return new Response(JSON.stringify({ error: "Failed to update subscription status" }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Webhook processed successfully" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
})
