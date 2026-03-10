import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { ArrowLeft, Building2, MapPin, Clock, FileText, Tag, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export function PostOpportunity() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    location: "",
    type: "",
    category: "",
    description: "",
    requirements: "",
    duration: "",
    hoursPerWeek: "",
  });

  // Check if user is authenticated and approved
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Login Required</h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in as an organization to post opportunities.
          </p>
          <div className="flex gap-2">
            <Link to="/login" className="flex-1">
              <Button className="w-full">Sign In</Button>
            </Link>
            <Link to="/signup" className="flex-1">
              <Button variant="outline" className="w-full">Sign Up</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (user?.role !== "organization") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Organization Account Required</h2>
          <p className="text-muted-foreground mb-6">
            Only verified nonprofit organizations can post volunteer opportunities.
          </p>
          <Link to="/browse">
            <Button>Browse Opportunities</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!user.isApproved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Approval Pending</h2>
          <p className="text-muted-foreground mb-6">
            Your organization account is currently under review. You'll be able to post opportunities once your account is approved by our admin team.
          </p>
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-sky-900">
              This typically takes 24-48 hours. We'll notify you via email once your account is approved.
            </p>
          </div>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.organization || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In a real app, this would submit to a backend
    toast.success("Opportunity posted successfully!");
    setTimeout(() => {
      navigate("/browse");
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">Post an Opportunity</h1>
            <p className="text-lg text-muted-foreground">
              Share your volunteer position with passionate individuals ready to make a difference
            </p>
          </div>

          <Card className="p-8 bg-white shadow-lg border-border">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Position Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Community Outreach Coordinator"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization Name *</Label>
                  <Input
                    id="organization"
                    placeholder="e.g., Hope for All Foundation"
                    value={formData.organization}
                    onChange={(e) => handleChange("organization", e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="e.g., San Francisco, CA"
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Work Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => handleChange("type", value)}
                    >
                      <SelectTrigger id="type" className="h-12">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onsite">Onsite</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger id="category" className="h-12">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Environment">Environment</SelectItem>
                      <SelectItem value="Community Service">Community Service</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Opportunity Details</h2>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the volunteer opportunity, responsibilities, and what the volunteer will learn..."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="min-h-32 resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the skills, experience, or qualifications needed (one per line)..."
                    value={formData.requirements}
                    onChange={(e) => handleChange("requirements", e.target.value)}
                    className="min-h-24 resize-none"
                  />
                </div>
              </div>

              {/* Time Commitment */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <Clock className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Time Commitment</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 3-6 months"
                      value={formData.duration}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hoursPerWeek">Hours per Week</Label>
                    <Input
                      id="hoursPerWeek"
                      placeholder="e.g., 10-15 hours"
                      value={formData.hoursPerWeek}
                      onChange={(e) => handleChange("hoursPerWeek", e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Post Opportunity
                </Button>
              </div>
            </form>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              Posting Guidelines
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Ensure all opportunities are unpaid and for nonprofit organizations</li>
              <li>• Provide clear descriptions of responsibilities and expectations</li>
              <li>• Be responsive to applicant inquiries and questions</li>
              <li>• Update or remove postings when positions are filled</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}