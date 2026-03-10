import { Link } from "react-router";
import { ArrowRight, Heart, Search, TrendingUp, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { OpportunityCard } from "../components/OpportunityCard";
import { mockOpportunities } from "../data/opportunities";
/*import { Input } from "../components/ui/input";*/

export function Home() {
  const featuredOpportunities = mockOpportunities.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwRUE1RTkiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary/10">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Connecting hearts with causes</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-sky-800 to-slate-900 bg-clip-text text-transparent leading-tight">
              Make a Difference Through Volunteering
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Discover meaningful unpaid internships and volunteer opportunities with nonprofit organizations making real impact in communities worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/browse">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                  <Search className="w-5 h-5" />
                  Explore Opportunities
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/post">
                <Button size="lg" variant="outline" className="gap-2 bg-white/60 backdrop-blur-sm hover:bg-white">
                  <Heart className="w-5 h-5" />
                  Post an Opportunity
                </Button>
              </Link>
            </div>

            {/* Stats
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Active Opportunities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">200+</div>
                <div className="text-sm text-muted-foreground">Nonprofit Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">5K+</div>
                <div className="text-sm text-muted-foreground">Volunteers Placed</div>
              </div>
            </div>*/}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      </section>

      {/* Featured Opportunities */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Opportunities</h2>
            <p className="text-muted-foreground">Hand-picked volunteer positions making an impact</p>
          </div>
          <Link to="/browse">
            <Button variant="ghost" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
          <p className="text-muted-foreground">Find opportunities that match your interests and skills</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Education", icon: "📚", color: "from-blue-400 to-blue-600" },
            { name: "Healthcare", icon: "❤️", color: "from-red-400 to-red-600" },
            { name: "Environment", icon: "🌱", color: "from-green-400 to-green-600" },
            { name: "Community", icon: "🤝", color: "from-purple-400 to-purple-600" },
            { name: "Technology", icon: "💻", color: "from-cyan-400 to-cyan-600" },
            { name: "Arts & Culture", icon: "🎨", color: "from-pink-400 to-pink-600" },
            { name: "Animal Welfare", icon: "🐾", color: "from-amber-400 to-amber-600" },
            { name: "Youth Development", icon: "🎓", color: "from-indigo-400 to-indigo-600" },
          ].map((category) => (
            <Link key={category.name} to="/browse">
              <div className="group bg-white border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-white to-sky-50 rounded-3xl p-8 md:p-12 border border-sky-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-muted-foreground">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Browse Opportunities</h3>
              <p className="text-muted-foreground">
                Explore hundreds of volunteer positions from verified nonprofit organizations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Apply with Purpose</h3>
              <p className="text-muted-foreground">
                Connect directly with organizations and show them why you're the perfect fit
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Make an Impact</h3>
              <p className="text-muted-foreground">
                Start volunteering and gain valuable experience while helping communities thrive
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary via-sky-500 to-accent rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          
          <div className="relative">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Are You a Nonprofit Organization?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
              Post volunteer opportunities for free and connect with passionate individuals ready to make a difference in your community.
            </p>
            <Link to="/post">
              <Button size="lg" variant="secondary" className="gap-2">
                Post an Opportunity
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
