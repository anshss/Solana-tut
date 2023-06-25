import { useState } from "react";
import styles from "../styles/Home.module.css";
import AddressForm from "../components/AddressForm";
import * as Web3 from "@solana/web3.js";

const Home = () => {
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState("");

    const addressSubmittedHandler = (address) => {
        try {
            setAddress(address);
            // const key = new Web3.PublicKey(address)
            // const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
            // connection.getBalance(key).then(balance => {
            //   setBalance(balance / Web3.LAMPORTS_PER_SOL)
            // })
            const key = new Web3.PublicKey(address);
            const connection = new Web3.Connection(
                Web3.clusterApiUrl("devnet")
            );
            connection.getBalance(key).then((balance) => {
                setBalance(balance / Web3.LAMPORTS_PER_SOL);
            });
        } catch (error) {
            setAddress("");
            setBalance(0);
            alert(error);
        }
    };

    const test = () => {
        const ownerKeypair = Web3.Keypair.generate();
        const publicKey = ownerKeypair.publicKey;
    };

    return (
        <div className={styles.App}>
            <header className={styles.AppHeader}>
                <p>Start Your Solana Journey</p>
                <AddressForm handler={addressSubmittedHandler} />
                <p>{`Address: ${address}`}</p>
                <p>{`Balance: ${balance} SOL`}</p>
            </header>
        </div>
    );
};

export default Home;
