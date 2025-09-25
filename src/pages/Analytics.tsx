import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, MapPin, Users, Clock, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Analytics = () => {
  const navigate = useNavigate();

  const complaintsData = [
    { name: "Jul", value: 78 },
    { name: "Aug", value: 92 },
    { name: "Sep", value: 87 },
    { name: "Oct", value: 94 },
    { name: "Nov", value: 102 },
    { name: "Dec", value: 89 }
  ];

  const categoryData = [
    { name: "Pothole", value: 145, color: "#f59e0b" },
    { name: "Garbage", value: 89, color: "#dc2626" },
    { name: "Street Light", value: 67, color: "#2563eb" },
    { name: "Water Logging", value: 34, color: "#10b981" }
  ];

  const departmentPerformance = [
    { name: "Road Maintenance", resolved: 123, total: 145, avgTime: "3.2 days" },
    { name: "Sanitation Services", resolved: 81, total: 89, avgTime: "1.8 days" },
    { name: "Electrical Department", resolved: 55, total: 67, avgTime: "2.4 days" },
    { name: "Water & Sewerage", resolved: 26, total: 34, avgTime: "4.1 days" }
  ];

  const hotspots = [
    { area: "Main Road, Ranchi", complaints: 23, type: "Multiple" },
    { area: "Station Road, Dhanbad", complaints: 18, type: "Pothole" },
    { area: "Park Street, Jamshedpur", complaints: 15, type: "Garbage" },
    { area: "Civil Lines, Bokaro", complaints: 12, type: "Street Light" },
    { area: "Kanke Road, Ranchi", complaints: 11, type: "Waterlogging" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-sm text-muted-foreground">Performance insights and trends</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs sm:text-sm">Total Complaints</p>
                <p className="text-lg sm:text-2xl font-bold text-foreground">335</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-success mr-1" />
                  <span className="text-success text-xs sm:text-sm">+12%</span>
                </div>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs sm:text-sm">Resolved</p>
                <p className="text-lg sm:text-2xl font-bold text-foreground">285</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-success mr-1" />
                  <span className="text-success text-xs sm:text-sm">+8%</span>
                </div>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs sm:text-sm">Avg Resolution</p>
                <p className="text-lg sm:text-2xl font-bold text-foreground">2.8d</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-success mr-1" />
                  <span className="text-success text-xs sm:text-sm">-0.3d</span>
                </div>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-info/10 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-info" />
              </div>
            </div>
          </Card>

          <Card className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs sm:text-sm">Resolution Rate</p>
                <p className="text-lg sm:text-2xl font-bold text-foreground">84%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-success mr-1" />
                  <span className="text-success text-xs sm:text-sm">+3%</span>
                </div>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-secondary" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
          {/* Monthly Complaints Trend */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Monthly Complaints Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={complaintsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Category Distribution */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Complaints by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 sm:mt-4">
              {categoryData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-1 sm:space-x-2">
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Department Performance */}
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Department Performance</h3>
            <div className="space-y-4">
              {departmentPerformance.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{dept.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {dept.resolved}/{dept.total} resolved • Avg: {dept.avgTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        (dept.resolved / dept.total) * 100 >= 85
                          ? "bg-success"
                          : (dept.resolved / dept.total) * 100 >= 70
                          ? "bg-warning"
                          : "bg-destructive"
                      }
                    >
                      {Math.round((dept.resolved / dept.total) * 100)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recurring Issues Hotspots */}
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Recurring Issues Hotspots</h3>
            <div className="space-y-4">
              {hotspots.map((hotspot, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-destructive mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{hotspot.area}</p>
                      <p className="text-sm text-muted-foreground">Primary: {hotspot.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">{hotspot.complaints}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">complaints</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-warning/10 rounded-lg">
              <p className="text-sm text-warning-foreground">
                <strong>Recommendation:</strong> Deploy additional resources to Main Road, Ranchi for proactive maintenance.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;