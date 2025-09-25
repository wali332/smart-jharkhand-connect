import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/AuthContext";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast.success("Login successful!");
      // Navigation will be handled by App.tsx based on user role
    } else {
      toast.error("Invalid email or password");
    }
  };

  const demoCredentials = [
    { role: "Admin", email: "admin@grievancex.com", password: "admin123" },
    { role: "Citizen", email: "citizen@example.com", password: "citizen123" }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">GrievanceX</h1>
              <p className="text-sm text-muted-foreground">Jharkhand</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Sign in to your account</h2>
        </div>

        {/* Login Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Card>

        {/* Demo Credentials */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-3">Demo Credentials</h3>
          <div className="space-y-3">
            {demoCredentials.map((cred) => (
              <div key={cred.role} className="space-y-2">
                <p className="text-sm font-medium text-foreground">{cred.role}:</p>
                <div className="space-y-1 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 text-xs">
                  <div className="break-all">
                    <span className="text-muted-foreground">Email: </span>
                    <span className="font-mono text-xs">{cred.email}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Password: </span>
                    <span className="font-mono">{cred.password}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => {
                    setEmail(cred.email);
                    setPassword(cred.password);
                  }}
                >
                  Use {cred.role} Credentials
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;