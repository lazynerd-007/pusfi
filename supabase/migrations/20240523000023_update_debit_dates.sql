
-- Update the dates for the recent debit transactions as requested

-- 1. Update Vivian's transaction to Jan 11, 2025 at 2:XX PM
UPDATE transactions 
SET created_at = '2025-01-11 14:17:42+00' 
WHERE reference = 'REF-VIVIAN-001';

UPDATE recent_transactions 
SET date = '2025-01-11 14:17:42+00' 
WHERE description = 'Transfer to Vivian Oluwatoyin Odunewu';

-- 2. Update Babatunde's transaction to Jan 20, 2026 at 11:XX AM
UPDATE transactions 
SET created_at = '2026-01-20 11:34:15+00' 
WHERE reference = 'REF-LOAN-001';

UPDATE recent_transactions 
SET date = '2026-01-20 11:34:15+00' 
WHERE description = 'Loan to Babatunde Odunewu Fauwaz';

-- 3. Rebuild Wallet History based on the NEW timeline order
-- Baseline (Aug 30, 2024): 4,350,000
-- Jan 11, 2025 (Debit 500k - Vivian): 3,850,000
-- Feb 24, 2025 (Credit 1M+75 - WIN HOMES): 4,850,075
-- Dec 27, 2025 (Credit 200k - OLAYEMI): 5,050,075
-- Jan 20, 2026 (Debit 1.5M - Babatunde): 3,550,075

TRUNCATE TABLE wallet_history;

insert into wallet_history (balance, date) values
  (4350000, '2024-08-30 14:18:00+00'), -- After Aug 2024 transactions
  (3850000, '2025-01-11 14:17:42+00'), -- After Vivian Debit (Jan 2025)
  (4850075, '2025-02-24 21:35:00+00'), -- After WIN HOMES Credit (Feb 2025)
  (5050075, '2025-12-27 18:12:00+00'), -- After OLAYEMI Credit (Dec 2025)
  (3550075, '2026-01-20 11:34:15+00'), -- After Babatunde Debit (Jan 2026)
  (3550075, now()); -- Current

-- Ensure final balance matches
update wallet_balances 
set account_balance = 3550075, ledger_balance = 3550075
where id in (select id from wallet_balances limit 1);
