const BumoSDK = require('bumo-sdk');
const fs = require('fs');


const sdk = new BumoSDK({
  host: '192.168.33.10:36002',
});

const hash = "b35f17cad70687f25bb9011cb897ebe575d76728a035521848ebd7118cdb5386";

sdk.contract.getAddress(hash).then(data => {
    console.log(data);
    fs.writeFileSync("./address.json", JSON.stringify(data), { encoding: "utf8" });

}).catch(err => {
    console.log(err);
  });

