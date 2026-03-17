
-- Reset dashboard_stats to 0 values
TRUNCATE TABLE dashboard_stats;

insert into dashboard_stats (label, value, trend, trend_label) values
  ('Total Revenue', 0, 0, '+0% from last month'),
  ('Subscriptions', 0, 0, '+0% from last month'),
  ('Sales', 0, 0, '+0% from last month'),
  ('Active Now', 0, 0, '+0 since last hour');

-- Ensure dashboard_summary is set to 0
DO $$
BEGIN
    UPDATE dashboard_summary
    SET 
        upcoming_payment_count = 0,
        upcoming_payment_total = 0,
        daily_cash_inflow = 0,
        daily_cash_outflow = 0,
        invoice_inflow = 0,
        other_inflow = 0,
        updated_at = now()
    WHERE id IS NOT NULL;
END $$;
