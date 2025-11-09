import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state when an error occurs
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-red-500">Something went wrong</h1>
          <p className="text-gray-300">{this.state.error?.message || "Unknown error"}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-pink-500 text-white py-2 px-4 rounded"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    // Render normally
    return this.props.children;
  }
}

export default ErrorBoundary;
