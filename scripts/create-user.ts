import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key not found in environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTestUser() {
  const email = 'demo@pursfinance.com'
  const password = 'Password123!'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Error creating user:', error.message)
    return
  }

  console.log('User created successfully:')
  console.log('Email:', email)
  console.log('Password:', password)
  console.log('User ID:', data.user?.id)
}

createTestUser()
