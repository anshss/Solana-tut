const web3 = require("@solana/web3.js");
const borsh = require("@project-serum/borsh");
const fs = require("fs")
const bs58 = require("bs58")

generateKeypair();

function fetchBalance() {
    const address = "88JigRuKKTdiH72sCdBPXQRuKDKCHAQBaQTkJ4RMV8yw";
    const key = new web3.PublicKey(address);
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    connection.getBalance(key).then((bal) => {
        console.log(bal / web3.LAMPORTS_PER_SOL);
    });
}

function pingSystemProgram() {
    const sender = ``;
    const recipient = ``;

    const transaction = new web3.Transaction();

    const instruction = web3.SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: recipient,
        lamports: web3.LAMPORTS_PER_SOL * amount,
    });

    transaction.add(instruction);

    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

    const signature = web3.sendAndConfirmTransaction(connection, transaction, [
        senderKeypair,
    ]);

    console.log(signature);
}

function generateKeypair() {
    const ownerKeypair = web3.Keypair.generate();
    const publicKey = ownerKeypair.publicKey;
    const privateKey = ownerKeypair.secretKey;
    console.log(publicKey.toString());
    console.log(privateKey);
    return ownerKeypair;
}

function initializeKeypair() {
    // const secretKey = bs58.decode(walletSecretKey)
    const secret = JSON.parse(fs.readFileSync("secret.json").toString());
    const secretKey = Uint8Array.from(secret);
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey);
    console.log(keypairFromSecretKey.publicKey);
    // return keypairFromSecretKey
}

function initializeKeypairFromSecretArray() {
    const destinationSecret = [
        229,  96,  16,  10, 241, 213,  30, 202,  59, 118, 193,
        237, 240, 176,  45, 141, 160,  99, 238, 134, 129, 210,
         52, 121,  55,  36,  45, 162, 219, 156, 203,  91,  10,
        144, 248,  24, 215, 139, 235,  89, 105, 248,  77, 102,
         10,  33, 213,  57, 193, 186, 147, 220, 154,  29,   1,
        167, 137,  96, 131,  35,  78, 204, 103,  13
      ]
    const destinationKey = Uint8Array.from(destinationSecret);
    const destination = web3.Keypair.fromSecretKey(destinationKey);
}

function initializeKeypairFromSecretKey(walletSecretKey) {
    const secretKey = bs58.decode(walletSecretKey)
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
}

async function pingProgram() {
    const PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
    const PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

    const programId = new web3.PublicKey(PROGRAM_ADDRESS);
    const programDataPubKey = new web3.PublicKey(PROGRAM_DATA_ADDRESS);

    const transaction = new web3.Transaction();

    const instruction = new web3.TransactionInstruction({
        keys: [
            {
                pubkey: programDataPubKey,
                isSigner: false,
                isWritable: true,
            },
        ],
        programId,
    });

    transaction.add(instruction);

    const payer = generateKeypair();
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL * 1);

    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    );

    console.log(signature);
    console.log(
        `You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
    );
}

// buffer represents bytes
async function generatePDA() {
    const programId = new web3.PublicKey(
        "HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf"
    );
    const [pda, bump] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("fdasf")],
        programId
    );

    console.log(pda.toBase58());
    console.log(bump);
}

// returns all PDA owned by a program
async function getAllPDAofProgram() {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    const programId = new web3.PublicKey(
        "HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf"
    );
    const accounts = await connection.getProgramAccounts(programId);

    accounts.forEach(({ pubkey, account }) => {
        console.log("Account:", pubkey);
        console.log("Data Buffer:", account.data);
    })
}

// deserializing data of all accounts owned by a program
async function deserializing() {
    borshAccountSchema = borsh.struct([
        borsh.bool("initialized"),
        borsh.str("str1"),
        borsh.str("str2"),
    ]);

    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    const programId = new web3.PublicKey(
        "HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf"
    );
    const accounts = await connection.getProgramAccounts(programId);

    accounts.forEach(({ pubkey, account }) => {
        console.log("Account:", pubkey);
        console.log("Data Buffer:", account.data);
        const { initialized, str1, str2 } = borshAccountSchema.decode(
            account.data
        );
        console.log(initialized);
        console.log(str1);
        console.log(str2);
    });
}
