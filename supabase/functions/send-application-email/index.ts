import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { form, employers, references } = await req.json();

    const employerRows = employers
      .filter((e: any) => e.name)
      .map(
        (e: any, i: number) =>
          `<tr><td>${i + 1}</td><td>${e.name}</td><td>${e.position}</td><td>${e.from} – ${e.to}</td><td>${e.reasonForLeaving}</td></tr>`
      )
      .join("");

    const referenceRows = references
      .filter((r: any) => r.name)
      .map(
        (r: any) =>
          `<tr><td>${r.name}</td><td>${r.address}</td><td>${r.business}</td><td>${r.yearsKnown}</td></tr>`
      )
      .join("");

    const html = `
      <h2>New Employment Application</h2>
      <h3>Personal Information</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>Name</strong></td><td>${form.fullName}</td></tr>
        <tr><td><strong>Address</strong></td><td>${form.presentAddress}, ${form.city}, ${form.state} ${form.zipCode}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${form.phone}</td></tr>
        <tr><td><strong>Secondary Phone</strong></td><td>${form.secondaryPhone || "N/A"}</td></tr>
        <tr><td><strong>Email</strong></td><td>${form.email}</td></tr>
      </table>

      <h3>Employment Desired</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>Position</strong></td><td>${form.position}</td></tr>
        <tr><td><strong>Date Can Start</strong></td><td>${form.dateCanStart}</td></tr>
        <tr><td><strong>Currently Employed</strong></td><td>${form.employedNow}</td></tr>
        <tr><td><strong>May Inquire Present Employer</strong></td><td>${form.mayInquirePresent}</td></tr>
        <tr><td><strong>Applied Before</strong></td><td>${form.appliedBefore}</td></tr>
        <tr><td><strong>Where/When</strong></td><td>${form.appliedWhere || "N/A"}</td></tr>
        <tr><td><strong>Referred By</strong></td><td>${form.referredBy || "N/A"}</td></tr>
      </table>

      <h3>Education</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>High School</strong></td><td>${form.highSchool || "N/A"} (${form.highSchoolYears || "N/A"} yrs) — ${form.highSchoolSubjects || "N/A"}</td></tr>
        <tr><td><strong>College</strong></td><td>${form.college || "N/A"} (${form.collegeYears || "N/A"} yrs) — ${form.collegeSubjects || "N/A"}</td></tr>
        <tr><td><strong>Other</strong></td><td>${form.otherSchool || "N/A"} (${form.otherSchoolYears || "N/A"} yrs) — ${form.otherSchoolSubjects || "N/A"}</td></tr>
      </table>

      <h3>General Information</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>U.S. Citizen / Authorized</strong></td><td>${form.usCitizen}</td></tr>
        <tr><td><strong>Special Training</strong></td><td>${form.specialTraining || "N/A"}</td></tr>
        <tr><td><strong>Special Skills</strong></td><td>${form.specialSkills || "N/A"}</td></tr>
        <tr><td><strong>Military Service</strong></td><td>${form.militaryService || "N/A"}</td></tr>
        <tr><td><strong>Military Rank</strong></td><td>${form.militaryRank || "N/A"}</td></tr>
      </table>

      ${employerRows ? `
      <h3>Former Employers</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><th>#</th><th>Employer</th><th>Position</th><th>Dates</th><th>Reason for Leaving</th></tr>
        ${employerRows}
      </table>` : ""}

      ${referenceRows ? `
      <h3>References</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><th>Name</th><th>Address</th><th>Business</th><th>Years Known</th></tr>
        ${referenceRows}
      </table>` : ""}

      <br/><p style="color:#888;font-size:12px;">Submitted from The Whistle Stop website.</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Whistle Stop Applications <onboarding@resend.dev>",
        to: ["admin@thewhistlestopstuart.com"],
        subject: `New Application: ${form.fullName} — ${form.position || "General"}`,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending application email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
