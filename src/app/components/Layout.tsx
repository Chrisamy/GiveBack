import { Link, Outlet, useLocation } from "react-router";
import { Heart, Search, PlusCircle, Home, Shield, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { ProfileDropdown } from "../pages/ProfileDropDown";

export function Layout() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GiveBack
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <Link to="/">
                <Button
                  variant={location.pathname === "/" ? "secondary" : "ghost"}
                  className="gap-2"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              <Link to="/browse">
                <Button
                  variant={location.pathname === "/browse" ? "secondary" : "ghost"}
                  className="gap-2"
                >
                  <Search className="w-4 h-4" />
                  Browse
                </Button>
              </Link>
              
              {user?.role === "organization" && (
                <Link to="/employer">
                  <Button
                    variant={location.pathname === "/employer" ? "secondary" : "ghost"}
                    className="gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
              )}

              {user?.role === "organization" && user.isApproved && (
                <Link to="/post">
                  <Button
                    variant={location.pathname === "/post" ? "default" : "outline"}
                    className="gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Post Opportunity
                  </Button>
                </Link>
              )}

              {user?.role === "admin" && (
                <Link to="/admin">
                  <Button
                    variant={location.pathname === "/admin" ? "default" : "outline"}
                    className="gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Dashboard
                  </Button>
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <>
                  <Link to="/login" className="hidden md:block">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Pending Approval Banner */}
      {user?.role === "organization" && !user.isApproved && (
        <div className="bg-amber-50 border-b border-amber-200 py-3">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-amber-900">
              <strong>Account Pending Approval:</strong> Your organization account is being reviewed. You'll be able to post opportunities once approved.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-sm text-muted-foreground">
                © 2026 GiveBack. Connecting nonprofits with passionate volunteers.
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}