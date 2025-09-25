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
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="px-2 sm:px-3">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">My Complaints</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => navigate("/report")} className="bg-primary hover:bg-primary/90 text-xs sm:text-sm px-2 sm:px-4" size="sm">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                <span className="hidden sm:inline">New </span>Complaint
              </Button>
              <Button variant="outline" onClick={handleLogout} size="sm" className="text-xs sm:text-sm px-2 sm:px-4">
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{userComplaints.length}</p>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </div>
              </div>
            </Card>
            
            <Card className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Open</p>
                  <p className="text-lg sm:text-2xl font-bold text-destructive">
                    {userComplaints.filter(c => c.status === "open").length}
                  </p>
                </div>
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
              </div>
            </Card>
            
            <Card className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">In Progress</p>
                  <p className="text-lg sm:text-2xl font-bold text-info">
                    {userComplaints.filter(c => c.status === "in_progress" || c.status === "assigned").length}
                  </p>
                </div>
                <div className="w-2 h-2 bg-info rounded-full"></div>
              </div>
            </Card>
            
            <Card className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Resolved</p>
                  <p className="text-lg sm:text-2xl font-bold text-success">
                    {userComplaints.filter(c => c.status === "resolved").length}
                  </p>
                </div>
                <div className="w-2 h-2 bg-success rounded-full"></div>
              </div>
            </Card>
          </div>

          {/* Search and Complaints List */}
          <div>
            {/* Search */}
            <Card className="p-4 mb-4 sm:mb-6">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <Input
                  placeholder="Search your complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
            </Card>

            {/* Complaints List */}
            <div className="space-y-3 sm:space-y-4">
              {filteredComplaints.length === 0 ? (
                <Card className="p-6 sm:p-8 text-center">
                  <p className="text-muted-foreground text-sm sm:text-base">No complaints found matching your search.</p>
                </Card>
              ) : (
                filteredComplaints.map((complaint) => (
                  <Card key={complaint.id} className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge variant="outline" className="font-mono text-xs">
                            {complaint.id}
                          </Badge>
                          <Badge className={`${getTypeColor(complaint.type)} text-xs`}>
                            {complaint.type.charAt(0).toUpperCase() + complaint.type.slice(1)}
                          </Badge>
                          <Badge className={`${getStatusColor(complaint.status)} text-xs`}>
                            {complaint.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="font-medium text-foreground text-sm sm:text-base break-words">{complaint.description}</p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="break-all">{complaint.location}</span>
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                            {complaint.timestamp}
                          </span>
                        </div>
                        
                        {complaint.status === "resolved" ? (
                          <p className="text-xs sm:text-sm text-success">
                            ✓ Resolved {complaint.resolutionDate}
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Expected resolution: {complaint.estimatedResolution}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex sm:flex-col">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/complaint/${complaint.id}`)}
                          className="w-full sm:w-auto text-xs sm:text-sm"
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