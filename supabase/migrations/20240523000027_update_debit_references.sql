
-- Update the reference IDs for the two debit transactions

-- 1. Update Vivian's transaction reference
UPDATE transactions 
SET reference = '000015250245633453000006559820' 
WHERE description = 'Transfer to Vivian Oluwatoyin Odunewu';

-- 2. Update Babatunde's transaction reference
UPDATE transactions 
SET reference = '000034782198233453000006559820' 
WHERE description = 'Loan to Babatunde Odunewu Fauwaz';
