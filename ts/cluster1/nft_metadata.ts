import wallet from "../turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader , IrysUploaderOptions} from "@metaplex-foundation/umi-uploader-irys"
import { readFileSync } from "fs";

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({address:"https://devnet.irys.xyz/"}));
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://gateway.irys.xyz/HWdk939Z2EJAbcPrtxnxUmPQadCyLCH7Pj9Vw9qdyYZR";

        const metadata = {
            name: "BANG! BANG!",
            symbol: "BANG!",
            description: "Spike is back from the dead again!!!",
            image,
            attributes: [{
                trait_type: 'trait type goes here', 
                value: '"trait type goes here" value goes here'
            }],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: []
        };

        const myUri = await umi.uploader.uploadJson(metadata)

        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
