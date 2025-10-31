// client.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || "https://zomzslewzfklfudwkxzk.supabase.co"
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvbXpzbGV3emZrbGZ1ZHdreHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTExMTgsImV4cCI6MjA3Njg4NzExOH0.nBv32zcci-zYFs5JKSh4wJEJsIYLsE8mP7eUtQLS-kE"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
//git commit -m "add enviroment variables"

export async function insert_transaction(uuid, insert_data) {
    const { data, error } = await supabase
    .from('pending-transactions') // ✅ corrected table name
    .insert({
        id:uuid,
        data: insert_data
    })

    if (error) {
        console.error('Insert failed:', error)
    } else {
        console.log('Element inserted:', data)
    }
}

export async function updateTransaction(uuid, update_data) {
    const { data, error } = await supabase
    .from('pending-transactions') // ✅ corrected table name
    .update({
        data: update_data
    })
    .eq('id', uuid)

    if (error) {
        console.error('Insert failed:', error)
    } else {
        console.log('Element inserted:', data)
    }
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

export async function processSuccessfulPayment(uuid, insert_data) {
    const { data, error } = await supabase
    .from('transactions') // ✅ corrected table name
    .insert({
        id:uuid,
        data: insert_data
    })

    if (error) {
        console.error('Insert failed:', error)
    } else {
        console.log('Element inserted:', data)
    }
}