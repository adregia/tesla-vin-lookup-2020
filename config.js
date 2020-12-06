const teslaToken = process.env.TESLA_TOKEN;
const teslaAPIRoute =
  process.env.TESLA_API_ROUTE || "https://owner-api.teslamotors.com/";
const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAccountToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.PHONE_NUMBER;
const myNumber = process.env.MY_NUMBER;

module.exports = {
  teslaToken,
  teslaAPIRoute,
  twilioAccountSID,
  twilioAccountToken,
  phoneNumber,
  myNumber,
};
