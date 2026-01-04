import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderId, pickupTime, customerName } = location.state || {};

  if (!orderId) {
    return <Navigate to="/order-online" replace />;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-card rounded-2xl p-8 warm-shadow">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground mb-6">
              Thank you, {customerName}! Your order has been placed.
            </p>

            <div className="bg-secondary/50 rounded-xl p-6 mb-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Time</p>
                  <p className="font-semibold text-foreground">{pickupTime}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Location</p>
                  <p className="font-semibold text-foreground">The Whistle Stop</p>
                  <p className="text-sm text-muted-foreground">
                    1200 SE Indian St, Stuart, FL 34997
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Questions?</p>
                  <a href="tel:7722201020" className="font-semibold text-primary hover:underline">
                    (772) 220-1020
                  </a>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Order ID: {orderId.slice(0, 8).toUpperCase()}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/">Return Home</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/order-online">Order More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
