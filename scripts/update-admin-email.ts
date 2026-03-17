
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zzvklhkvhsibpnipwstq.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6dmtsaGt2aHNpYnBuaXB3c3RxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQ2NTQ5NywiZXhwIjoyMDg4MDQxNDk3fQ.tV3OltC0oBqp7eAX6qOEoWsthp5cEAwIgG8PGZnM7ko'

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function updateAdminUser() {
  const oldEmail = 'admin@pursfi.com'
  const newEmail = 'ifyand.chisom@pursfi.com'
  const newPassword = 'Password123!'

  console.log(`Looking for user: ${oldEmail}`)

  // 1. List users to find the ID
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
  
  if (listError) {
    console.error('Error listing users:', listError.message)
    return
  }

  const user = users.find(u => u.email === oldEmail)

  if (!user) {
    console.error(`User ${oldEmail} not found!`)
    return
  }

  console.log(`Found user ID: ${user.id}`)

  // 2. Update Auth User
  const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
    user.id,
    { email: newEmail, password: newPassword, email_confirm: true }
  )

  if (updateError) {
    console.error('Error updating auth user:', updateError.message)
    return
  }

  console.log('Auth user updated successfully.')

  // 3. Update Profiles Table
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ email: newEmail })
    .eq('id', user.id)

  if (profileError) {
    console.error('Error updating profiles table:', profileError.message)
  } else {
    console.log('Profiles table updated.')
  }

  // 4. Update Business Profiles Table
  const { error: businessError } = await supabase
    .from('business_profiles')
    .update({ business_email: newEmail })
    .eq('profile_id', user.id) // Assuming business_profiles links via profile_id

  if (businessError) {
    console.error('Error updating business_profiles table:', businessError.message)
  } else {
    console.log('Business profiles table updated.')
  }

  console.log(`\nDONE! You can now log in with:\nEmail: ${newEmail}\nPassword: ${newPassword}`)
}

updateAdminUser()
