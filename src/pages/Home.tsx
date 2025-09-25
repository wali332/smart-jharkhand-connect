import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, MapPin } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">GrievanceX</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Jharkhand</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")}
              className="text-sm px-3 py-2 sm:px-4 sm:py-2"
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              Smart Grievance Redressal Platform
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 px-2">
              Report civic issues instantly with AI-powered classification and real-time tracking
            </p>
            
            <Button 
              onClick={() => navigate("/login")}
              size="lg" 
              className="text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-6 bg-primary hover:bg-primary/90 w-full sm:w-auto"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-16">
            <Card className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Easy Reporting</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Just take a photo. Our AI automatically classifies and geo-tags your complaint
              </p>
            </Card>

            <Card className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Real-time Tracking</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Track your complaint status and get updates throughout the resolution process
              </p>
            </Card>

            <Card className="p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-info" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Transparent Process</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Complete visibility with ML verification and citizen confirmation system
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;