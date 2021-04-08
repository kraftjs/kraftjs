// a very simple hash function
function hashMe(password) {
    const hash = 10 + (password % 2);
    console.log(`Original password: ${password}, hashed value ${hash}`);
    return hash;
}
hashMe(2); // Original password: 2, hashed value: 10
hashMe(4); // Original password: 4, hashed value: 10
hashMe(6); // Original password: 6, hashed value: 10
hashMe(800); // Original password: 800, hashed value: 10
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
