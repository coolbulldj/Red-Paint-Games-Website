import fs from 'fs'

import path from 'path'

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { processLock } from '@supabase/supabase-js';

const WalletAddress = process.env.WalletAddress || 'BnT48WhnmLF13khMKn4fpsmQVKLrJYSbAKZhr6uxXHrq'
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

  
  const CTCBUrl = baseUrl + CTCB_baseUrl 

  //Crypto processing
  const params = new URLSearchParams({
    callback: CTCBUrl,
    address: WalletAddress,
    post: 1,
    json: 0,
    pending: 1,
    multi_token: 0,
    convert: 1
  });
  
  const response = await fetch(`https://api.cryptapi.io/sol/sol/create/?${params}`);
  const data = await response.json();

  return {
    "purchase_data" : data, 
    "usd" : TotalCost
  }
}

export function CompleteTransaction(orderId) {
  
}