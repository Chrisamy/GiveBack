import { Link } from "react-router";
import { MapPin, Clock, Calendar, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { Opportunity } from "../data/opportunities";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
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
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="group overflow-hidden border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={opportunity.image}
          alt={opportunity.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge className={`${getTypeColor(opportunity.type)} capitalize border`}>
            {opportunity.type}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
            {opportunity.title}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            {opportunity.organization}
          </p>
        </div>

        <p className="text-sm text-foreground/80 mb-4 line-clamp-2">
          {opportunity.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{opportunity.hoursPerWeek} • {opportunity.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Posted {formatDate(opportunity.postedDate)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {opportunity.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Link to={`/opportunity/${opportunity.id}`}>
          <Button className="w-full group/btn">
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
