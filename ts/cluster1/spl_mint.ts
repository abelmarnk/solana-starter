import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("pkYC543qCgtrB3At5WEa6XgWRtDKf1KzcD5PxkpVSEY");

(async () => {
    try {
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
            true,
        );
        
        const signature = await mintTo(
            connection,
            keypair,
            mint,
            ata.address,
            keypair,
            1_000_000,
        );

        const ataAfterMint = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
            true,
        );

        console.log("Associated token account after mint \n \n");
        console.log("Address: ", ataAfterMint.address.toString());
        console.log("Owner: ", ataAfterMint.owner.toString());
        console.log("Amount: ", ataAfterMint.amount)

    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
