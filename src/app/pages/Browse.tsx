import { useState } from "react";
import { Search, Filter, MapPin, Clock } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { OpportunityCard } from "../components/OpportunityCard";
import { mockOpportunities } from "../data/opportunities";

export function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "all" || opp.type === selectedType;
    const matchesCategory = selectedCategory === "all" || opp.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  const categories = Array.from(new Set(mockOpportunities.map(opp => opp.category)));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-white border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Browse Opportunities</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover volunteer positions that match your passion and skills
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by title, organization, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base bg-white shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-lg">Filters</h2>
              </div>

              <div className="space-y-6">
                {/* Type Filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Work Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">Onsite</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quick Stats */}
                <div className="pt-6 border-t border-border">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Opportunities</span>
                      <Badge variant="secondary">{mockOpportunities.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Showing Results</span>
                      <Badge variant="secondary">{filteredOpportunities.length}</Badge>
                    </div>
                  </div>
                </div>

                {/* Reset Filters */}
                {(selectedType !== "all" || selectedCategory !== "all" || searchQuery) && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedType("all");
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Found <span className="font-semibold text-foreground">{filteredOpportunities.length}</span> opportunities
              </p>
            </div>

            {filteredOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-border">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No opportunities found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedType("all");
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
