
-- Update transaction data with specific requested records
-- First, clear existing sample transactions to avoid clutter
TRUNCATE TABLE transactions;

-- Insert specific user requested transactions
insert into transactions (
  reference, 
  type, 
  amount, 
  description, 
  status, 
  created_at, 
  category,
  recipient_name
) values 
  (
    '000021251227071251200000055344', 
    'credit', 
    200000, 
    'Topup from OLAYEMI OLABANJI SANNI', 
    'success', 
    '2025-12-27 18:12:00+00', -- Dec 27, 2025 06:12 PM
    'Topup',
    'OLAYEMI OLABANJI SANNI'
  ),
  (
    '000015250224233453000006559820', 
    'credit', 
    1000000, 
    'Topup from WIN HOMES GLOBAL SERVICES LTD', 
    'success', 
    '2025-02-24 21:35:00+00', -- Feb 24, 2025 09:35 PM
    'Topup',
    'WIN HOMES GLOBAL SERVICES LTD'
  );

-- Also update recent_transactions table to match (for dashboard view)
TRUNCATE TABLE recent_transactions;

insert into recent_transactions (description, amount, status, date, recipient) values
  ('Topup from OLAYEMI OLABANJI SANNI', 200000, 'completed', '2025-12-27 18:12:00+00', 'OLAYEMI OLABANJI SANNI'),
  ('Topup from WIN HOMES GLOBAL SERVICES LTD', 1000000, 'completed', '2025-02-24 21:35:00+00', 'WIN HOMES GLOBAL SERVICES LTD');
