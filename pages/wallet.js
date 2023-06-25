import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from "react";
import * as web3 from "@solana/web3.js";

export default function Wallet() {
    const [balance, setBalance] = useState(0)
    // const { connection } = useConnection()
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    const { publicKey, sendTransaction } = useWallet()

    useEffect(() => {
        if (!connection || !publicKey) return
        connection.getAccountInfo(publicKey).then((info) => {
            setBalance(info.lamports)
        })
    }, [])

    function sendSol() {
        const transaction = new web3.Transaction()
        const recipientPubKey = `BTBPKRJQv7mn2kxBBJUpzh3wKN567ZLdXDWcxXFQ4KaV`

        const sendSolInstruction = web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPubKey,
            lamports: web3.LAMPORTS_PER_SOL * 0.1
        })

        transaction.add(sendSolInstruction)

        sendTransaction(transaction, connection).then(sig => {console.log(sig)})
    }

    return (
        <div>
            <div>
            <WalletModalProvider>
                <WalletMultiButton />
            </WalletModalProvider>
            </div>
            <p>{publicKey ? `Balance: ${balance / web3.LAMPORTS_PER_SOL} SOL` : 'Wallet not connected'}</p>
            <button onClick={sendSol}>Send SOL</button>
        </div>
    );
}
