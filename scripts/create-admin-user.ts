import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zzvklhkvhsibpnipwstq.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6dmtsaGt2aHNpYnBuaXB3c3RxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQ2NTQ5NywiZXhwIjoyMDg4MDQxNDk3fQ.tV3OltC0oBqp7eAX6qOEoWsthp5cEAwIgG8PGZnM7ko'

// Use the Service Role Key to bypass rate limits and email confirmation
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdminUser() {
  const email = 'admin@pursfi.com'
  const password = 'Password123!'

  console.log(`Attempting to create user: ${email}`)

  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true // Confirm email immediately
  })

  if (error) {
    console.error('Error creating user:', error.message)
    return
  }

  console.log('User created successfully via Admin API:')
  console.log('Email:', email)
  console.log('Password:', password)
  console.log('User ID:', data.user.id)
}

createAdminUser()
