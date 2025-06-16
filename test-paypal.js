
const axios = require("axios");

async function testPayPalCredentials(clientId, clientSecret) {
  try {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const response = await axios.post(
      "https://api-m.paypal.com/v1/oauth2/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("✅ PayPal Credentials are valid!");
    return true;
  } catch (error) {
    console.error("❌ PayPal Credentials are invalid:", error.message);
    return false;
  }
}
