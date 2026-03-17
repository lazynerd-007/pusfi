
-- Re-calculate wallet_history based on all 7 credit transactions to make the chart realistic
-- Let's build a timeline of the balance based on the dates of these transactions.

-- Initial state (Before Jul 17, 2024) -> 0
-- Jul 17, 2024: +250,000 (HIGH KRYSTALL) -> 250,000
-- Aug 01, 2024: +3,500,000 (AGHOMI) -> 3,750,000
-- Aug 02, 2024: +400,000 (TOLULOPE) -> 4,150,000
-- Aug 02, 2024: +100,000 (Paystack) -> 4,250,000
-- Aug 30, 2024: +100,000 (BUD) -> 4,350,000
-- Feb 24, 2025: +1,000,000 (WIN HOMES) -> 5,350,000
-- Dec 27, 2025: +200,000 (OLAYEMI) -> 5,550,000

TRUNCATE TABLE wallet_history;

-- Insert history points that match the transactions perfectly
insert into wallet_history (balance, date) values
  (0, '2024-07-16 00:00:00+00'), -- Before first transaction
  (250000, '2024-07-17 17:18:00+00'), -- After HIGH KRYSTALL
  (3750000, '2024-08-01 07:09:00+00'), -- After AGHOMI
  (4150000, '2024-08-02 11:06:00+00'), -- After TOLULOPE
  (4250000, '2024-08-02 13:43:00+00'), -- After Paystack
  (4350000, '2024-08-30 14:18:00+00'), -- After BUD INFRASTRUCTURE
  (5350000, '2025-02-24 21:35:00+00'), -- After WIN HOMES
  (5550000, '2025-12-27 18:12:00+00'), -- After OLAYEMI
  (5550000, now()); -- Current

-- Update the main wallet_balances table to reflect the final sum of these transactions
update wallet_balances 
set account_balance = 5550000, ledger_balance = 5550000
where id in (select id from wallet_balances limit 1);
