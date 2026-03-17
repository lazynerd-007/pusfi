
-- Ensure both the previous 2 transactions and the new 5 transactions are present
-- We will use INSERT ... ON CONFLICT DO NOTHING (or just insert since we have a unique id generation)
-- To be safe and avoid duplicates if this runs multiple times, we can just insert them.

-- 1. Insert into main transactions table
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
  -- The previous 2 transactions
  (
    '000021251227071251200000055344', 
    'credit', 
    200000, 
    'Topup from OLAYEMI OLABANJI SANNI', 
    'success', 
    '2025-12-27 18:12:00+00',
    'Topup',
    'OLAYEMI OLABANJI SANNI'
  ),
  (
    '000015250224233453000006559820', 
    'credit', 
    1000000, 
    'Topup from WIN HOMES GLOBAL SERVICES LTD', 
    'success', 
    '2025-02-24 21:35:00+00',
    'Topup',
    'WIN HOMES GLOBAL SERVICES LTD'
  ),
  -- The new 5 transactions
  (
    '000030240830161822147996305918', 
    'credit', 
    100000, 
    'Topup from BUD INFRASTRUCTURE LTD', 
    'success', 
    '2024-08-30 14:18:00+00',
    'Topup',
    'BUD INFRASTRUCTURE LTD'
  ),
  (
    '110006240802144250059443135701', 
    'credit', 
    100000, 
    'Topup from Paystack', 
    'success', 
    '2024-08-02 13:43:00+00',
    'Topup',
    'Paystack'
  ),
  (
    '000014240802130535217922706222', 
    'credit', 
    400000, 
    'Topup from TOLULOPE AYOTUNDE AY0-OGUNTOYINBO-106-DIAMONDXTRA', 
    'success', 
    '2024-08-02 11:06:00+00',
    'Topup',
    'TOLULOPE AYOTUNDE AY0-OGUNTOYINBO'
  ),
  (
    '000013240801090832000250521881', 
    'credit', 
    3500000, 
    'Topup from AGHOMI JACQUELINE', 
    'success', 
    '2024-08-01 07:09:00+00',
    'Topup',
    'AGHOMI JACQUELINE'
  ),
  (
    '000007240717191833599614021027', 
    'credit', 
    250000, 
    'Topup from HIGH KRYSTALL AND CO LIMITED', 
    'success', 
    '2024-07-17 17:18:00+00',
    'Topup',
    'HIGH KRYSTALL AND CO LIMITED'
  );

-- 2. Insert into recent_transactions table
insert into recent_transactions (description, amount, status, date, recipient) values
  -- The previous 2 transactions
  ('Topup from OLAYEMI OLABANJI SANNI', 200000, 'completed', '2025-12-27 18:12:00+00', 'OLAYEMI OLABANJI SANNI'),
  ('Topup from WIN HOMES GLOBAL SERVICES LTD', 1000000, 'completed', '2025-02-24 21:35:00+00', 'WIN HOMES GLOBAL SERVICES LTD'),
  -- The new 5 transactions
  ('Topup from BUD INFRASTRUCTURE LTD', 100000, 'completed', '2024-08-30 14:18:00+00', 'BUD INFRASTRUCTURE LTD'),
  ('Topup from Paystack', 100000, 'completed', '2024-08-02 13:43:00+00', 'Paystack'),
  ('Topup from TOLULOPE AYOTUNDE AY0-OGUNTOYINBO-106-DIAMONDXTRA', 400000, 'completed', '2024-08-02 11:06:00+00', 'TOLULOPE AYOTUNDE AY0-OGUNTOYINBO'),
  ('Topup from AGHOMI JACQUELINE', 3500000, 'completed', '2024-08-01 07:09:00+00', 'AGHOMI JACQUELINE'),
  ('Topup from HIGH KRYSTALL AND CO LIMITED', 250000, 'completed', '2024-07-17 17:18:00+00', 'HIGH KRYSTALL AND CO LIMITED');
