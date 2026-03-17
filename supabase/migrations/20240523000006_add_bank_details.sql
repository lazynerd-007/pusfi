-- Add bank account details to wallet_balances table
alter table wallet_balances 
  add column if not exists account_number text,
  add column if not exists account_name text,
  add column if not exists bank_name text;

-- Update the existing record with the provided details
update wallet_balances 
set 
  account_number = '4050303235',
  account_name = 'PB / Ifyand chisom Indiv.',
  bank_name = 'Premium Trust Bank'
where id in (select id from wallet_balances limit 1);

-- If no record exists (unlikely given previous steps), insert one
insert into wallet_balances (account_balance, ledger_balance, account_number, account_name, bank_name)
select 300000, 305000, '4050303235', 'PB / Ifyand chisom Indiv.', 'Premium Trust Bank'
where not exists (select 1 from wallet_balances);
