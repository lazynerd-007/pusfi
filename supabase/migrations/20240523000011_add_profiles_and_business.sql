
-- Create profiles table for user settings
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  first_name text,
  last_name text,
  email text,
  phone text,
  profile_picture text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create business_profiles table for company settings
create table if not exists business_profiles (
  id uuid default gen_random_uuid() primary key,
  business_name text,
  business_email text,
  business_phone text,
  business_logo text,
  business_description text, -- Bio
  business_industry text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;
alter table business_profiles enable row level security;

-- Public read policies
create policy "Allow public read access on profiles"
  on profiles for select
  using (true);

create policy "Allow public read access on business_profiles"
  on business_profiles for select
  using (true);

-- Insert sample data
insert into profiles (first_name, last_name, email, phone, profile_picture)
select 'Ifeany', 'Nnadi', 'ifeanychisomnnadi@gmail.com', '+2348012345678', null
where not exists (select 1 from profiles);

insert into business_profiles (business_name, business_email, business_phone, business_description, business_industry)
select 'PursFinance', 'contact@pursfinance.com', '+234', 'We provide the best financial solutions.', 'Fintech'
where not exists (select 1 from business_profiles);
