import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Order() {
  const { items, totalAmount, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupTime: "",
    specialInstructions: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate pickup time options (next 2 hours in 15-min increments)
  const getPickupTimeOptions = () => {
    const options: string[] = [];
    const now = new Date();
    const startTime = new Date(now.getTime() + 20 * 60000); // Start 20 minutes from now
    startTime.setMinutes(Math.ceil(startTime.getMinutes() / 15) * 15, 0, 0);

    for (let i = 0; i < 8; i++) {
      const time = new Date(startTime.getTime() + i * 15 * 60000);
      options.push(time.toLocaleTimeString("en-US", { 
        hour: "numeric", 
        minute: "2-digit",
        hour12: true 
      }));
    }
    return options;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your order before checking out.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.phone || !formData.pickupTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Parse pickup time
      const now = new Date();
      const [time, period] = formData.pickupTime.split(" ");
      const [hours, minutes] = time.split(":");
      let hour = parseInt(hours);
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;
      
      const pickupDate = new Date(now);
      pickupDate.setHours(hour, parseInt(minutes), 0, 0);
      
      // If the pickup time is in the past, assume it's for tomorrow
      if (pickupDate < now) {
        pickupDate.setDate(pickupDate.getDate() + 1);
      }

      // Create order via validated RPC (server-side validation + total calculation)
      const { data: orderResult, error: orderError } = await supabase.rpc(
        "create_validated_order",
        {
          _customer_name: formData.name.trim(),
          _customer_phone: formData.phone.trim(),
          _customer_email: formData.email.trim() || null,
          _pickup_time: pickupDate.toISOString(),
          _special_instructions: formData.specialInstructions.trim() || null,
          _items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }
      );

      if (orderError) throw orderError;

      const orderId = (orderResult as any).order_id;

      // Send order confirmation notifications (email + SMS)
      try {
        await supabase.functions.invoke("send-order-notification", {
          body: {
            orderId: orderId,
            customerName: formData.name.trim(),
            customerPhone: formData.phone.trim(),
            customerEmail: formData.email.trim() || undefined,
            pickupTime: pickupDate.toISOString(),
            totalAmount,
            items: items.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        });
        console.log("Order notifications sent successfully");
      } catch (notificationError) {
        // Don't fail the order if notifications fail
        console.error("Failed to send notifications:", notificationError);
      }

      // Clear cart and redirect
      clearCart();
      navigate("/order-confirmation", { 
        state: { 
          orderId: orderId,
          pickupTime: formData.pickupTime,
          customerName: formData.name,
        } 
      });
      
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        title: "Order failed",
        description: "There was an error placing your order. Please try again or call us.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <header className="bg-card warm-shadow sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/order-online" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Menu</span>
            </Link>
            <div className="flex flex-col text-right">
              <span className="font-display text-xl font-bold text-primary">The Whistle Stop</span>
              <span className="text-xs text-muted-foreground">by Ariel Seafoods</span>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Add some delicious items to your order!
          </p>
          <Button asChild size="lg">
            <Link to="/order-online">Browse Menu</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-card warm-shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/order-online" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Menu</span>
          </Link>
          <div className="flex flex-col text-right">
            <span className="font-display text-xl font-bold text-primary">The Whistle Stop</span>
            <span className="text-xs text-muted-foreground">by Ariel Seafoods</span>
          </div>
        </div>
      </header>

      <section className="bg-primary py-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
            Checkout
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-card rounded-2xl p-6 warm-shadow h-fit">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-6 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-card rounded-2xl p-6 warm-shadow">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Pickup Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupTime" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Pickup Time *
                </Label>
                <select
                  id="pickupTime"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.pickupTime}
                  onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                  required
                >
                  <option value="">Select a pickup time</option>
                  {getPickupTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special requests or allergies..."
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order - $${totalAmount.toFixed(2)}`
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Pay when you pick up your order
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
