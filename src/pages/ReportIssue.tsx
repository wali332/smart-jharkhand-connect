import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Upload, ArrowLeft, CheckCircle, LogOut, History } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthContext";

const ReportIssue = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
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
    console.log("handlePhotoUpload called");
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name, file.type, file.size);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.log("Invalid file type:", file.type);
        toast.error("Please select a valid image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        console.log("File too large:", file.size);
        toast.error("File size must be less than 5MB");
        return;
      }

      console.log("Starting file read...");
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          console.log("Photo loaded successfully, setting state...");
          setPhoto(result);
          
          // Simulate ML classification after a short delay
          setTimeout(() => {
            const randomType = issueTypes[Math.floor(Math.random() * issueTypes.length)];
            setClassification(randomType.id);
            console.log("ML Classification:", randomType.label);
            toast.success(`Issue classified as: ${randomType.label}`);
          }, 500);
          
          // Get current location
          console.log("Getting geolocation...");
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setGeoLocation({
                  lat: Number(position.coords.latitude.toFixed(4)),
                  lng: Number(position.coords.longitude.toFixed(4)),
                });
                console.log("Location updated:", position.coords.latitude, position.coords.longitude);
              },
              (error) => {
                console.log("Geolocation error:", error.message);
                // Fallback to Jharkhand coordinates
                setGeoLocation({ lat: 23.3441, lng: 85.3096 });
                toast.info("Using default location (enable GPS for accuracy)");
              }
            );
          } else {
            console.log("Geolocation not supported");
            setGeoLocation({ lat: 23.3441, lng: 85.3096 });
            toast.info("Geolocation not supported, using default location");
          }
        }
      };
      
      reader.onerror = () => {
        console.error("Error reading file");
        toast.error("Error reading the selected image");
      };
      
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");
    }
    
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleSubmit = () => {
    console.log("Submit button clicked");
    if (!photo) {
      toast.error("Please upload a photo first");
      return;
    }
    if (!classification) {
      toast.error("Please wait for AI classification to complete");
      return;
    }
    
    console.log("Submitting complaint with data:", {
      photo: photo ? "Present" : "Missing",
      classification,
      geoLocation,
      note
    });
    
    setIsSubmitted(true);
    toast.success("Complaint submitted successfully!");
    setTimeout(() => {
      console.log("Navigating to report page");
      navigate("/report");
    }, 2000);
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
          <div className="flex gap-3">
            <Button onClick={() => navigate("/report")} className="flex-1">
              Report Another
            </Button>
            <Button 
              onClick={() => navigate("/dashboard")} 
              variant="outline"
              className="flex-1"
            >
              View Status
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" onClick={() => {logout(); navigate("/");}} className="px-2 sm:px-3">
                <LogOut className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
              <h1 className="text-lg sm:text-xl font-bold text-foreground">Report Issue</h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")} className="text-xs sm:text-sm">
              <History className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Check </span>Status
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Photo Upload */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">1. Take or Upload Photo</h3>
                {!photo ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-8 text-center hover:border-primary/50 transition-colors">
                    <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                    <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base px-2">
                      Take a photo of the issue or upload from gallery
                    </p>
                    <div className="space-y-2 sm:space-y-3">
                      <Button 
                        type="button"
                        onClick={() => {
                          console.log("Upload button clicked");
                          const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
                          if (fileInput) {
                            fileInput.click();
                          }
                        }}
                        className="cursor-pointer w-full sm:w-auto"
                        size="sm"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Supports: JPG, PNG, WebP (max 5MB)
                      </p>
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*,.jpg,.jpeg,.png,.webp"
                      capture="environment"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <img
                      src={photo}
                      alt="Uploaded issue"
                      className="w-full h-48 sm:h-64 object-cover rounded-lg"
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setPhoto(null);
                          setClassification("");
                          setGeoLocation({ lat: 23.3441, lng: 85.3096 });
                        }}
                        className="flex-1 text-sm"
                        size="sm"
                      >
                        Take Another Photo
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          console.log("Replace button clicked");
                          const fileInput = document.getElementById('photo-upload-replace') as HTMLInputElement;
                          if (fileInput) {
                            fileInput.click();
                          }
                        }}
                        className="flex-1 cursor-pointer text-sm"
                        size="sm"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Replace
                      </Button>
                      <input
                        id="photo-upload-replace"
                        type="file"
                        accept="image/*,.jpg,.jpeg,.png,.webp"
                        capture="environment"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </div>
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