import { Blockchain } from '../lib/blockchain_transactions';

(async function main(): Promise<void> {
  console.log('⏳ Initializing the blockchain, creating the genesis block...');

  const blockchain = new Blockchain();
  await blockchain.createGenesisBlock();

  blockchain.createTransaction({
    sender: 'John',
    recipient: 'Kate',
    amount: 50,
  });
  blockchain.createTransaction({
    sender: 'Kate',
    recipient: 'Mike',
    amount: 10,
  });

  await blockchain.minePendingTransactions();

  blockchain.createTransaction({
    sender: 'Alex',
    recipient: 'Rosa',
    amount: 15,
  });
  blockchain.createTransaction({
    sender: 'Gina',
    recipient: 'Rick',
    amount: 60,
  });

  await blockchain.minePendingTransactions();

  console.log(JSON.stringify(blockchain, null, 2));
})();