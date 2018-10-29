const BumoSDK = require('bumo-sdk');
const fs = require('fs');

const sdk = new BumoSDK({
  host: '192.168.33.10:36002',
});


sdk.contract.call({
    optType: 2,
    contractAddress: 'buQdWdpDSHp47jgXUQThj6nj9Ad8x8UMBC24',
    // input: JSON.stringify({
    //   params: {
    //  }

    // }),
  }).then(data => {
    console.log(data);
    fs.writeFileSync("./query.json", JSON.stringify(data), { encoding: "utf8" });

}).catch(err => {
    console.log(err);
  });

