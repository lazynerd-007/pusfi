
-- 1. Update Babatunde's transaction date to Jan 20, 2025
UPDATE transactions 
SET created_at = '2025-01-20 11:34:15+00' 
WHERE reference = 'REF-LOAN-001';

UPDATE recent_transactions 
SET date = '2025-01-20 11:34:15+00' 
WHERE description = 'Loan to Babatunde Odunewu Fauwaz';

-- 2. Rebuild Wallet History based on the NEW timeline order
-- Baseline (Aug 30, 2024): 4,350,000
-- Jan 11, 2025 (Debit 500k - Vivian): 3,850,000
-- Jan 20, 2025 (Debit 1.5M - Babatunde): 2,350,000  <-- Moved here!
-- Feb 24, 2025 (Credit 1M+75 - WIN HOMES): 3,350,075
-- Dec 27, 2025 (Credit 200k - OLAYEMI): 3,550,075

TRUNCATE TABLE wallet_history;

insert into wallet_history (balance, date) values
  (4350000, '2024-08-30 14:18:00+00'), -- After Aug 2024 transactions
  (3850000, '2025-01-11 14:17:42+00'), -- After Vivian Debit (Jan 11, 2025)
  (2350000, '2025-01-20 11:34:15+00'), -- After Babatunde Debit (Jan 20, 2025)
  (3350075, '2025-02-24 21:35:00+00'), -- After WIN HOMES Credit (Feb 2025)
  (3550075, '2025-12-27 18:12:00+00'), -- After OLAYEMI Credit (Dec 2025)
  (3550075, now()); -- Current
