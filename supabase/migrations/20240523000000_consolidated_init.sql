
-- Consolidate all initialization logic into one file to avoid conflicts
-- This replaces the individual init files that were causing policy conflicts

-- 1. Dashboard Stats
create table if not exists dashboard_stats (
  id uuid default gen_random_uuid() primary key,
  label text not null,
  value numeric not null,
  trend numeric,
  trend_label text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Recent Transactions
create table if not exists recent_transactions (
  id uuid default gen_random_uuid() primary key,
  description text not null,
  amount numeric not null,
  status text check (status in ('completed', 'pending', 'failed')) default 'pending',
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  recipient text
);

-- 3. Wallet Balances
create table if not exists wallet_balances (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  account_balance numeric default 0,
  ledger_balance numeric default 0,
  currency text default 'NGN',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Wallet History
create table if not exists wallet_history (
  id uuid default gen_random_uuid() primary key,
  balance numeric not null,
  date timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Dashboard Summary
create table if not exists dashboard_summary (
  id uuid default gen_random_uuid() primary key,
  today_payment_count integer default 0,
  older_payment_count integer default 0,
  upcoming_payment_count integer default 0,
  upcoming_payment_total numeric default 0,
  schedule_payment_count integer default 0,
  recurring_payment_count integer default 0,
  daily_cash_inflow numeric default 0,
  daily_cash_outflow numeric default 0,
  invoice_inflow numeric default 0,
  other_inflow numeric default 0,
  payroll_outflow numeric default 0,
  payment_outflow numeric default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Transactions
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  business_id uuid,
  amount numeric not null,
  type text check (type in ('credit', 'debit')),
  status text check (status in ('success', 'pending', 'failed')),
  description text,
  reference text,
  category text,
  recipient_name text,
  recipient_bank text,
  recipient_account text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table dashboard_stats enable row level security;
alter table recent_transactions enable row level security;
alter table wallet_balances enable row level security;
alter table wallet_history enable row level security;
alter table dashboard_summary enable row level security;
alter table transactions enable row level security;

-- Create policies (Check if exists first to avoid errors)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on dashboard_stats') THEN
        create policy "Allow public read access on dashboard_stats" on dashboard_stats for select using (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on recent_transactions') THEN
        create policy "Allow public read access on recent_transactions" on recent_transactions for select using (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on wallet_balances') THEN
        create policy "Allow public read access on wallet_balances" on wallet_balances for select using (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on wallet_history') THEN
        create policy "Allow public read access on wallet_history" on wallet_history for select using (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on dashboard_summary') THEN
        create policy "Allow public read access on dashboard_summary" on dashboard_summary for select using (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access on transactions') THEN
        create policy "Allow public read access on transactions" on transactions for select using (true);
    END IF;
END $$;

-- Insert Initial Data (Using INSERT INTO ... ON CONFLICT DO NOTHING or NOT EXISTS checks)
-- This prevents duplicate data on re-runs

-- Wallet Balance
insert into wallet_balances (account_balance, ledger_balance)
select 300000, 305000
where not exists (select 1 from wallet_balances);

-- Wallet History
insert into wallet_history (balance, date)
select 150000, now() - interval '6 days' where not exists (select 1 from wallet_history limit 1);

insert into wallet_history (balance, date) values
  (220000, now() - interval '5 days'),
  (180000, now() - interval '4 days'),
  (250000, now() - interval '3 days'),
  (210000, now() - interval '2 days'),
  (280000, now() - interval '1 day'),
  (300000, now());

-- Dashboard Stats
insert into dashboard_stats (label, value, trend, trend_label) values
  ('Total Revenue', 45231.89, 20.1, '+20.1% from last month'),
  ('Subscriptions', 2350, 180.1, '+180.1% from last month'),
  ('Sales', 12234, 19, '+19% from last month'),
  ('Active Now', 573, 201, '+201 since last hour');

-- Dashboard Summary
insert into dashboard_summary (
  today_payment_count, older_payment_count, upcoming_payment_count, upcoming_payment_total,
  schedule_payment_count, recurring_payment_count, daily_cash_inflow, daily_cash_outflow,
  invoice_inflow, other_inflow, payroll_outflow, payment_outflow
)
select 5, 12, 3, 15400.50, 8, 4, 45000.00, 12500.00, 32000.00, 13000.00, 8000.00, 4500.00
where not exists (select 1 from dashboard_summary);
