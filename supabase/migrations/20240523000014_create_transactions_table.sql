
-- Create a comprehensive transactions table
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id), -- Optional link to auth user
  business_id uuid, -- For filtering by business
  amount numeric not null,
  type text check (type in ('credit', 'debit')),
  status text check (status in ('success', 'pending', 'failed')),
  description text,
  reference text,
  category text, -- e.g., 'Transfer', 'Bill Payment', 'Invoice'
  recipient_name text,
  recipient_bank text,
  recipient_account text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table transactions enable row level security;

-- Create policy for public read (for demo simplicity)
create policy "Allow public read access on transactions"
  on transactions for select
  using (true);

-- Insert sample data (Diverse mix of transactions)
insert into transactions (amount, type, status, description, reference, category, recipient_name, created_at) values
  (50000, 'credit', 'success', 'Opening Balance', 'REF-001', 'Funding', 'Self', now() - interval '30 days'),
  (12000, 'debit', 'success', 'Internet Subscription', 'REF-002', 'Bill Payment', 'MTN Nigeria', now() - interval '28 days'),
  (250000, 'credit', 'success', 'Invoice Payment #1023', 'REF-003', 'Invoice', 'Client A', now() - interval '25 days'),
  (5000, 'debit', 'success', 'Airtime Purchase', 'REF-004', 'Bill Payment', 'Airtel', now() - interval '20 days'),
  (85000, 'debit', 'success', 'Staff Salary - March', 'REF-005', 'Payroll', 'Staff List', now() - interval '15 days'),
  (150000, 'credit', 'success', 'Project Milestone 1', 'REF-006', 'Invoice', 'Tech Corp', now() - interval '10 days'),
  (3500, 'debit', 'failed', 'Electricity Bill', 'REF-007', 'Bill Payment', 'IKEDC', now() - interval '8 days'),
  (42000, 'debit', 'success', 'Office Supplies', 'REF-008', 'Expense', 'Stationery Store', now() - interval '5 days'),
  (12500, 'debit', 'pending', 'Server Hosting', 'REF-009', 'Expense', 'AWS', now() - interval '2 days'),
  (75000, 'credit', 'success', 'Consultation Fee', 'REF-010', 'Invoice', 'Startup Inc', now() - interval '1 day'),
  (2000, 'debit', 'success', 'Bank Charges', 'REF-011', 'Bank Charge', 'Premium Trust', now());
