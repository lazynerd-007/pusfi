# How to Push Changes to Supabase

Since we are managing database schema and data updates via SQL migration files, we use the Supabase CLI to apply these changes to the remote database.

## Prerequisites
1. Ensure you have the Supabase CLI installed (or run via `npx`).
2. Ensure you are logged in to Supabase.

## Steps to Push

### 1. Login (If not already logged in)
If you haven't authenticated recently, run:
```bash
npx supabase login
```
*Follow the instructions to open your browser and authenticate.*

### 2. Link Project
Ensure your local environment is linked to the correct remote project (`zzvklhkvhsibpnipwstq`).
```bash
npx supabase link --project-ref zzvklhkvhsibpnipwstq
```
*You may be asked for your database password.*

### 3. Repair History (If needed)
If you encounter errors about "Remote migration versions not found", it means some old migration files were deleted locally but exist remotely. You need to tell Supabase to ignore them:
```bash
npx supabase migration repair --status reverted <version_number>
```
*Example:*
```bash
npx supabase migration repair --status reverted 20240523000001
```

### 4. Push Changes
To apply all pending migration files (e.g., dashboard updates, new tables) to the live database:
```bash
npx supabase db push
```

## Recent Changes Pushed
- **Account Name Update:** Changed to "PB / Ifyand chisom Indiv."
- **Dashboard Metrics:** Populated "Daily Cash Inflow", "Upcoming Payments", "Revenue", etc., with non-zero data.
- **New Tables:** Added `profiles` and `business_profiles` for the Settings page.
