import { Webhook } from "standardwebhooks";
// import DodoPayments from "dodopayments";
import createClient from "@/lib/supabase/api";

// const dodopayments = new DodoPayments({
//   bearerToken: process.env.DODO_PAYMENTS_API_KEY,
//   environment:
//     process.env.NODE_ENV === "development" ? "test_mode" : "live_mode", // defaults to 'live_mode'
// });

const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_SECRET);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const supabase = createClient(req, res);
    const body = req.body;

    const webhookHeaders = {
      "webhook-id": req.headers["webhook-id"] || "",
      "webhook-signature": req.headers["webhook-signature"] || "",
      "webhook-timestamp": req.headers["webhook-timestamp"] || "",
    };

    const raw = JSON.stringify(body);

    await webhook.verify(raw, webhookHeaders);

    const payload = req.body;

    if (payload.data.payload_type === "Subscription") {
      // IN FUTURE, WE CAN USE THIS TO GET THE SUBSCRIPTION DATA
      // const subscription = await dodopayments.subscriptions.retrieve(
      //   payload.data.subscription_id
      // );

      await supabase
        .from("profiles")
        .update({
          subscription_id: payload.data.subscription_id,
          subscription_status: payload.data.status,
        })
        .eq("email", payload.data.customer.email)
        .select()
        .single();

      switch (payload.type) {
        case "subscription.active":
          // const subscription = await dodopayments.subscriptions.retrieve(
          //   payload.data.subscription_id
          // );
          // console.log("-------SUBSCRIPTION DATA START ---------");
          // console.log(subscription);
          // console.log("-------SUBSCRIPTION DATA END ---------");
          break;
        case "subscription.failed":
          break;
        case "subscription.cancelled":
          break;
        case "subscription.renewed":
          break;
        case "subscription.on_hold":
          break;
        default:
          break;
      }
    } else if (payload.data.payload_type === "Payment") {
      switch (payload.type) {
        case "payment.succeeded":
          // const paymentDataResp = await dodopayments.payments.retrieve(
          //   payload.data.payment_id
          // );
          // console.log("-------PAYMENT DATA START ---------");
          // console.log(paymentDataResp);
          // console.log("-------PAYMENT DATA END ---------");
          break;
        default:
          break;
      }
    }

    // ... Rest of your code HERE ...
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(400).json({ error: "Webhook handler failed" });
  }
}
