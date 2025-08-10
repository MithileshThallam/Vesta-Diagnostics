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
    console.log(`API call to: ${url}`);
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    console.log(`Response status: ${response.status}`);
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
  
  return apiCall<T>(url, {
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
