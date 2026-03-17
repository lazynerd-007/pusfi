
-- Remove duplicates by keeping only one instance of each transaction reference
-- We delete rows that have the same reference but a higher (newer) ID (CTID or UUID)

-- 1. Deduplicate 'transactions' table
DELETE FROM transactions a USING transactions b
WHERE a.id < b.id 
AND a.reference = b.reference;

-- 2. Deduplicate 'recent_transactions' table (based on description and date)
DELETE FROM recent_transactions a USING recent_transactions b
WHERE a.id < b.id 
AND a.description = b.description
AND a.date = b.date;
