// client.js
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const SUPABASE_URL = 'https://zomzslewzfklfudwkxzk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvbXpzbGV3emZrbGZ1ZHdreHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTExMTgsImV4cCI6MjA3Njg4NzExOH0.nBv32zcci-zYFs5JKSh4wJEJsIYLsE8mP7eUtQLS-kE'


export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

const supabase = createClient()

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

export async function updateTransaction(uuid, data) {
    console.log(uuid, JSON.stringify(data))
    const { _, error } = await supabase
    .from('pending-transactions') // ✅ corrected table name
    .insert({
        id:uuid,
        data: JSON.stringify(data)
    })

    if (error) {
        console.error('Insert failed:', error)
    } else {
        console.log('Element inserted:', data)
    }
}

export async function proccessCompleteTransaction(uuid, data) {
    const { _, error } = await supabase
    .from('pending-transactions') // ✅ corrected table name
    .insert({
        id:uuid,
        data: JSON.stringify(data)
    })

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

export async function ReadAllPendingTransactions() {
    let { data, error } = await supabase
    .from('pending-transactions')
    .select('*')

    if (error) {
    
    } else {
        console.log(data)
    }
}