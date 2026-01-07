import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { LogOut, RefreshCw, Package, Clock, CheckCircle, XCircle, Printer } from 'lucide-react';
import { format } from 'date-fns';
import type { Database } from '@/integrations/supabase/types';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];
type OrderStatus = Database['public']['Enums']['order_status'];

interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  preparing: 'bg-purple-100 text-purple-800 border-purple-200',
  ready: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-gray-100 text-gray-800 border-gray-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  pending: <Clock className="w-3 h-3" />,
  confirmed: <CheckCircle className="w-3 h-3" />,
  preparing: <Package className="w-3 h-3" />,
  ready: <CheckCircle className="w-3 h-3" />,
  completed: <CheckCircle className="w-3 h-3" />,
  cancelled: <XCircle className="w-3 h-3" />,
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { user, isAdmin, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/admin/auth');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchOrders();
      
      const channel = supabase
        .channel('orders-realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'orders' },
          () => fetchOrders()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, isAdmin]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordersError) {
      toast({
        title: 'Error fetching orders',
        description: ordersError.message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const ordersWithItems: OrderWithItems[] = [];

    for (const order of ordersData || []) {
      const { data: items } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', order.id);

      ordersWithItems.push({
        ...order,
        order_items: items || [],
      });
    }

    setOrders(ordersWithItems);
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdating(orderId);

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast({
        title: 'Error updating order',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Order updated',
        description: `Order status changed to ${newStatus}`,
      });
      fetchOrders();
    }

    setUpdating(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/auth');
  };

  const printOrder = (order: OrderWithItems) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order #${order.id.slice(0, 8)}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 400px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .header h1 { margin: 0 0 5px 0; font-size: 24px; }
            .header p { margin: 0; font-size: 12px; color: #666; }
            .order-id { font-size: 14px; font-weight: bold; margin-bottom: 15px; }
            .section { margin-bottom: 15px; }
            .section-title { font-weight: bold; font-size: 14px; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 8px; }
            .customer-info p { margin: 3px 0; font-size: 13px; }
            .items { width: 100%; border-collapse: collapse; }
            .items th, .items td { padding: 5px; text-align: left; font-size: 13px; }
            .items th { border-bottom: 1px solid #ccc; }
            .items .qty { width: 40px; text-align: center; }
            .items .price { text-align: right; }
            .total { text-align: right; font-size: 16px; font-weight: bold; margin-top: 10px; padding-top: 10px; border-top: 2px solid #000; }
            .pickup-time { background: #f5f5f5; padding: 10px; text-align: center; font-weight: bold; margin-top: 15px; }
            .notes { background: #fff3cd; padding: 10px; margin-top: 10px; font-size: 12px; }
            .footer { text-align: center; margin-top: 20px; font-size: 11px; color: #666; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>BITES & BREW</h1>
            <p>Order Receipt</p>
          </div>
          <div class="order-id">Order #${order.id.slice(0, 8).toUpperCase()}</div>
          <div class="section">
            <div class="section-title">Customer</div>
            <div class="customer-info">
              <p><strong>${order.customer_name}</strong></p>
              <p>${order.customer_phone}</p>
              ${order.customer_email ? `<p>${order.customer_email}</p>` : ''}
            </div>
          </div>
          <div class="section">
            <div class="section-title">Items</div>
            <table class="items">
              <thead>
                <tr>
                  <th class="qty">Qty</th>
                  <th>Item</th>
                  <th class="price">Price</th>
                </tr>
              </thead>
              <tbody>
                ${order.order_items.map(item => `
                  <tr>
                    <td class="qty">${item.quantity}</td>
                    <td>${item.item_name}</td>
                    <td class="price">$${(Number(item.item_price) * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="total">Total: $${Number(order.total_amount).toFixed(2)}</div>
          </div>
          ${order.special_instructions ? `
            <div class="notes">
              <strong>Special Instructions:</strong><br>
              ${order.special_instructions}
            </div>
          ` : ''}
          <div class="pickup-time">
            PICKUP: ${format(new Date(order.pickup_time), 'MMM d, yyyy - h:mm a')}
          </div>
          <div class="footer">
            <p>Order placed: ${format(new Date(order.created_at), 'MMM d, yyyy h:mm a')}</p>
            <p>Thank you for your order!</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const activeOrders = orders.filter(o => ['confirmed', 'preparing', 'ready'].includes(o.status)).length;
  const completedToday = orders.filter(o => 
    o.status === 'completed' && 
    new Date(o.created_at).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Order Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={fetchOrders}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Orders</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">{pendingOrders}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Orders</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{activeOrders}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed Today</CardDescription>
              <CardTitle className="text-3xl text-green-600">{completedToday}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>
              Manage incoming orders and update their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No orders yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Pickup Time</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">
                          {order.id.slice(0, 8)}...
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{order.customer_name}</div>
                          <div className="text-sm text-muted-foreground">{order.customer_phone}</div>
                          {order.customer_email && (
                            <div className="text-sm text-muted-foreground">{order.customer_email}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="text-sm">
                                {item.quantity}x {item.item_name}
                              </div>
                            ))}
                            {order.special_instructions && (
                              <div className="text-xs text-muted-foreground italic mt-2">
                                Note: {order.special_instructions}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(order.pickup_time), 'MMM d, h:mm a')}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${Number(order.total_amount).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${statusColors[order.status]} flex items-center gap-1 w-fit`}
                          >
                            {statusIcons[order.status]}
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select
                              value={order.status}
                              onValueChange={(value) => updateOrderStatus(order.id, value as OrderStatus)}
                              disabled={updating === order.id}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="preparing">Preparing</SelectItem>
                                <SelectItem value="ready">Ready</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => printOrder(order)}
                              title="Print order"
                            >
                              <Printer className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
