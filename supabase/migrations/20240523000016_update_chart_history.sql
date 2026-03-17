
-- Update chart data (wallet_history) to reflect the new transactions
-- We need data points that show the balance increasing

TRUNCATE TABLE wallet_history;

-- Insert history points
insert into wallet_history (balance, date) values
  (150000, '2025-12-25 10:00:00+00'), -- Before first topup
  (350000, '2025-12-27 18:15:00+00'), -- After 200k topup (Dec 27)
  (340000, '2026-01-15 09:00:00+00'), -- Some spending
  (330000, '2026-02-20 12:00:00+00'), -- More spending
  (1330000, '2026-02-24 21:40:00+00'), -- After 1M topup (Feb 24)
  (1330000, now()); -- Current
