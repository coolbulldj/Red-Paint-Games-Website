// client.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://zomzslewzfklfudwkxzk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvbXpzbGV3emZrbGZ1ZHdreHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTExMTgsImV4cCI6MjA3Njg4NzExOH0.nBv32zcci-zYFs5JKSh4wJEJsIYLsE8mP7eUtQLS-kE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


export async function insert_transaction(uuid, address_in, address_out, txid_in, value_coin, coin, price, value_coin_convert) {
    const { data, error } = await supabase
    .from('pending-transactions') // ✅ corrected table name
    .insert({
        id:uuid,
        data: {
            address_in: address_in,
            address_out: address_out,
            txid_in: txid_in,
            amount: value_coin,
            coin: coin,
            price: price,
            status: 'pending',
            value_coin_convert: value_coin_convert,
            processed_at: new Date()
        }
    })

    if (error) {
        console.error('Insert failed:', error)
    } else {
        console.log('Element inserted:', data)
    }
}

export async function updateTransaction(params) {
    
}

export async function checkTransactionInDatabase(uuid) {
    const { data, error } = await supabase
    .from('transactions')
    .select('id')          // you only need one column to check existence
    .eq('id', uuid)
    .limit(1)              // optional: only fetch 1 row

    if (error) {
        console.error('Error checking UUID:', error)
        return false
    }

  return data.length > 0    // true if row exists
}