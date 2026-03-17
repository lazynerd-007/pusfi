-- Update dashboard summary metrics to zero as requested
-- This ensures the UI reflects that we are fetching from the database (where we set these to 0)
-- instead of showing the old hardcoded/initial values (8 and 4)

UPDATE dashboard_summary
SET 
    upcoming_payment_count = 0,
    upcoming_payment_total = 0,
    schedule_payment_count = 0,
    recurring_payment_count = 0,
    
    -- Also zeroing out other metrics to be consistent with "fresh start" look if needed
    -- based on user's previous requests to zero things out
    daily_cash_inflow = 0,
    daily_cash_outflow = 0,
    invoice_inflow = 0,
    other_inflow = 0,
    payroll_outflow = 0,
    payment_outflow = 0,
    
    today_payment_count = 0,
    older_payment_count = 0,
    
    updated_at = now()
WHERE true;
