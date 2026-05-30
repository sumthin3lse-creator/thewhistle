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

    // Basic server-side validation (mirror client zod limits)
    if (!form || typeof form !== "object") {
      return new Response(JSON.stringify({ success: false, error: "Invalid payload" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const isStr = (v: unknown, max = 500) => typeof v === "string" && v.length <= max;
    if (!isStr(form.fullName, 200) || !form.fullName.trim()) {
      return new Response(JSON.stringify({ success: false, error: "Invalid name" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (form.email && !isStr(form.email, 320)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid email" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const emps = Array.isArray(employers) ? employers.slice(0, 20) : [];
    const refs = Array.isArray(references) ? references.slice(0, 20) : [];

    // HTML escape helper to prevent injection into admin email
    const esc = (v: unknown) =>
      String(v ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const employerRows = emps
      .filter((e: any) => e?.name)
      .map(
        (e: any, i: number) =>
          `<tr><td>${i + 1}</td><td>${esc(e.name)}</td><td>${esc(e.position)}</td><td>${esc(e.from)} – ${esc(e.to)}</td><td>${esc(e.reasonForLeaving)}</td></tr>`
      )
      .join("");

    const referenceRows = refs
      .filter((r: any) => r?.name)
      .map(
        (r: any) =>
          `<tr><td>${esc(r.name)}</td><td>${esc(r.address)}</td><td>${esc(r.business)}</td><td>${esc(r.yearsKnown)}</td></tr>`
      )
      .join("");

    const html = `
      <h2>New Employment Application</h2>
      <h3>Personal Information</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>Name</strong></td><td>${esc(form.fullName)}</td></tr>
        <tr><td><strong>Address</strong></td><td>${esc(form.presentAddress)}, ${esc(form.city)}, ${esc(form.state)} ${esc(form.zipCode)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${esc(form.phone)}</td></tr>
        <tr><td><strong>Secondary Phone</strong></td><td>${esc(form.secondaryPhone || "N/A")}</td></tr>
        <tr><td><strong>Email</strong></td><td>${esc(form.email)}</td></tr>
      </table>

      <h3>Employment Desired</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>Position</strong></td><td>${esc(form.position)}</td></tr>
        <tr><td><strong>Date Can Start</strong></td><td>${esc(form.dateCanStart)}</td></tr>
        <tr><td><strong>Currently Employed</strong></td><td>${esc(form.employedNow)}</td></tr>
        <tr><td><strong>May Inquire Present Employer</strong></td><td>${esc(form.mayInquirePresent)}</td></tr>
        <tr><td><strong>Applied Before</strong></td><td>${esc(form.appliedBefore)}</td></tr>
        <tr><td><strong>Where/When</strong></td><td>${esc(form.appliedWhere || "N/A")}</td></tr>
        <tr><td><strong>Referred By</strong></td><td>${esc(form.referredBy || "N/A")}</td></tr>
      </table>

      <h3>Education</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>High School</strong></td><td>${esc(form.highSchool || "N/A")} (${esc(form.highSchoolYears || "N/A")} yrs) — ${esc(form.highSchoolSubjects || "N/A")}</td></tr>
        <tr><td><strong>College</strong></td><td>${esc(form.college || "N/A")} (${esc(form.collegeYears || "N/A")} yrs) — ${esc(form.collegeSubjects || "N/A")}</td></tr>
        <tr><td><strong>Other</strong></td><td>${esc(form.otherSchool || "N/A")} (${esc(form.otherSchoolYears || "N/A")} yrs) — ${esc(form.otherSchoolSubjects || "N/A")}</td></tr>
      </table>

      <h3>General Information</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>U.S. Citizen / Authorized</strong></td><td>${esc(form.usCitizen)}</td></tr>
        <tr><td><strong>Special Training</strong></td><td>${esc(form.specialTraining || "N/A")}</td></tr>
        <tr><td><strong>Special Skills</strong></td><td>${esc(form.specialSkills || "N/A")}</td></tr>
        <tr><td><strong>Military Service</strong></td><td>${esc(form.militaryService || "N/A")}</td></tr>
        <tr><td><strong>Military Rank</strong></td><td>${esc(form.militaryRank || "N/A")}</td></tr>
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

    const subjectName = esc(form.fullName).slice(0, 100);
    const subjectPos = esc(form.position || "General").slice(0, 100);


    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Whistle Stop Applications <onboarding@resend.dev>",
        to: ["dthisandcthat@gmail.com"],
        subject: `New Application: ${subjectName} — ${subjectPos}`,
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
