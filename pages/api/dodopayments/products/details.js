import DodoPayments from "dodopayments";

const dodoClient = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment:
    process.env.NODE_ENV === "development" ? "test_mode" : "live_mode", // defaults to 'live_mode'
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { product_id } = req.query;

    if (!product_id) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const subscription = await dodoClient.products.retrieve(product_id);
    return res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    console.error('error:', error)
    return res.status(500).json({
      success: false,
      error: "Failed to fetch product details",
      message: error.message || "Internal server error",
    });
  }
}
