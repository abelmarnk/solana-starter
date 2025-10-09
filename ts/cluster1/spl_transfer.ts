import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("pkYC543qCgtrB3At5WEa6XgWRtDKf1KzcD5PxkpVSEY");

const from = new PublicKey("EibqN1sJ8mRkYKvvSWjxDvPjvmnfkMQ2XsiR6jqg8uFq");

// Recipient address
const to = new PublicKey("GsJYonU5Kz4MJBHZ5UFx9oyStBpXXswnZcFUorktj2yZ");

(async () => {
    try {
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            from,
            true,
        );

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to,
            true,
        );

        await transfer(
            connection,
            keypair,
            fromTokenAccount.address,
            toTokenAccount.address,
            keypair,
            5
        );

    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();