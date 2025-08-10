# Security Implementation

## Overview
This application implements a secure, token-based authentication system with role-based access control (RBAC) for three user types: users, sub-admins, and admins.

## Authentication Flow

### 1. Login Process
- Users login with phone/password
- Admin accounts are hardcoded (phone: 9999999999)
- Sub-admin and user accounts are stored in database
- JWT tokens are generated and stored in HTTP-only cookies
- Different cookie names for different user types:
  - `AdminAuthToken` for admins
  - `SubAdminAuthToken` for sub-admins  
  - `UserAuthToken` for regular users

### 2. Route Protection
- **Backend**: All protected routes use middleware chain:
  - `verifyToken` - Validates JWT token
  - `requireRole(['admin'])` - Checks user role
- **Frontend**: Routes are protected with `ProtectedRoute` component
- **Security**: Backend handles all authentication, frontend only handles UX

## Protected Routes

### Admin Routes (`/admin/*`)
- **Access**: Admin only
- **Middleware**: `verifyToken` + `requireAdmin`
- **Examples**: `/admin/overview`, `/admin/system-status`, `/admin/create`

### Sub-Admin Routes (`/sub-admin/*`)
- **Access**: Sub-admin only
- **Middleware**: `verifyToken` + `requireSubAdmin`
- **Examples**: `/sub-admin/dashboard`

### Mixed Routes
- **Access**: Admin or Sub-admin
- **Middleware**: `verifyToken` + `requireAdminOrSubAdmin`
- **Examples**: `/admin/auth-check`

## Security Features

### 1. Token Security
- JWT tokens stored in HTTP-only cookies
- Secure flag enabled in production
- 7-day expiration
- SameSite=lax for CSRF protection

### 2. Role-Based Access
- Hardcoded admin accounts (cannot be created via API)
- Sub-admin accounts created only by admins
- User accounts created via normal signup
- Role validation on every protected request

### 3. Error Handling
- Generic error messages (no information leakage)
- Proper HTTP status codes
- Automatic token cleanup on invalid auth

### 4. Rate Limiting
- General routes: 10,000 requests/15min
- Auth routes: 5,000 requests/15min  
- Admin routes: 1,000 requests/15min

## Testing

Run the authentication test:
```bash
cd backend
node test-auth.js
```

This will test:
- Admin login and access
- Unauthorized access attempts
- Invalid token handling
- Role-based access control

## Implementation Details

### Backend Middleware
```typescript
// Simple, clean middleware
export const verifyToken = (req, res, next) => {
  const token = req.cookies.UserAuthToken || req.cookies.SubAdminAuthToken || req.cookies.AdminAuthToken;
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  // Verify JWT and attach user to request
};

export const requireRole = (allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
```

### Frontend Protection
```typescript
// Simple route protection
<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

## Security Best Practices

1. **Backend-First Security**: All authentication happens on backend
2. **Minimal Frontend Logic**: Frontend only handles UX, not security
3. **Clean Code**: Simple, readable, maintainable security code
4. **No Over-Engineering**: Production-ready without unnecessary complexity
5. **Proper Error Handling**: Generic messages, proper status codes
6. **Token Management**: Secure cookie storage, automatic cleanup

## Environment Variables

Required environment variables:
```env
JWT_SECRET=your-secret-key-here
ADMIN_PASSWORD=admin@123
NODE_ENV=production
```

## Deployment Notes

1. Set `NODE_ENV=production` for secure cookies
2. Use strong `JWT_SECRET`
3. Change default admin password
4. Enable HTTPS in production
5. Configure proper CORS settings
