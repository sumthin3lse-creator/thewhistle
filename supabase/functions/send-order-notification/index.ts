import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderNotificationRequest {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupTime: string;
  totalAmount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

async function sendEmail(data: OrderNotificationRequest): Promise<void> {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    console.log("RESEND_API_KEY not configured, skipping email");
    return;
  }

  if (!data.customerEmail) {
    console.log("No customer email provided, skipping email notification");
    return;
  }

  const resend = new Resend(resendApiKey);

  const itemsList = data.items
    .map((item) => `<li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`)
    .join("");

  const pickupDate = new Date(data.pickupTime);
  const formattedPickupTime = pickupDate.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #b91c1c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        .order-details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .items-list { list-style: none; padding: 0; }
        .items-list li { padding: 8px 0; border-bottom: 1px solid #eee; }
        .total { font-size: 1.2em; font-weight: bold; color: #b91c1c; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 0.9em; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmed! 🎉</h1>
        </div>
        <div class="content">
          <p>Hi ${data.customerName},</p>
          <p>Thank you for your order! We're preparing your food with care.</p>
          
          <div class="order-details">
            <h3>📋 Order Details</h3>
            <p><strong>Order ID:</strong> ${data.orderId.slice(0, 8).toUpperCase()}</p>
            <p><strong>Pickup Time:</strong> ${formattedPickupTime}</p>
            
            <h4>Items:</h4>
            <ul class="items-list">
              ${itemsList}
            </ul>
            
            <p class="total">Total: $${data.totalAmount.toFixed(2)}</p>
          </div>
          
          <div class="order-details">
            <h3>📍 Pickup Location</h3>
            <p>The Whistle Stop by Ariel Seafoods</p>
            <p>123 Main Street</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          
          <p><strong>Payment:</strong> Pay when you pick up your order.</p>
          
          <div class="footer">
            <p>Questions? Call us at (555) 123-4567</p>
            <p>The Whistle Stop by Ariel Seafoods</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const emailResponse = await resend.emails.send({
      from: "The Whistle Stop <onboarding@resend.dev>",
      to: [data.customerEmail],
      subject: `Order Confirmed - Pickup at ${formattedPickupTime}`,
      html,
    });
    console.log("Email sent successfully:", emailResponse);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

async function sendSMS(data: OrderNotificationRequest): Promise<void> {
  const projectId = Deno.env.get("SIGNALWIRE_PROJECT_ID");
  const apiToken = Deno.env.get("SIGNALWIRE_API_TOKEN");
  const spaceUrl = Deno.env.get("SIGNALWIRE_SPACE_URL");
  const fromNumber = Deno.env.get("SIGNALWIRE_PHONE_NUMBER");

  if (!projectId || !apiToken || !spaceUrl || !fromNumber) {
    console.log("SignalWire credentials not fully configured, skipping SMS");
    return;
  }

  if (!data.customerPhone) {
    console.log("No customer phone provided, skipping SMS notification");
    return;
  }

  // Format phone number - ensure it has country code
  let phoneNumber = data.customerPhone.replace(/\D/g, "");
  if (phoneNumber.length === 10) {
    phoneNumber = "1" + phoneNumber;
  }
  phoneNumber = "+" + phoneNumber;

  const pickupDate = new Date(data.pickupTime);
  const formattedPickupTime = pickupDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const message = `The Whistle Stop: Hi ${data.customerName}! Your order #${data.orderId.slice(0, 8).toUpperCase()} is confirmed. Pickup at ${formattedPickupTime}. Total: $${data.totalAmount.toFixed(2)}. Pay when you pick up. Questions? Call (555) 123-4567`;

  // Clean the space URL (remove https:// if present)
  const cleanSpaceUrl = spaceUrl.replace(/^https?:\/\//, "");
  const apiUrl = `https://${cleanSpaceUrl}/api/laml/2010-04-01/Accounts/${projectId}/Messages.json`;

  const auth = btoa(`${projectId}:${apiToken}`);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: fromNumber,
        To: phoneNumber,
        Body: message,
      }),
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      console.error("SignalWire API error:", response.status, responseText);
      throw new Error(`SignalWire API error: ${response.status} - ${responseText}`);
    }

    console.log("SMS sent successfully:", responseText);
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: OrderNotificationRequest = await req.json();
    console.log("Received notification request for order:", data.orderId);

    const results = {
      email: { success: false, error: null as string | null },
      sms: { success: false, error: null as string | null },
    };

    // Send email notification
    try {
      await sendEmail(data);
      results.email.success = true;
    } catch (error: any) {
      results.email.error = error.message;
      console.error("Email notification failed:", error);
    }

    // Send SMS notification
    try {
      await sendSMS(data);
      results.sms.success = true;
    } catch (error: any) {
      results.sms.error = error.message;
      console.error("SMS notification failed:", error);
    }

    // Return success even if one fails - we don't want to fail the order
    return new Response(JSON.stringify({ 
      success: true, 
      results,
      message: "Notification processing completed"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-order-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
