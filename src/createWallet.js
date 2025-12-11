// importando dependencias
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');


//definindo redes
// bitcoin - rede principal
//testenet - rede de teste
const network = bitcoin.networks.testnet

//derivação de carteiras HD
const path = 'm/49\'/1\'/0\'/0';

//gerando mnemonic e seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//criando a raiz da carteira HD
const root = bip32.fromSeed(seed, network);

//criando uma conta 
let account = root.derivePath(path);
let Node = account.derive(0).derive(0);

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: Node.publicKey,
    network: network
}).address

console.log("Carteira criada com sucesso!");
console.log("Endereço BTC: ", btcAdress);
console.log("Chave privada: ", Node.toWIF());
console.log("Seed: ", mnemonic);

