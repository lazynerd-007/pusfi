
-- Re-populate dashboard_stats with specific values requested
-- Truncate first to avoid duplicates or old data
TRUNCATE TABLE dashboard_stats;

insert into dashboard_stats (label, value, trend, trend_label) values
  ('Total Revenue', 450000.00, 20.1, '+20.1% from last month'),
  ('Subscriptions', 50, 5.0, '+5% from last month'),
  ('Sales', 120, 15.0, '+15% from last month'),
  ('Active Now', 15, 2, '+2 since last hour');

-- Ensure dashboard_summary is also correct (reinforcing the values)
DO $$
BEGIN
    UPDATE dashboard_summary
    SET 
        upcoming_payment_count = 5,
        upcoming_payment_total = 250000.00,
        daily_cash_inflow = 450000.00,
        daily_cash_outflow = 120500.00,
        invoice_inflow = 300000.00,
        other_inflow = 150000.00,
        updated_at = now()
    WHERE id IS NOT NULL;
END $$;
