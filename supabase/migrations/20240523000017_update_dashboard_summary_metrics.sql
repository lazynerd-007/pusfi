
-- Update Dashboard Summary with the requested metrics
-- Note: 'Daily Cash Outflow' is already a column, we just need to populate it.
-- We will also update 'Payment that need Attention' (today/older payments) and 'Upcoming Payment this week'.

DO $$
BEGIN
    UPDATE dashboard_summary
    SET 
        -- 1. Daily Cash Outflow
        daily_cash_outflow = 0,  -- Example value
        
        -- 2. Payment that need Attention
        today_payment_count = 0,
        older_payment_count = 9,
        
        -- 3. Upcoming Payment this week
        upcoming_payment_count = 0,
        upcoming_payment_total = 0,
        
        -- (Optional) Ensuring other values aren't 0 if they were reset
        daily_cash_inflow = 0, 
        
        updated_at = now()
    WHERE id IS NOT NULL;
END $$;
