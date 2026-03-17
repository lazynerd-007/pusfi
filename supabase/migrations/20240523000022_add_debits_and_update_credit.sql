
-- 1. Update the WIN HOMES transaction amount
UPDATE transactions 
SET amount = 1000075 
WHERE description LIKE '%WIN HOMES GLOBAL SERVICES LTD%' 
AND type = 'credit';

UPDATE recent_transactions 
SET amount = 1000075 
WHERE description LIKE '%WIN HOMES GLOBAL SERVICES LTD%';

-- 2. Add Debit Transaction for Vivian Oluwatoyin Odunewu
INSERT INTO transactions (
  amount, 
  type, 
  status, 
  description, 
  reference, 
  category, 
  recipient_name, 
  created_at
) VALUES (
  500000, 
  'debit', 
  'success', 
  'Transfer to Vivian Oluwatoyin Odunewu', 
  'REF-VIVIAN-001', 
  'Transfer', 
  'Vivian Oluwatoyin Odunewu', 
  '2025-12-15 10:00:00+00' -- December 15, 2025
);

INSERT INTO recent_transactions (description, amount, status, date, recipient) 
VALUES (
  'Transfer to Vivian Oluwatoyin Odunewu', 
  500000, 
  'completed', 
  '2025-12-15 10:00:00+00', 
  'Vivian Oluwatoyin Odunewu'
);

-- 3. Add Debit Transaction for Babatunde Odunewu Fauwaz
INSERT INTO transactions (
  amount, 
  type, 
  status, 
  description, 
  reference, 
  category, 
  recipient_name, 
  created_at
) VALUES (
  1500000, 
  'debit', 
  'success', 
  'Loan to Babatunde Odunewu Fauwaz', 
  'REF-LOAN-001', 
  'Loan', 
  'Babatunde Odunewu Fauwaz', 
  '2026-01-20 14:30:00+00' -- January 20, 2026
);

INSERT INTO recent_transactions (description, amount, status, date, recipient) 
VALUES (
  'Loan to Babatunde Odunewu Fauwaz', 
  1500000, 
  'completed', 
  '2026-01-20 14:30:00+00', 
  'Babatunde Odunewu Fauwaz'
);

-- 4. Update Wallet History to reflect these changes
-- We need to rebuild the history to include these debits and the slightly increased credit
-- Dec 15, 2025: Debit 500k
-- Dec 27, 2025: Credit 200k
-- Jan 20, 2026: Debit 1.5M
-- Feb 24, 2026: Credit 1,000,075

-- Let's recalculate the final balance and key points
-- Previous Baseline (Aug 30, 2024): 4,350,000
-- Dec 15, 2025 (Debit 500k): 3,850,000
-- Dec 27, 2025 (Credit 200k): 4,050,000
-- Jan 20, 2026 (Debit 1.5M): 2,550,000
-- Feb 24, 2026 (Credit 1M+75): 3,550,075

TRUNCATE TABLE wallet_history;

insert into wallet_history (balance, date) values
  (4350000, '2024-08-30 14:18:00+00'), -- After Aug 2024 transactions
  (3850000, '2025-12-15 10:00:00+00'), -- After Vivian Debit
  (4050000, '2025-12-27 18:12:00+00'), -- After OLAYEMI Credit
  (2550000, '2026-01-20 14:30:00+00'), -- After Babatunde Debit
  (3550075, '2026-02-24 21:35:00+00'), -- After WIN HOMES Credit (Updated Amount)
  (3550075, now()); -- Current

-- Update final balance
update wallet_balances 
set account_balance = 3550075, ledger_balance = 3550075
where id in (select id from wallet_balances limit 1);
