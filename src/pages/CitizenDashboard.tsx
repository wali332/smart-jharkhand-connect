import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Plus, Search, LogOut, User } from "lucide-react";

const CitizenDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock complaints for the current user
  const userComplaints = [
    {
      id: "GRV-2001",
      type: "pothole",
      status: "in_progress",
      location: "Main Road, Ranchi",
      timestamp: "2 days ago",
      description: "Large pothole causing traffic issues",
      estimatedResolution: "3-5 days"
    },
    {
      id: "GRV-2002",
      type: "garbage",
      status: "resolved",
      location: "Park Street, Ranchi",
      timestamp: "1 week ago",
      description: "Overflowing garbage bins",
      resolutionDate: "5 days ago"
    },
    {
      id: "GRV-2003",
      type: "streetlight",
      status: "assigned",
      location: "Station Road, Ranchi",
      timestamp: "3 days ago",
      description: "Street light not working",
      estimatedResolution: "2-3 days"
    },
    {
      id: "GRV-2004",
      type: "waterlogging",
      status: "open",
      location: "Civil Lines, Ranchi",
      timestamp: "1 day ago",
      description: "Water logging after rain",
      estimatedResolution: "Pending assignment"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-destructive";
      case "assigned": return "bg-warning";
      case "in_progress": return "bg-info";
      case "resolved": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "garbage": return "bg-destructive/10 text-destructive";
      case "pothole": return "bg-warning/10 text-warning";
      case "streetlight": return "bg-info/10 text-info";
      case "waterlogging": return "bg-secondary/10 text-secondary";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const filteredComplaints = userComplaints.filter(complaint =>
    complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">My Complaints</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => navigate("/report")} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-1" />
                New Complaint
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Statistics Cards */}
          <div className="lg:col-span-4 grid md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Complaints</p>
                  <p className="text-2xl font-bold text-foreground">{userComplaints.length}</p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open</p>
                  <p className="text-2xl font-bold text-destructive">
                    {userComplaints.filter(c => c.status === "open").length}
                  </p>
                </div>
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-info">
                    {userComplaints.filter(c => c.status === "in_progress" || c.status === "assigned").length}
                  </p>
                </div>
                <div className="w-2 h-2 bg-info rounded-full"></div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-success">
                    {userComplaints.filter(c => c.status === "resolved").length}
                  </p>
                </div>
                <div className="w-2 h-2 bg-success rounded-full"></div>
              </div>
            </Card>
          </div>

          {/* Search and Complaints List */}
          <div className="lg:col-span-4">
            {/* Search */}
            <Card className="p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search your complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
            </Card>

            {/* Complaints List */}
            <div className="space-y-4">
              {filteredComplaints.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No complaints found matching your search.</p>
                </Card>
              ) : (
                filteredComplaints.map((complaint) => (
                  <Card key={complaint.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="font-mono">
                            {complaint.id}
                          </Badge>
                          <Badge className={getTypeColor(complaint.type)}>
                            {complaint.type.charAt(0).toUpperCase() + complaint.type.slice(1)}
                          </Badge>
                          <Badge className={getStatusColor(complaint.status)}>
                            {complaint.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="font-medium text-foreground">{complaint.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {complaint.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {complaint.timestamp}
                          </span>
                        </div>
                        
                        {complaint.status === "resolved" ? (
                          <p className="text-sm text-success">
                            ✓ Resolved {complaint.resolutionDate}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Expected resolution: {complaint.estimatedResolution}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/complaint/${complaint.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;