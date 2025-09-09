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
      console.log("File selected:", file.name, file.type, file.size);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          console.log("Photo loaded successfully");
          setPhoto(result);
          
          // Simulate ML classification after a short delay
          setTimeout(() => {
            const randomType = issueTypes[Math.floor(Math.random() * issueTypes.length)];
            setClassification(randomType.id);
            console.log("ML Classification:", randomType.label);
            toast.success(`Issue classified as: ${randomType.label}`);
          }, 500);
          
          // Get current location
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
      console.log("Navigating to home");
      navigate("/");
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
            <Button onClick={() => navigate("/")} className="flex-1">
              Back to Home
            </Button>
            <Button 
              onClick={() => navigate("/report")} 
              variant="outline"
              className="flex-1"
            >
              Report Another
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
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Take a photo of the issue or upload from gallery
                    </p>
                    <div className="space-y-3">
                      <label htmlFor="photo-upload" className="block">
                        <Button type="button" className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Photo
                        </Button>
                      </label>
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
                  <div className="space-y-4">
                    <img
                      src={photo}
                      alt="Uploaded issue"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setPhoto(null);
                          setClassification("");
                          setGeoLocation({ lat: 23.3441, lng: 85.3096 });
                        }}
                        className="flex-1"
                      >
                        Take Another Photo
                      </Button>
                      <label htmlFor="photo-upload-replace" className="flex-1">
                        <Button variant="outline" className="w-full cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Replace
                        </Button>
                      </label>
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