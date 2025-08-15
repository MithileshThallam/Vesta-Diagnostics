// Backend API configuration
const BACKEND_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'https://vesta-diagnostics-t4nn.vercel.app' // Update this with your actual production URL
  : 'http://localhost:5000';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

export const apiCall = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    // Prepend backend base URL if the URL is relative
    const fullUrl = url.startsWith('http') ? url : `${BACKEND_BASE_URL}${url}`;
    console.log(fullUrl);
    
    console.log(`API call to: ${fullUrl}`);
    const response = await fetch(fullUrl, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // ...options.headers,
      },
      ...options,
    });

    console.log(`Response status: ${response.status}`);
    
    // Check if response is JSON before trying to parse it
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // If not JSON, read as text and provide a meaningful error
      const text = await response.text();
      console.error('Non-JSON response received:', text.substring(0, 200));
      
      if (response.status === 404) {
        throw new Error('API endpoint not found. Please check the URL.');
      } else if (response.status === 401) {
        throw new Error('Authentication required. Please log in again.');
      } else if (response.status === 403) {
        throw new Error('Access denied. You do not have permission.');
      } else if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error('Server returned an unexpected response format.');
      }
    }

    const data = await response.json();
    console.log(`Response data:`, data);

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        // Clear user state on authentication failure
        const { clearUser } = await import('@/stores/userStore');
        clearUser();
        throw new Error('Authentication failed. Please log in again.');
      }
      
      if (response.status === 403) {
        throw new Error('Access denied. You do not have permission to perform this action.');
      }
      
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }

      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return { data, status: response.status };
  } catch (error) {
    console.error('API call failed:', error);
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      status: 500,
    };
  }
};

export const adminApiCall = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  // Add referer header for admin routes to pass referer check
  const referer = window.location.origin;
  
  // Prepend backend base URL if the URL is relative
  const fullUrl = url.startsWith('http') ? url : `${BACKEND_BASE_URL}${url}`;
  
  return apiCall<T>(fullUrl, {
    ...options,
    headers: {
      ...options.headers,
      'Referer': referer,
    },
  });
};

export const handleApiError = (error: string, toast?: any) => {
  console.error('API Error:', error);
  
  if (toast) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
  }
  
  // Handle specific error types
  if (error.includes('Authentication failed')) {
    // Redirect to login
    window.location.href = '/login';
  }
  
  if (error.includes('Access denied')) {
    // Redirect to home
    window.location.href = '/';
  }
};
