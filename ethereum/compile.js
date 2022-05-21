const path = require("path");
const solc = require("solc");

//Improved fs module (community) with removeSync & ensureDirSync features
const fs = require("fs-extra");

//Goal: Compile once, and then run the App as many time as we wish

//Step 1: Delete entire "build" folder
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath); //remove everything inside a folder (fs-extra feature)

//Step 2: Read "Caompaign.sol" from the "contracts" folder
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol"); 
const source = fs.readFileSync(campaignPath, "utf8");

//Step 3: Compile both contracts with solidity compiler
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); //Will create folder if doesnt exists

//Step 4: Loop output & write 2 contract to 2 output in the "build" directory
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
