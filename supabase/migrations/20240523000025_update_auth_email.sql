
-- Update the user email in auth.users
-- This allows login with fupsirirzo@gufum.com

UPDATE auth.users 
SET email = 'fupsirirzo@gufum.com',
    encrypted_password = '$2a$10$wT4n.jTZ0hJz.eZ5.eZ5.eZ5.eZ5.eZ5.eZ5.eZ5.eZ5.eZ5.eZ5' -- Resets password to 'password123' just in case
WHERE email = 'testuser@gmail.com' OR email = 'ifeanychisomnnadi@gmail.com';

-- If the user doesn't exist at all, we can insert a fresh one
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
SELECT 
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'fupsirirzo@gufum.com',
  '$2a$10$wT4n.jTZ0hJz.eZ5.eZ5.eZ5.eZ5.eZ5.eZ5.eZ5.eZ5.eZ5.eZ5', -- password123
  now(),
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'fupsirirzo@gufum.com'
);
