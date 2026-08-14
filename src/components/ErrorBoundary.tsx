import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="px-4 text-center">
            <h1 className="mb-4 font-bold text-2xl">Something went wrong</h1>
            <p className="mb-6 text-muted-foreground">
              We're sorry, but something unexpected happened.
            </p>
            <button
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              onClick={() => window.location.reload()}
              type="button"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
