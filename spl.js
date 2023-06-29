const token = require("@solana/spl-token")
const web3 = require("@solana/web3.js")
const fs = require("fs");

createTokenAccount()

async function mintTx() {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

    const secret = JSON.parse(fs.readFileSync("secret.json").toString());
    const secretKey = Uint8Array.from(secret);
    const payer = web3.Keypair.fromSecretKey(secretKey)

    const secretToken = JSON.parse(fs.readFileSync("AnshdcnJFpUKemNnUq9J2SMb2orfhk61GANUnnfbZPBX.json").toString());
    const secretKeyToken = Uint8Array.from(secretToken);
    const tokenKeypair = web3.Keypair.fromSecretKey(secretKeyToken)

    const secretTokenAccount = JSON.parse(fs.readFileSync("TAJeaJfaqwTYc2uP8pWM7SVBoJJpwt1CYqvtmq6Eixg.json").toString());
    const secretKeyTokenAccount = Uint8Array.from(secretTokenAccount);
    const tokenAccountKeypair = web3.Keypair.fromSecretKey(secretKeyTokenAccount)

    const tokenMintAccountAddress = await token.createMint(
        connection,
        payer,
        payer.publicKey,
        payer.publicKey,
        9,
        tokenKeypair
    )

    console.log(tokenMintAccountAddress.toBase58())

    const tokenAccountAddress = await token.createAccount(
        connection,
        payer,
        tokenKeypair.publicKey,
        payer.publicKey,
        tokenAccountKeypair
    )

    console.log(tokenAccountAddress.toBase58())
}

async function createMintAccount() {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

    const secret = JSON.parse(fs.readFileSync("secret.json").toString());
    const secretKey = Uint8Array.from(secret);
    const payer = web3.Keypair.fromSecretKey(secretKey)

    const secretToken = JSON.parse(fs.readFileSync("AnshdcnJFpUKemNnUq9J2SMb2orfhk61GANUnnfbZPBX.json").toString());
    const secretKeyToken = Uint8Array.from(secretToken);
    const tokenKeypair = web3.Keypair.fromSecretKey(secretKeyToken)

    const tokenMintAccountAddress = await token.createMint(
        connection,
        payer,
        payer.publicKey,
        payer.publicKey,
        9,
        tokenKeypair
    )

    console.log(tokenMintAccountAddress.toBase58())
}

async function createTokenAccount() {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

    const secret = JSON.parse(fs.readFileSync("secret.json").toString());
    const secretKey = Uint8Array.from(secret);
    const payer = web3.Keypair.fromSecretKey(secretKey)
    // AZUVW1JdtYx6SZpKT8ykqSdtZ7tKskNkPvQt8ghRY8uo

    const secretToken = JSON.parse(fs.readFileSync("AnshdcnJFpUKemNnUq9J2SMb2orfhk61GANUnnfbZPBX.json").toString());
    const secretKeyToken = Uint8Array.from(secretToken);
    const tokenKeypair = web3.Keypair.fromSecretKey(secretKeyToken)
    // AnshdcnJFpUKemNnUq9J2SMb2orfhk61GANUnnfbZPBX

    const secretTokenAccount = JSON.parse(fs.readFileSync("TAJeaJfaqwTYc2uP8pWM7SVBoJJpwt1CYqvtmq6Eixg.json").toString());
    const secretKeyTokenAccount = Uint8Array.from(secretTokenAccount);
    const tokenAccountKeypair = web3.Keypair.fromSecretKey(secretKeyTokenAccount)
    // TAJeaJfaqwTYc2uP8pWM7SVBoJJpwt1CYqvtmq6Eixg
    
    // const tokenAccountAddress = await token.createAccount(
    //     connection,
    //     payer,
    //     tokenKeypair.publicKey,
    //     payer.publicKey,
        
    // )

    // const associatedTokenAccount = await token.createAssociatedTokenAccount(
    //     connection,
    //     payer,
    //     tokenKeypair.publicKey,
    //     payer.publicKey,
    // );
    


    // 3myE1mjVs5ATVDcCv2fydDDeUHWURBDTXbq6rE7deBEM

    // const decimals = 9
    // const amount = 3 * 10**decimals

    // const mint = await token.mintTo(
    //     connection, 
    //     payer, 
    //     tokenKeypair.publicKey, 
    //     tokenAccountKeypair.publicKey, 
    //     payer.publicKey,
    //     amount
    // )

    // console.log(mint)
    // console.log(payer)

    



    // const destinationAccount = await token.createAccount(
    //     connection,
    //     payer,
    //     tokenKeypair.publicKey,
    //     payer.publicKey,
    //     destination.Keypair
    // )

    const destinationSecret = [
        32, 121, 243, 220, 115, 200,  87, 147,  60, 166,  19,
       104,  96,  58, 101, 218, 218,  74, 159, 235,  48, 119,
       235, 237, 189, 177,  83, 134,   5,  42, 186, 110,  41,
       102, 162, 254, 151, 157, 159,  24,  73, 200, 139,  24,
        74, 100, 142, 252, 162, 189,  80, 249, 200,  62,   1,
       171,  64,  57, 103, 139,   6, 240, 168,  91
     ]
     
    const destinationKey = Uint8Array.from(destinationSecret);
    const destination = web3.Keypair.fromSecretKey(destinationKey);

    const ata = token.getAssociatedTokenAddressSync(tokenKeypair.publicKey, payer.publicKey)


    // const associatedTokenAccount = await token.createAssociatedTokenAccount(
    //     connection,
    //     payer,
    //     tokenKeypair.publicKey,
    //     destination.publicKey,
    // );

    const transfer = await token.transfer(
        connection,
        payer,
        tokenAccountKeypair.publicKey,
        ata,
        payer.publicKey,
        1*10**9
    )

    
    
    console.log(transfer)
    console.log(ata.toBase58())

}


