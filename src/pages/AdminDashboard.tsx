import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Search, UserCheck, Clock, AlertCircle, CheckCircle, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const complaints = [
    {
      id: "GRV-1001",
      type: "pothole",
      status: "open",
      location: "Main Road, Ranchi",
      coords: [23.3441, 85.3096],
      timestamp: "2 hours ago",
      priority: "high"
    },
    {
      id: "GRV-1002",
      type: "garbage",
      status: "assigned",
      location: "Park Street, Dhanbad",
      coords: [23.7957, 86.4304],
      timestamp: "4 hours ago",
      priority: "medium"
    },
    {
      id: "GRV-1003",
      type: "streetlight",
      status: "in_progress",
      location: "Station Road, Jamshedpur",
      coords: [22.8046, 86.2029],
      timestamp: "1 day ago",
      priority: "low"
    },
    {
      id: "GRV-1004",
      type: "waterlogging",
      status: "resolved",
      location: "Civil Lines, Bokaro",
      coords: [23.6693, 86.1511],
      timestamp: "2 days ago",
      priority: "high"
    },
    {
      id: "GRV-1005",
      type: "pothole",
      status: "assigned",
      location: "Kanke Road, Ranchi",
      coords: [23.3629, 85.3346],
      timestamp: "6 hours ago",
      priority: "medium"
    },
    {
      id: "GRV-1006",
      type: "garbage",
      status: "in_progress",
      location: "Sakchi Market, Jamshedpur",
      coords: [22.7925, 86.1842],
      timestamp: "8 hours ago",
      priority: "medium"
    },
    {
      id: "GRV-1007",
      type: "streetlight",
      status: "open",
      location: "HEC Colony, Ranchi",
      coords: [23.4041, 85.4399],
      timestamp: "12 hours ago",
      priority: "low"
    },
    {
      id: "GRV-1008",
      type: "waterlogging",
      status: "assigned",
      location: "Circular Road, Jamshedpur",
      coords: [22.8046, 86.2029],
      timestamp: "1 day ago",
      priority: "high"
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

  const handleAssign = (complaintId: string) => {
    toast.success(`Complaint ${complaintId} assigned to field agent`);
  };

  const handleBackToHome = () => {
    logout();
    navigate("/");
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesCategory = selectedCategory === "all" || complaint.type === selectedCategory;
    const matchesStatus = selectedStatus === "all" || complaint.status === selectedStatus;
    const matchesSearch = complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBackToHome} className="px-2 sm:px-3">
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Grievance Management System</p>
              </div>
            </div>
            <Button onClick={() => navigate("/analytics")} variant="outline" size="sm" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">View </span>Analytics
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-64 sm:h-80 lg:h-96 mb-6">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Live Complaints Map</h3>
              </div>
              <div className="h-52 sm:h-72 lg:h-80 bg-muted/20 flex items-center justify-center relative">
                <div className="absolute inset-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm sm:text-base">Interactive Map View</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {filteredComplaints.length} active complaints
                    </p>
                  </div>
                </div>
                {/* Simulated map pins */}
                <div className="absolute top-20 left-32 w-3 h-3 sm:w-4 sm:h-4 bg-destructive rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-40 w-3 h-3 sm:w-4 sm:h-4 bg-warning rounded-full animate-pulse"></div>
                <div className="absolute bottom-32 left-40 w-3 h-3 sm:w-4 sm:h-4 bg-info rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-32 w-3 h-3 sm:w-4 sm:h-4 bg-success rounded-full animate-pulse"></div>
              </div>
            </Card>

            {/* Filters */}
            <Card className="p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="garbage">Garbage</SelectItem>
                      <SelectItem value="pothole">Pothole</SelectItem>
                      <SelectItem value="streetlight">Street Light</SelectItem>
                      <SelectItem value="waterlogging">Water Logging</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full sm:w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Complaints List */}
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
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
                      <p className="text-sm text-muted-foreground flex items-center flex-wrap">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="break-all">{complaint.location}</span>
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                        {complaint.timestamp}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-start">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/complaint/${complaint.id}`)}
                        className="text-xs sm:text-sm"
                      >
                        View Details
                      </Button>
                      {complaint.status === "open" && (
                        <Button
                          size="sm"
                          onClick={() => handleAssign(complaint.id)}
                          className="bg-primary hover:bg-primary/90 text-xs sm:text-sm"
                        >
                          <UserCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Assign
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div>
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Complaint GRV-1004 resolved</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Agent assigned to GRV-1002</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">New complaint GRV-1001 reported</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-info rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Work started on GRV-1003</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-4 mt-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Open</span>
                  <Badge className="bg-destructive">
                    {complaints.filter(c => c.status === "open").length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">In Progress</span>
                  <Badge className="bg-info">
                    {complaints.filter(c => c.status === "in_progress").length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Resolved Today</span>
                  <Badge className="bg-success">
                    {complaints.filter(c => c.status === "resolved").length}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;