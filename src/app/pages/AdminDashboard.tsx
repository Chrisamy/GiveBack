import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Building2, Mail, Calendar, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useAuth, User } from "../context/AuthContext";
import { toast } from "sonner";

export function AdminDashboard() {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState<User[]>([]);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = () => {
    const usersJson = localStorage.getItem("users");
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    const orgs = users.filter((u) => u.role === "organization");
    setOrganizations(orgs);
  };

  const handleApprove = (orgId: string) => {
    const usersJson = localStorage.getItem("users");
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    
    const updatedUsers = users.map((u) =>
      u.id === orgId ? { ...u, isApproved: true } : u
    );
    
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Update current user if they're the one being approved
    const currentUserJson = localStorage.getItem("currentUser");
    if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      if (currentUser.id === orgId) {
        const updatedCurrentUser = { ...currentUser, isApproved: true };
        localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
      }
    }
    
    loadOrganizations();
    toast.success("Organization approved!");
  };

  const handleReject = (orgId: string) => {
    const usersJson = localStorage.getItem("users");
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    
    const updatedUsers = users.filter((u) => u.id !== orgId);
    
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    loadOrganizations();
    toast.success("Organization rejected and removed");
  };

  const pendingOrgs = organizations.filter((org) => !org.isApproved);
  const approvedOrgs = organizations.filter((org) => org.isApproved);

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage organization approvals</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 bg-white">
              <div className="text-sm text-muted-foreground mb-1">Total Organizations</div>
              <div className="text-3xl font-bold text-primary">{organizations.length}</div>
            </Card>
            <Card className="p-6 bg-white">
              <div className="text-sm text-muted-foreground mb-1">Pending Approval</div>
              <div className="text-3xl font-bold text-amber-600">{pendingOrgs.length}</div>
            </Card>
            <Card className="p-6 bg-white">
              <div className="text-sm text-muted-foreground mb-1">Approved</div>
              <div className="text-3xl font-bold text-green-600">{approvedOrgs.length}</div>
            </Card>
          </div>
        </div>

        {/* Pending Organizations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Pending Approvals</h2>
          {pendingOrgs.length === 0 ? (
            <Card className="p-12 text-center bg-white">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
              <p className="text-muted-foreground">
                No organizations pending approval at the moment.
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingOrgs.map((org) => (
                <Card key={org.id} className="p-6 bg-white border-l-4 border-l-amber-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{org.organizationName}</h3>
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                              Pending
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span>{org.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>Contact: {org.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(org.id)}
                        className="gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(org.id)}
                        variant="destructive"
                        className="gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Approved Organizations */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Approved Organizations</h2>
          {approvedOrgs.length === 0 ? (
            <Card className="p-12 text-center bg-white">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No approved organizations yet.
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {approvedOrgs.map((org) => (
                <Card key={org.id} className="p-6 bg-white border-l-4 border-l-green-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{org.organizationName}</h3>
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approved
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{org.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Contact: {org.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
