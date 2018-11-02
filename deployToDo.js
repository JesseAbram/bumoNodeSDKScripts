const BumoSDK = require('bumo-sdk');

const sdk = new BumoSDK({
  host: '192.168.33.10:36002',
});


const operationInfo = sdk.operation.contractCreateOperation({
  sourceAddress: 'buQgvdDfUjmK56K73ba8kqnE1d8azzCRYM9G',
  initBalance: '10000000',
  payload: `
  "use strict";

  function init()
  {
   storageStore('toDo', JSON.stringify([]));
  
   return;
  }
  
  function main(input)
  {
     

    const toDoStorage = storageLoad('toDo');
    let para = JSON.parse(input);
    let task = para.params;
    let toDo = JSON.parse(toDoStorage);

    if (para.method === 'add' ) {
     toDo.push(task);
    }else if (para.method === 'done'){
      let i = 0; 
      for (i = 0; i < toDo.length; i+=1) {
        if (toDo[i].desc === task.desc){
          toDo[i].completed = true;
        }
      }
    }
    storageStore('toDo', JSON.stringify(toDo));
   }

  function query()
  { 
   let result = {};
   
   result.toDo = storageLoad('toDo');
   return JSON.stringify(result);
  
  }
  `,
});


if (operationInfo.errorCode !== 0) {
  console.log(operationInfo);
  return;
}


const operationItem = operationInfo.result.operation;

console.log(operationItem);

const blobInfo = sdk.transaction.buildBlob({
  sourceAddress: 'buQgvdDfUjmK56K73ba8kqnE1d8azzCRYM9G',
  gasPrice: '1000',
  feeLimit: '5000306000',
  nonce: '148',
  operations: [ operationItem ],


});

console.log(blobInfo.errorCode);

if (blobInfo.errorCode !== 0) {
  console.log(blobInfo);
  return;
}


const blob = blobInfo.result.transactionBlob;

console.log(blob);

let signatureInfo = sdk.transaction.sign({
privateKeys: [ 'privbtEELf99kKzMAPJU17ceYzz5d6y8Y5gbEKc7WySG9NRAEmGibkiG' ],
blob,
});


if (signatureInfo.errorCode !== 0) {
console.log(signatureInfo);
return;
}

const signature = signatureInfo.result.signatures;

console.log(signature);



const transactionInfo = sdk.transaction.submit({
 blob,
 signature: signature,
}).then(info=> {
  console.log("---- transaction info")
console.log(info);
}).catch(err => {
console.log(err.message);
});


if (transactionInfo.errorCode !== 0) {
 console.log(transactionInfo);
}





