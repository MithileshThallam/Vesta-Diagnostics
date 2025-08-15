import React, { Component } from 'react';
import type {ErrorInfo, ReactNode} from 'react';
import { useUserStore } from '@/stores/userStore';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class AuthErrorBoundaryClass extends Component<Props & { clearUser: () => void }, State> {
  constructor(props: Props & { clearUser: () => void }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AuthErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Clear user state if it's an authentication error
    if (error.message.includes('Authentication failed') || 
        error.message.includes('401') || 
        error.message.includes('403')) {
      this.props.clearUser();
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-6">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Authentication Error
            </h1>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || 'An authentication error occurred. Please try again.'}
            </p>
            <div className="space-y-3">
              <Button 
                onClick={this.handleRetry}
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to provide the clearUser function
export const AuthErrorBoundary: React.FC<Props> = ({ children }) => {
  const { clearUser } = useUserStore();
  
  return (
    <AuthErrorBoundaryClass clearUser={clearUser}>
      {children}
    </AuthErrorBoundaryClass>
  );
};
