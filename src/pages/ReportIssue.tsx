import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Upload, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const ReportIssue = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string | null>(null);
  const [geoLocation, setGeoLocation] = useState({ lat: 23.3441, lng: 85.3096 });
  const [classification, setClassification] = useState<string>("");
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const issueTypes = [
    { id: "garbage", label: "Garbage", color: "bg-destructive" },
    { id: "pothole", label: "Pothole", color: "bg-warning" },
    { id: "streetlight", label: "Street Light", color: "bg-info" },
    { id: "waterlogging", label: "Water Logging", color: "bg-secondary" }
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
        // Simulate ML classification
        const randomType = issueTypes[Math.floor(Math.random() * issueTypes.length)];
        setClassification(randomType.id);
        // Simulate getting current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setGeoLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => {
              // Fallback to Jharkhand coordinates
              setGeoLocation({ lat: 23.3441, lng: 85.3096 });
            }
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!photo) {
      toast.error("Please upload a photo first");
      return;
    }
    setIsSubmitted(true);
    toast.success("Complaint submitted successfully!");
    setTimeout(() => navigate("/"), 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Complaint Submitted!</h2>
          <p className="text-muted-foreground mb-4">
            Your complaint has been registered and assigned ID: #GRV-{Math.floor(Math.random() * 10000)}
          </p>
          <Button onClick={() => navigate("/")} className="w-full">
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Report Issue</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <div className="space-y-6">
              {/* Photo Upload */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">1. Take or Upload Photo</h3>
                {!photo ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Take a photo of the issue or upload from gallery
                    </p>
                    <label htmlFor="photo-upload">
                      <Button className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    </label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <img
                      src={photo}
                      alt="Uploaded issue"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setPhoto(null)}
                      className="w-full"
                    >
                      Take Another Photo
                    </Button>
                  </div>
                )}
              </div>

              {/* Auto Geo-tag */}
              {photo && (
                <div>
                  <h3 className="font-semibold text-foreground mb-4">2. Location Auto-detected</h3>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-medium">Geo:</span>
                      <span className="text-muted-foreground">
                        {geoLocation.lat}, {geoLocation.lng}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ML Classification */}
              {photo && classification && (
                <div>
                  <h3 className="font-semibold text-foreground mb-4">3. AI Classification</h3>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-info text-info-foreground">
                        ML-Verified
                      </Badge>
                      <span className="font-medium">Classified:</span>
                      <Badge className={issueTypes.find(t => t.id === classification)?.color}>
                        {issueTypes.find(t => t.id === classification)?.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Optional Note */}
              {photo && (
                <div>
                  <h3 className="font-semibold text-foreground mb-4">4. Additional Notes (Optional)</h3>
                  <Textarea
                    placeholder="Add any additional details about the issue..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              )}

              {/* Submit Button */}
              {photo && (
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Submit Complaint
                </Button>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ReportIssue;