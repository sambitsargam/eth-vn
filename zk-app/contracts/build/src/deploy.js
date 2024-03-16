import { Mina, PrivateKey } from 'o1js';
import { RecycleCompany } from './Add.js';
let feepayerKeysBase58 = { privateKey: 'EKDoFmBGfHteBy85hLZhE1gvMtetAEtphE3zD5tidEQ3i7hfGMfW', publicKey: 'B62qn6PytZJUJAVjZbFssM69C6F9JsvvBEBkHCue1QmfwLgAazYR8m6' };
let zkAppKeysBase58 = { privateKey: 'EKFV9JM6NaMQi2xWQfjPN4szL6SKqh8gsPCsHzQKYdf3HBSRLqM3', publicKey: 'B62qj5vSsQiuugm8oYkYf5mXgaPQf32JZ9AaGuS9QsCpC19PEHLUjhs' };
let feepayerKey = PrivateKey.fromBase58(feepayerKeysBase58.privateKey);
let zkAppKey = PrivateKey.fromBase58(zkAppKeysBase58.privateKey);
// set up Mina instance and contract we interact with
const fee = 0.101 * 1e9; // in nanomina (1 billion = 1.0 mina)
const MINAURL = 'https://api.minascan.io/node/berkeley/v1/graphql';
const ARCHIVEURL = 'https://api.minascan.io/archive/berkeley/v1/graphql/';
const network = Mina.Network({
    mina: MINAURL,
    archive: ARCHIVEURL,
});
Mina.setActiveInstance(network);
let feepayerAddress = feepayerKey.toPublicKey();
let zkAppAddress = zkAppKey.toPublicKey();
let zkApp = new RecycleCompany(zkAppAddress);
// compile the contract to create prover keys
console.log('compile the contract...');
await RecycleCompany.compile();
try {
    // call update() and send transaction
    console.log('build transaction and create proof...');
    let tx = await Mina.transaction({ sender: feepayerAddress, fee }, () => {
        // AccountUpdate.fundNewAccount(feepayerAddress, 1);
        zkApp.deploy();
    });
    await tx.prove();
    await tx.sign([zkAppKey, feepayerKey]).send();
    console.log('send transaction...');
    const sentTx = await tx.sign([feepayerKey]).send();
    if (sentTx.status === 'pending') {
        console.log('\nSuccess! Update transaction sent.\n' + '\n Txhash: ' + sentTx.hash);
    }
}
catch (err) {
    console.log(err);
}
//# sourceMappingURL=deploy.js.map