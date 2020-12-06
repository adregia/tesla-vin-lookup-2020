const {
  teslaToken,
  teslaAPIRoute,
  twilioAccountSID,
  twilioAccountToken,
  phoneNumber,
  myNumber,
} = require("./config");
console.log(twilioAccountSID, twilioAccountToken);
const axios = require("axios");
const client = require("twilio")(twilioAccountSID, twilioAccountToken, {
  lazyLoading: true,
});

module.exports.handler = async () => {
  console.log("Polling Tesla");

  const options = {
    method: "get",
    headers: {
      "User-Agent": "node-js",
      Authorization: `Bearer ${teslaToken}`,
    },
  };

  let result;
  try {
    result = await axios(`${teslaAPIRoute}api/1/vehicles`, options);
  } catch (error) {
    console.error("There was an error polling your Tesla Account: ", error);
    await client.messages.create({
      body: `There was an error polling your Tesla Account: ${error}`,
      from: phoneNumber,
      to: myNumber,
    });
    return;
  }

  if (result.data.count !== 0) {
    const { vin } = result.data.response[0] || {};
    await client.messages.create({
      body: `It looks like there's a VIN assigned to you! ${vin} - login to check (and turn off this Lambda)!`,
      from: phoneNumber,
      to: myNumber,
    });
  } else {
    console.log("No VIN found. :(");
  }

  return;
};
