import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Building2,
  PlusCircle,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  BarChart3,
  Settings,
  Globe,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Pencil,
  Eye,
  Shield,
  CalendarDays,
  Briefcase,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../context/AuthContext";
import { Opportunity } from "../data/opportunities";
import { toast } from "sonner";

export function EmployerDashboard() {
  const { user, updateUser } = useAuth();
  const [myPostings, setMyPostings] = useState<Opportunity[]>([]);
  const [profileForm, setProfileForm] = useState({
    organizationName: "",
    name: "",
    email: "",
    description: "",
    contactPhone: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      // Load posted opportunities for this user
      const stored = localStorage.getItem("postedOpportunities");
      const all: Opportunity[] = stored ? JSON.parse(stored) : [];
      setMyPostings(all.filter((o) => o.postedBy === user.id));

      // Pre-fill profile form
      setProfileForm({
        organizationName: user.organizationName || "",
        name: user.name || "",
        email: user.email || "",
        description: user.description || "",
        contactPhone: user.contactPhone || "",
        website: user.website || "",
      });
    }
  }, [user]);

  // Access guard
  if (!user || user.role !== "organization") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            This page is only available to organization accounts.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const totalApplications = myPostings.reduce(
    (sum, p) => sum + (p.applicationCount || 0),
    0
  );

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      organizationName: profileForm.organizationName,
      name: profileForm.name,
      description: profileForm.description,
      contactPhone: profileForm.contactPhone,
      website: profileForm.website,
    });
    toast.success("Profile updated successfully!");
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileForm({ ...profileForm, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">
                  {user.organizationName || "Organization Dashboard"}
                </h1>
                {user.isApproved ? (
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending Approval
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Manage your organization profile, postings, and applications
              </p>
            </div>
          </div>

          {user.isApproved && (
            <Link to="/post">
              <Button className="gap-2 shadow-lg shadow-primary/20">
                <PlusCircle className="w-4 h-4" />
                Post New Opportunity
              </Button>
            </Link>
          )}
        </div>

        {/* Pending Banner */}
        {!user.isApproved && (
          <Card className="p-6 mb-8 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">
                  Account Under Review
                </h3>
                <p className="text-sm text-amber-800">
                  Your organization account is currently being reviewed by our admin team.
                  Once approved, you'll be able to post volunteer opportunities for free.
                  This typically takes 24-48 hours. We'll notify you via email once your
                  account is approved.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4 hidden md:block" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="postings" className="gap-2">
              <Briefcase className="w-4 h-4 hidden md:block" />
              My Postings
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Settings className="w-4 h-4 hidden md:block" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="gap-2">
              <Shield className="w-4 h-4 hidden md:block" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Total Postings
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {myPostings.length}
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Active Postings
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      {myPostings.length}
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Applications Received
                    </div>
                    <div className="text-3xl font-bold text-violet-600">
                      {totalApplications}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {user.isApproved && (
                  <Link to="/post">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2"
                    >
                      <PlusCircle className="w-6 h-6 text-primary" />
                      <span>Post New Opportunity</span>
                    </Button>
                  </Link>
                )}
                <Link to="/browse">
                  <Button
                    variant="outline"
                    className="w-full h-auto py-4 flex flex-col items-center gap-2"
                  >
                    <Eye className="w-6 h-6 text-primary" />
                    <span>Browse All Listings</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 flex flex-col items-center gap-2"
                  onClick={() => {
                    const tabTrigger = document.querySelector(
                      '[data-value="profile"]'
                    ) as HTMLButtonElement;
                    tabTrigger?.click();
                  }}
                >
                  <Pencil className="w-6 h-6 text-primary" />
                  <span>Edit Profile</span>
                </Button>
              </div>
            </Card>

            {/* Recent Postings Preview */}
            <Card className="p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Postings</h3>
                {myPostings.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const tabTrigger = document.querySelector(
                        '[data-value="postings"]'
                      ) as HTMLButtonElement;
                      tabTrigger?.click();
                    }}
                  >
                    View All
                  </Button>
                )}
              </div>
              {myPostings.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">
                    You haven't posted any opportunities yet.
                  </p>
                  {user.isApproved && (
                    <Link to="/post">
                      <Button className="gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Create Your First Posting
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {myPostings.slice(0, 3).map((posting) => (
                    <div
                      key={posting.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-sky-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{posting.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {posting.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {posting.postedDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{posting.category}</Badge>
                        <Link to={`/opportunity/${posting.id}`}>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* My Postings Tab */}
          <TabsContent value="postings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Postings</h2>
              {user.isApproved && (
                <Link to="/post">
                  <Button className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    New Posting
                  </Button>
                </Link>
              )}
            </div>

            {myPostings.length === 0 ? (
              <Card className="p-12 text-center bg-white">
                <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Postings Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {user.isApproved
                    ? "Start posting volunteer opportunities to attract passionate volunteers to your cause."
                    : "Once your account is approved, you'll be able to post volunteer opportunities here."}
                </p>
                {user.isApproved && (
                  <Link to="/post">
                    <Button className="gap-2">
                      <PlusCircle className="w-4 h-4" />
                      Post Your First Opportunity
                    </Button>
                  </Link>
                )}
              </Card>
            ) : (
              <div className="space-y-4">
                {myPostings.map((posting) => (
                  <Card
                    key={posting.id}
                    className="p-6 bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">
                            {posting.title}
                          </h3>
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            Active
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {posting.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {posting.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            Posted {posting.postedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {posting.applicationCount || 0} applications
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {posting.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/opportunity/${posting.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Organization Profile</h2>
            <Card className="p-8 bg-white">
              <form onSubmit={handleProfileSave} className="space-y-8">
                {/* Organization Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Building2 className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">
                      Organization Information
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      value={profileForm.organizationName}
                      onChange={(e) =>
                        handleProfileChange("organizationName", e.target.value)
                      }
                      className="h-12"
                      placeholder="Your Organization Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orgDescription">About / Description</Label>
                    <Textarea
                      id="orgDescription"
                      value={profileForm.description}
                      onChange={(e) =>
                        handleProfileChange("description", e.target.value)
                      }
                      className="min-h-32 resize-none"
                      placeholder="Tell volunteers about your organization's mission, impact, and the kind of work you do..."
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Mail className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">
                      Contact Information
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Person Name</Label>
                    <Input
                      id="contactName"
                      value={profileForm.name}
                      onChange={(e) =>
                        handleProfileChange("name", e.target.value)
                      }
                      className="h-12"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="contactEmail"
                          value={profileForm.email}
                          disabled
                          className="pl-10 h-12 bg-gray-50"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="contactPhone"
                          value={profileForm.contactPhone}
                          onChange={(e) =>
                            handleProfileChange("contactPhone", e.target.value)
                          }
                          className="pl-10 h-12"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="website"
                        value={profileForm.website}
                        onChange={(e) =>
                          handleProfileChange("website", e.target.value)
                        }
                        className="pl-10 h-12"
                        placeholder="https://yourorganization.org"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <h2 className="text-2xl font-bold">Account Details</h2>

            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold mb-4">Account Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        user.isApproved
                          ? "bg-green-100"
                          : "bg-amber-100"
                      }`}
                    >
                      {user.isApproved ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">Verification Status</div>
                      <div className="text-sm text-muted-foreground">
                        {user.isApproved
                          ? "Your organization has been verified and approved"
                          : "Your account is pending admin approval"}
                      </div>
                    </div>
                  </div>
                  {user.isApproved ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Approved
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-700 border-amber-200"
                    >
                      Pending
                    </Badge>
                  )}
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-muted-foreground">
                      Organization Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span>{user.organizationName || "Not set"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                      {user.contactPhone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{user.contactPhone}</span>
                        </div>
                      )}
                      {user.website && (
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            {user.website}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-muted-foreground">
                      Account Capabilities
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        {user.isApproved ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                        )}
                        <span>
                          Post volunteer opportunities{" "}
                          {!user.isApproved && "(requires approval)"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Edit organization profile</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Browse all opportunities</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {user.isApproved ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                        )}
                        <span>
                          Receive volunteer applications{" "}
                          {!user.isApproved && "(requires approval)"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Free Platform Info */}
            <Card className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Free for Nonprofits
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                GiveBack is completely free for verified nonprofit organizations.
                Once approved, you can:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Post unlimited volunteer opportunities at no cost</li>
                <li>• Manage and track all your postings from one place</li>
                <li>• Connect with passionate volunteers in your community</li>
                <li>• Access tools to manage your volunteer programs</li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

