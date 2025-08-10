const fetch = require('node-fetch');

async function testAuth() {
  const baseUrl = 'http://localhost:5000';
  
  try {
    console.log('🔐 Testing authentication and authorization...\n');
    
    // Test 1: Admin login
    console.log('1. Testing admin login...');
    const adminLoginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '9999999999',
        password: 'admin@123'
      })
    });
    
    console.log('Admin login status:', adminLoginResponse.status);
    const adminLoginData = await adminLoginResponse.json();
    console.log('Admin login response:', adminLoginData);
    
    // Get cookies from admin login
    const adminCookies = adminLoginResponse.headers.get('set-cookie');
    console.log('Admin cookies:', adminCookies);
    
    // Test 2: Admin access to protected routes
    console.log('\n2. Testing admin access to protected routes...');
    
    // Test admin auth-check
    const adminAuthCheckResponse = await fetch(`${baseUrl}/api/admin/auth-check`, {
      headers: { 'Cookie': adminCookies }
    });
    console.log('Admin auth-check status:', adminAuthCheckResponse.status);
    const adminAuthCheckData = await adminAuthCheckResponse.json();
    console.log('Admin auth-check response:', adminAuthCheckData);
    
    // Test admin overview (admin only)
    const adminOverviewResponse = await fetch(`${baseUrl}/api/admin/overview`, {
      headers: { 'Cookie': adminCookies }
    });
    console.log('Admin overview status:', adminOverviewResponse.status);
    
    // Test 3: Unauthorized access attempts
    console.log('\n3. Testing unauthorized access...');
    
    // Try to access admin route without auth
    const noAuthResponse = await fetch(`${baseUrl}/api/admin/overview`);
    console.log('No auth access status:', noAuthResponse.status);
    
    // Try to access with invalid token
    const invalidTokenResponse = await fetch(`${baseUrl}/api/admin/overview`, {
      headers: { 'Cookie': 'AdminAuthToken=invalid-token' }
    });
    console.log('Invalid token access status:', invalidTokenResponse.status);
    
    // Test 4: User login (if you have a test user)
    console.log('\n4. Testing user login...');
    const userLoginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '1234567890', // Replace with actual test user
        password: 'password123'
      })
    });
    
    console.log('User login status:', userLoginResponse.status);
    if (userLoginResponse.ok) {
      const userCookies = userLoginResponse.headers.get('set-cookie');
      
      // Test user trying to access admin route
      const userAdminAccessResponse = await fetch(`${baseUrl}/api/admin/overview`, {
        headers: { 'Cookie': userCookies }
      });
      console.log('User trying to access admin route status:', userAdminAccessResponse.status);
    }
    
    console.log('\n✅ Authentication tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAuth();
