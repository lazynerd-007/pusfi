
-- Update the account name to 'PB / Ifyand chisom Indiv.' in the wallet_balances table
update wallet_balances 
set 
  account_name = 'PB / Ifyand chisom Indiv.',
  bank_name = 'Premium Trust Bank',
  account_number = '4050303235'
where id in (select id from wallet_balances limit 1);

-- If the table is empty, insert the record
insert into wallet_balances (account_balance, ledger_balance, account_number, account_name, bank_name)
select 300000, 305000, '4050303235', 'PB / Ifyand chisom Indiv.', 'Premium Trust Bank'
where not exists (select 1 from wallet_balances);
