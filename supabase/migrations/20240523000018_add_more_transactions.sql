
-- Add new requested transactions to the transactions and recent_transactions tables

-- Insert into transactions
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
    '000030240830161822147996305918', 
    'credit', 
    100000, 
    'Topup from BUD INFRASTRUCTURE LTD', 
    'success', 
    '2024-08-30 14:18:00+00', -- Aug 30, 2024 02:18 PM
    'Topup',
    'BUD INFRASTRUCTURE LTD'
  ),
  (
    '110006240802144250059443135701', 
    'credit', 
    100000, 
    'Topup from Paystack', 
    'success', 
    '2024-08-02 13:43:00+00', -- Aug 02, 2024 01:43 PM
    'Topup',
    'Paystack'
  ),
  (
    '000014240802130535217922706222', 
    'credit', 
    400000, 
    'Topup from TOLULOPE AYOTUNDE AY0-OGUNTOYINBO-106-DIAMONDXTRA', 
    'success', 
    '2024-08-02 11:06:00+00', -- Aug 02, 2024 11:06 AM
    'Topup',
    'TOLULOPE AYOTUNDE AY0-OGUNTOYINBO'
  ),
  (
    '000013240801090832000250521881', 
    'credit', 
    3500000, 
    'Topup from AGHOMI JACQUELINE', 
    'success', 
    '2024-08-01 07:09:00+00', -- Aug 01, 2024 07:09 AM
    'Topup',
    'AGHOMI JACQUELINE'
  ),
  (
    '000007240717191833599614021027', 
    'credit', 
    250000, 
    'Topup from HIGH KRYSTALL AND CO LIMITED', 
    'success', 
    '2024-07-17 17:18:00+00', -- Jul 17, 2024 05:18 PM
    'Topup',
    'HIGH KRYSTALL AND CO LIMITED'
  );

-- Insert into recent_transactions (for the dashboard widget)
insert into recent_transactions (description, amount, status, date, recipient) values
  ('Topup from BUD INFRASTRUCTURE LTD', 100000, 'completed', '2024-08-30 14:18:00+00', 'BUD INFRASTRUCTURE LTD'),
  ('Topup from Paystack', 100000, 'completed', '2024-08-02 13:43:00+00', 'Paystack'),
  ('Topup from TOLULOPE AYOTUNDE AY0-OGUNTOYINBO-106-DIAMONDXTRA', 400000, 'completed', '2024-08-02 11:06:00+00', 'TOLULOPE AYOTUNDE AY0-OGUNTOYINBO'),
  ('Topup from AGHOMI JACQUELINE', 3500000, 'completed', '2024-08-01 07:09:00+00', 'AGHOMI JACQUELINE'),
  ('Topup from HIGH KRYSTALL AND CO LIMITED', 250000, 'completed', '2024-07-17 17:18:00+00', 'HIGH KRYSTALL AND CO LIMITED');
