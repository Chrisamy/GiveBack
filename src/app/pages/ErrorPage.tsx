import { useRouteError, Link } from "react-router";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/button";

export function ErrorPage() {
  const error = useRouteError() as { status?: number; statusText?: string; message?: string };

  const is404 = error?.status === 404;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {is404 ? (
          <>
            <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
            <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
            <p className="text-muted-foreground mb-8">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
            <p className="text-muted-foreground mb-8">
              An unexpected error occurred. Please try again later.
            </p>
          </>
        )}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Link to="/">
            <Button className="gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

