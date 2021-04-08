import * as crypto from 'crypto';

class Block {
  readonly hash: string;

  constructor(
      readonly index: number,
      readonly previousHash: string,
      readonly timestamp: number,
      readonly data: string,
  ) {
    this.hash = this.calculateHash();
  }

  private calculateHash(): string {
    const data = this.index + this.previousHash + this.timestamp + this.data;
    return crypto
        .createHash('sha256') // Create instance of hash obj for generating SHA-256 hashes
        .update(data) // Compute and update the hash value inside Hash object
        .digest('hex'); // Converts hash value into hexadecimal string
  }
}

class Blockchain {
  private readonly chain: Block[] = [];

  constructor() {
    this.chain.push(
        new Block(0, '0', Date.now(), 'Genesis block')
    );
  }

  private get latestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data: string): void {
    const block = new Block(
        this.latestBlock.index + 1,
        this.latestBlock.hash,
        Date.now(),
        data
    );

    this.chain.push(block);
  }
}

console.log('Creating the blockchain with the genesis block...');
const blockchain = new Blockchain();

console.log('Mining block #1...')
blockchain.addBlock('First Block');

console.log('Mining block #2...')
blockchain.addBlock('Second block');

console.log(JSON.stringify(blockchain, null, 2));