const path = require('path');
const fs = require('fs-extra');
const { spawnSync } = require('child_process');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractName = 'AI3C'

const nftPath = path.resolve(__dirname, 'contracts', 'AI3C.sol');
const outputDir = path.resolve(__dirname, 'build');

const cmd = `solc --base-path ${__dirname} --include-path node_modules "@openzeppelin/contracts=${__dirname}/node_modules/@openzeppelin/contracts" --bin --abi --optimize --optimize-runs=200 ${nftPath} -o ${outputDir}`;

const { error, stderr } = spawnSync(cmd, [], { shell: true });

if (error) {
  console.error(error);
}

if (stderr.toString()) {
  console.error(stderr.toString());
}

const abi = fs.readFileSync(`${outputDir}/AI3C.abi`, 'utf8');
const bytecode = fs.readFileSync(`${outputDir}/AI3C.bin`, 'utf8');

fs.outputJsonSync(path.resolve(buildPath, 'AI3C.json'), {
  abi: JSON.parse(abi),
  evm: { bytecode: { object: bytecode } },
});
