// a very simple hash function
function hashMe(password: number): number {
  const hash = 10 + (password % 2);
  console.log(`Original password: ${password}, hashed value ${hash}`);
  return hash;
}

hashMe(2); // Original password: 2, hashed value: 10
hashMe(4); // Original password: 4, hashed value: 10
hashMe(6); // Original password: 6, hashed value: 10
hashMe(800); // Original password: 800, hashed value: 10

// When a hashing function generates the same output for more than one input,
// it's called a collision.

// Secure Hash Algorithms (SHA) offer more or less secure ways for creating
// hashes that are collision resistant, making it extremely hard to find two
// inputs that produce the same hash value.

// A hash is a pure function because it always returns the same value for a
// given input.

// In cryptography a number that can be used just once is called a nonce.

interface Block {
  index: number; // A sequential block number
  timestamp: number; // The first parameter of the hash function
  data: string; // Data about one or more transactions
  nonce: number; // A number figured out by miners
  hash: string; // This block's hash
  previousBlockHash: string; // Hash value of previous block in blockchain
}


// The below works in browser, not with Node.js, so I'm commenting it out.

/*
async function generateHash(input: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => '00' + byte.toString(16).slice(-2))
    .join('');
  return hashHex;
}

async function calculuateHashWithNonce(nonce: number): Promise<string> {
  const data = 'input' + nonce;
  return generateHash(data);
}

async function mine(difficulty: number): Promise<void> {
  const zeros = '0'.repeat(difficulty);
  let nonce = 0;
  let hash: string;

  do {
    hash = await calculuateHashWithNonce(++nonce);
  } while (!hash.startsWith(zeros));

  console.log(`Hash: ${hash}, nonce: ${nonce}`);
}

mine(3);
*/
