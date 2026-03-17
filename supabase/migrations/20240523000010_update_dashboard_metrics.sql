
-- Update dashboard_summary with non-zero values
-- We use UPDATE if a row exists, otherwise INSERT

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM dashboard_summary) THEN
        UPDATE dashboard_summary
        SET 
            daily_cash_inflow = 450000.00,
            daily_cash_outflow = 120500.00,
            upcoming_payment_count = 5,
            upcoming_payment_total = 250000.00,
            
            -- Breakdown values
            invoice_inflow = 300000.00,
            other_inflow = 150000.00,
            payroll_outflow = 80000.00,
            payment_outflow = 40500.00,
            
            -- Other counts
            today_payment_count = 3,
            older_payment_count = 12,
            schedule_payment_count = 8,
            recurring_payment_count = 4,
            
            updated_at = now();
    ELSE
        INSERT INTO dashboard_summary (
            daily_cash_inflow,
            daily_cash_outflow,
            upcoming_payment_count,
            upcoming_payment_total,
            invoice_inflow,
            other_inflow,
            payroll_outflow,
            payment_outflow,
            today_payment_count,
            older_payment_count,
            schedule_payment_count,
            recurring_payment_count
        ) VALUES (
            450000.00,
            120500.00,
            5,
            250000.00,
            300000.00,
            150000.00,
            80000.00,
            40500.00,
            3,
            12,
            8,
            4
        );
    END IF;
END $$;

-- Truncate dashboard_stats to ensure the UI falls back to 'Others' (other_inflow)
-- instead of showing generic 'Total Revenue' stats which don't sum up to the inflow.
TRUNCATE TABLE dashboard_stats;
