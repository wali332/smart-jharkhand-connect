import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Upload, CheckCircle, Clock, User, Camera } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthContext";

const ComplaintDetail = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [citizenNote, setCitizenNote] = useState("");
  const [isResolved, setIsResolved] = useState(false);
  const [adminProof, setAdminProof] = useState<string | null>(null);

  // Mock complaint data
  const complaint = {
    id: id || "GRV-1002",
    type: "garbage",
    status: "in_progress",
    location: "Kanke Road, Ranchi",
    coords: [23.3629, 85.3346],
    reportedAt: "2024-01-09 02:22 PM",
    description: "Overflowing garbage bins near bus stop causing health hazard. Multiple bins are full and waste is scattered on the road.",
    photo: "/placeholder.svg",
    mlClassification: "garbage",
    mlConfidence: 92,
    citizen: {
      name: "Priya Singh",
      phone: "+91-87654-32109"
    },
    assignedAgent: {
      name: "Sunita Mahto",
      id: "AGT-003",
      assignedAt: "2024-01-09 04:45 PM"
    },
    statusHistory: [
      {
        status: "reported",
        timestamp: "2024-01-09 02:22 PM",
        by: "Citizen",
        note: "Complaint registered via mobile app with photo evidence"
      },
      {
        status: "verified",
        timestamp: "2024-01-09 02:24 PM",
        by: "AI System",
        note: "ML Classification: Garbage (92% confidence) - Medium priority"
      },
      {
        status: "assigned",
        timestamp: "2024-01-09 04:45 PM",
        by: "Admin Officer",
        note: "Assigned to Sunita Mahto (Sanitation Services)"
      },
      {
        status: "in_progress",
        timestamp: "2024-01-10 09:30 AM",
        by: "Field Agent",
        note: "Field agent dispatched for garbage collection. Expected completion: 24 hours"
      }
    ],
    agentProof: null
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reported": return "bg-muted";
      case "verified": return "bg-info";
      case "assigned": return "bg-warning";
      case "in_progress": return "bg-info";
      case "resolved": return "bg-success";
      default: return "bg-muted";
    }
  };

  const handleCitizenConfirm = () => {
    if (!citizenNote.trim()) {
      toast.error("Please add a confirmation note");
      return;
    }
    setIsResolved(true);
    toast.success("Thank you! Complaint marked as resolved.");
  };

  const handleAgentProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setAdminProof(result);
          setIsResolved(true);
          toast.success("Proof uploaded! Complaint marked as resolved.");
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset input
    event.target.value = '';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(user?.role === 'admin' ? '/admin' : '/dashboard')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Complaint Details</h1>
              <p className="text-sm text-muted-foreground">{complaint.id}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complaint Overview */}
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="font-mono">{complaint.id}</Badge>
                    <Badge className="bg-info/10 text-info">
                      {complaint.type.charAt(0).toUpperCase() + complaint.type.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(complaint.status)}>
                      {complaint.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground flex items-center mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {complaint.location}
                  </p>
                  <p className="text-muted-foreground flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Reported: {complaint.reportedAt}
                  </p>
                </div>
              </div>

              {/* Photo */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Issue Photo</h3>
                <img
                  src="/placeholder.svg"
                  alt="Complaint photo"
                  className="w-full h-64 object-cover rounded-lg bg-muted"
                />
              </div>

              {/* ML Classification */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">AI Classification</h3>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-info text-info-foreground">
                      ML-Verified
                    </Badge>
                    <span>Classified as: <strong>{complaint.mlClassification}</strong></span>
                    <Badge variant="outline">{complaint.mlConfidence}% confidence</Badge>
                  </div>
                </div>
              </div>

              {/* Geo-tag */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Geo-location</h3>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-muted-foreground">
                    <strong>Geo:</strong> {complaint.coords[0]}, {complaint.coords[1]}
                  </p>
                </div>
              </div>

              {/* Field Agent Section */}
              {complaint.assignedAgent && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Assigned Field Agent</h3>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p><strong>{complaint.assignedAgent.name}</strong></p>
                        <p className="text-muted-foreground text-sm">ID: {complaint.assignedAgent.id}</p>
                        <p className="text-muted-foreground text-sm">Assigned: {complaint.assignedAgent.assignedAt}</p>
                      </div>
                      {complaint.status === "in_progress" && !isResolved && user?.role === 'admin' && (
                        <div className="flex flex-col space-y-2">
                          <Button 
                            onClick={() => document.getElementById('proof-upload')?.click()}
                            variant="outline" 
                            size="sm"
                          >
                            <Camera className="w-4 h-4 mr-1" />
                            Upload Proof
                          </Button>
                          <input
                            id="proof-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAgentProofUpload}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Proof Upload */}
              {adminProof && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Resolution Proof</h3>
                  <img
                    src={adminProof}
                    alt="Resolution proof"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Resolution Status */}
              {isResolved && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-success">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Complaint Resolved</span>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Admin has uploaded proof of resolution.
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Status History */}
          <div>
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Status History</h3>
              <div className="space-y-4">
                {complaint.statusHistory.map((entry, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${getStatusColor(entry.status).replace('bg-', 'bg-')}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {entry.status.replace("_", " ").toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                      </div>
                      <p className="text-sm font-medium">{entry.by}</p>
                      <p className="text-xs text-muted-foreground">{entry.note}</p>
                    </div>
                  </div>
                ))}
                {isResolved && (
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full mt-1"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">RESOLVED</Badge>
                        <span className="text-xs text-muted-foregroup">Just now</span>
                      </div>
                      <p className="text-sm font-medium">Admin</p>
                      <p className="text-xs text-muted-foreground">Resolution proof uploaded by admin</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Complaint Info */}
            <Card className="p-4 mt-6">
              <h3 className="font-semibold text-foreground mb-4">Complaint Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Reported by</p>
                  <p className="font-medium">{complaint.citizen.name}</p>
                  <p className="text-xs text-muted-foreground">{complaint.citizen.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{complaint.type.charAt(0).toUpperCase() + complaint.type.slice(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <Badge className={getStatusColor(complaint.status)}>
                    {complaint.status.replace("_", " ").toUpperCase()}
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

export default ComplaintDetail;