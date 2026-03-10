import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Heart, Mail, Lock, User, Building2, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { useAuth, UserRole } from "../context/AuthContext";
import { toast } from "sonner";

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error("Please select your account type");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (selectedRole === "organization" && !formData.organizationName) {
      toast.error("Please enter your organization name");
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(
        formData.email,
        formData.password,
        formData.name,
        selectedRole,
        selectedRole === "organization" ? formData.organizationName : undefined
      );

      if (success) {
        if (selectedRole === "organization") {
          toast.success("Account created! Your organization will be reviewed by our team.");
          navigate("/login");
        } else {
          toast.success("Account created successfully!");
          navigate("/");
        }
      } else {
        toast.error("Email already exists");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwRUE1RTkiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

      <div className="w-full max-w-2xl relative">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <Card className="p-8 bg-white/80 backdrop-blur-lg border-border shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" fill="white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">Join GiveBack and start making a difference</p>
          </div>

          {/* Role Selection */}
          {!selectedRole && (
            <div className="space-y-4 mb-6">
              <Label>I am a...</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole("applicant")}
                  className="p-6 border-2 border-border rounded-2xl hover:border-primary hover:bg-sky-50 transition-all text-left group"
                >
                  <User className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">Volunteer</h3>
                  <p className="text-sm text-muted-foreground">
                    Looking for volunteer opportunities and internships
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("organization")}
                  className="p-6 border-2 border-border rounded-2xl hover:border-primary hover:bg-sky-50 transition-all text-left group"
                >
                  <Building2 className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">Organization</h3>
                  <p className="text-sm text-muted-foreground">
                    Nonprofit looking to post volunteer opportunities
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          {selectedRole && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between mb-4 p-3 bg-sky-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {selectedRole === "applicant" ? (
                    <User className="w-5 h-5 text-primary" />
                  ) : (
                    <Building2 className="w-5 h-5 text-primary" />
                  )}
                  <span className="font-medium">
                    {selectedRole === "applicant" ? "Volunteer Account" : "Organization Account"}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRole("")}
                >
                  Change
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {selectedRole === "organization" && (
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="organizationName"
                      type="text"
                      placeholder="Your Nonprofit Organization"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {selectedRole === "organization" && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-900">
                    <strong>Note:</strong> Organization accounts require approval from our admin team before you can post opportunities. We'll review your account within 24-48 hours.
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
