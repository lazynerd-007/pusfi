-- Update the business name and user profile name to match the requested account name

-- Update Business Profile (The top bold text in the sidebar)
UPDATE business_profiles 
SET business_name = 'Ifyand chisom' 
WHERE true;

-- Update User Profile (The sub-text in the sidebar)
UPDATE profiles 
SET first_name = 'Ifyand chisom', 
    last_name = 'Indiv.' 
WHERE true;
