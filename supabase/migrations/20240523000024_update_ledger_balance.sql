
-- Subtract 155.80 from the current ledger balance
-- Current account_balance is 3,550,075
-- So ledger_balance should be 3,550,075 - 155.80 = 3,549,919.20

UPDATE wallet_balances 
SET ledger_balance = 3549919.20
WHERE id IN (SELECT id FROM wallet_balances LIMIT 1);
