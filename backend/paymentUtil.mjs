import fs from 'fs'

import path from 'path'

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import pkg from '@cryptapi/api';
const CryptAPI = pkg.default || pkg; // Access the default export

const WalletAddress = 'BnT48WhnmLF13khMKn4fpsmQVKLrJYSbAKZhr6uxXHrq'
const CTCB_baseUrl = '/api/process_framework'

const APIKEY = process.env.CRYPT_SECRET || 'backward_key'
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const jsonPath = path.join(__dirname, '../frontend/framework_games.json');

function loadGames() {
  const raw = fs.readFileSync(jsonPath, 'utf8');
  return JSON.parse(raw);
}

const FrameworkGamesJson = loadGames()
console.log(FrameworkGamesJson);
console.log("workin")

export async function PurchaseFrameworks(PurchaseList, baseUrl) {
  if (!Array.isArray(PurchaseList)) {
    console.warn("passed purchase list isn't an array")
    return
  }
  
  let TotalCost = 0
  
  PurchaseList.forEach(element => {
    const FrameworkData = FrameworkGamesJson[element]

    if (!FrameworkData) {
      console.warn('No framework data for framework name:' + element)
      return
    }

    TotalCost += FrameworkData.price
  });

  console.log(TotalCost)

  
  const CTCBUrl = baseUrl + CTCB_baseUrl 
  console.log(CTCBUrl)
  //Crypto processing
  // Using the official Node.js library

  const params = {
    order_id: 1,
  };

  const cryptapiParams = {
    post: 0,
    json: 0,
    pending: 1,
    multi_token: 1,
    convert: 1
  };

  const ca = new CryptAPI('sol/sol', WalletAddress, CTCBUrl, params, cryptapiParams)

  const address = await ca.getAddress()
  // address.address_in
  console.log(address)


}

export function CompleteTransaction(orderId) {

}