import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, MapPin, Clock, Calendar, Building2, CheckCircle2, ExternalLink, LogIn } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { mockOpportunities } from "../data/opportunities";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const opportunity = mockOpportunities.find((opp) => opp.id === id);

  if (!opportunity) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Opportunity Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The opportunity you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/browse">
          <Button>Browse Opportunities</Button>
        </Link>
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "remote":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "onsite":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "hybrid":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to apply for this opportunity");
      navigate("/login");
      return;
    }

    toast.success("Application submitted! The organization will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="overflow-hidden bg-white border-border">
              <div className="relative h-64 md:h-80">
                <ImageWithFallback
                  src={opportunity.image}
                  alt={opportunity.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Badge className={`${getTypeColor(opportunity.type)} capitalize border mb-3`}>
                    {opportunity.type}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {opportunity.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    <span className="text-lg font-medium">{opportunity.organization}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Quick Info */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium">Location</div>
                      <div className="font-medium">{opportunity.location}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium">Time Commitment</div>
                      <div className="font-medium">{opportunity.hoursPerWeek}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium">Duration</div>
                      <div className="font-medium">{opportunity.duration}</div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6 bg-white border-border">
              <h2 className="text-2xl font-semibold mb-4">About This Opportunity</h2>
              <p className="text-foreground/80 leading-relaxed">
                {opportunity.description}
              </p>
            </Card>

            {/* Requirements */}
            <Card className="p-6 bg-white border-border">
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-3">
                {opportunity.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="p-6 bg-white border-border sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Ready to Make a Difference?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Apply now to join {opportunity.organization} and start making an impact in your community.
              </p>
              <Button className="w-full mb-3" size="lg" onClick={handleApply}>
                Apply Now
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="w-4 h-4" />
                Visit Organization
              </Button>
            </Card>

            {/* Posted Date */}
            <Card className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
              <div className="text-sm text-muted-foreground mb-1">Posted on</div>
              <div className="font-medium">{formatDate(opportunity.postedDate)}</div>
            </Card>

            {/* Category */}
            <Card className="p-6 bg-white border-border">
              <div className="text-sm text-muted-foreground mb-2">Category</div>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {opportunity.category}
              </Badge>
            </Card>

            {/* Share */}
            <Card className="p-6 bg-white border-border">
              <h3 className="font-semibold mb-3">Share This Opportunity</h3>
              <p className="text-sm text-muted-foreground">
                Help spread the word about this volunteer position and encourage others to apply!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}