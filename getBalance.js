const BumoSDK = require('bumo-sdk');
const fs = require('fs');


const sdk = new BumoSDK({
  host: '0.0.0.0:36002',
});


sdk.account.getInfo(address).then(info=> {
    console.log(info);
    fs.writeFileSync("./plat.json", JSON.stringify(info), { encoding: "utf8" });
}).catch(err => {
   console.log(err.message);
 });

