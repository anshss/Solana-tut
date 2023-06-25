const web3 = require('@solana/web3.js');

pingProgram()

function fetchBalance() {
    const address = "88JigRuKKTdiH72sCdBPXQRuKDKCHAQBaQTkJ4RMV8yw"
    const key = new web3.PublicKey(address)
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    connection.getBalance(key).then(
        bal => {console.log(bal/web3.LAMPORTS_PER_SOL)}
    )
}

function pingSystemProgram() {
    const sender = ``
    const recipient = ``

    const transaction = new web3.Transaction()

    const instruction = web3.SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: recipient,
        lamports: web3.LAMPORTS_PER_SOL * amount
    })

    transaction.add(instruction)

    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

    const signature = web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [senderKeypair]
    )

    console.log(signature)
}

function generateKeypair() {
    const ownerKeypair = web3.Keypair.generate()
    const publicKey = ownerKeypair.publicKey
    const privateKey = ownerKeypair.secretKey
    console.log(publicKey.toString())
    return ownerKeypair
}

function initializeKeypair() {

    const PRIVATE_KEY=[56,83,31,62,66,154,33,74,106,59,111,224,176,237,89,224,10,220,28,222,128,36,138,89,30,252,100,209,206,155,154,65,98,194,97,182,98,162,107,238,61,183,163,215,44,6,10,49,218,156,5,131,125,253,247,190,181,196,0,249,40,149,119,246]

    const secret = JSON.parse(process.env.NEXT_PUBLIC_PRIVATE_KEY ?? "");
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
    // return keypairFromSecretKey
    console.log(keypairFromSecretKey)
}

async function pingProgram() {

    const PROGRAM_ADDRESS = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
    const PROGRAM_DATA_ADDRESS = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'

    const programId = new web3.PublicKey(PROGRAM_ADDRESS)
    const programDataPubKey = new web3.PublicKey(PROGRAM_DATA_ADDRESS)

    const transaction = new web3.Transaction()

    const instruction = new web3.TransactionInstruction({
        keys: [
            {
                pubkey: programDataPubKey,
                isSigner: false,
                isWritable: true
            },
        ],
        programId
    })
    
    transaction.add(instruction)

    const payer = generateKeypair()
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL*1)


    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    )

    console.log(signature)
    console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);
}

