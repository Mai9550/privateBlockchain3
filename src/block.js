

const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {

    // Constructor - argument data will be the object containing the transaction data
	constructor(data){
		this.hash = null;                                           // Hash of the block
		this.height = 0;                                            // Block Height (consecutive number of each block)
		this.body = Buffer.from(JSON.stringify(data)).toString('hex');   // Will contain the transactions stored in the block, by default it will encode the data
		this.time = 0;                                              // Timestamp for the Block creation
		this.previousBlockHash = null;                              // Reference to the previous Block Hash
    }
    

     
    validate() {
        let self = this;
        return new Promise((resolve, reject) => {
            // Save in auxiliary variable the current block hash
                        let currentHash=  self.hash                  
            // Recalculate the hash of the Block
         self.hash=null;
            // Comparing if the hashes changed

            let newHash = SHA256(JSON.stringify(self)).toString()
            self.hash=currentHash;
            if(newHash===currentHash){
resolve(true)

            }else{
            // Returning the Block is not valid
            resolve(false)
            }
            // Returning the Block is valid

        });
    }

    
    getBData() {
        let self = this;
        // Getting the encoded data saved in the Block
        // Decoding the data to retrieve the JSON representation of the object
        // Parse the data to an object to be retrieve.
let data=hex2ascii(self.body)
        // Resolve with the data if the object isn't the Genesis block
        let object=JSON.parse(data)
        return new Promise((resolve, reject) => {
if(self.previousBlockHash!==null){
resolve(object)

        }else{resolve(false)

    }
        

    });
}
}
    
module.exports.Block = Block;                    // Exposing the Block class as a module