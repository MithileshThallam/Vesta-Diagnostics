# Email Field Fix for Sub-Admin Creation

## Problem
The MongoDB collection `vesta-diagnostics.subadmins` has a unique index on the `email` field, but the current SubAdmin schema does not include an email field. This causes a duplicate key error when trying to create new sub-admins because MongoDB tries to insert `{ email: null }` and only one document can have a null email value.

## Solution
We've removed all email-related requirements from the sub-admin creation process and provided a script to remove the problematic database index.

## Changes Made

### 1. Validation Schema (`src/utils/validationSchema.ts`)
- ✅ Removed `email` field from `signupSchema`
- ✅ Kept `createAdminSchema` focused on sub-admin creation (phone, role, branch, password)

### 2. Input Validation Middleware (`src/middlewares/validateInput.ts`)
- ✅ Removed `email` from `ALLOWED_FIELDS` array
- ✅ This prevents any email data from being processed during sub-admin creation

### 3. SubAdmin Model (`src/models/SubAdmin.ts`)
- ✅ Already correct - no email field defined
- ✅ Only has: phone, password, role, branch

## How to Fix the Database

### Option 1: Run the Automated Script (Recommended)
```bash
cd backend
npm run fix-email-index
```

### Option 2: Manual MongoDB Command
Connect to your MongoDB and run:
```js
use vesta-diagnostics
db.subadmins.dropIndex("email_1")
```

### Option 3: Check and Remove Index via MongoDB Compass
1. Open MongoDB Compass
2. Navigate to `vesta-diagnostics` database
3. Go to `subadmins` collection
4. Check the Indexes tab
5. Remove any index named `email_1`

## Verification
After running the fix:
1. The `email_1` index should be removed
2. You should be able to create new sub-admins without errors
3. The unique constraint will only apply to `phone` field (as intended)

## Testing
Try creating a new sub-admin with:
```json
{
  "phone": "1234567890",
  "role": "sub-admin",
  "branch": "Test Branch",
  "password": "password123"
}
```

This should now work without the duplicate key error.

## Notes
- The SubAdmin model intentionally doesn't include email
- Phone number remains the unique identifier for sub-admins
- All validation and business logic has been updated accordingly
