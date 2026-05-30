import { useState } from "react";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Briefcase, Send, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Strip control chars and collapse whitespace; keep printable ASCII + common unicode
const sanitizeText = (s: string) =>
  s
    .replace(/[\u0000-\u001F\u007F]/g, "") // strip control chars
    .replace(/\s+/g, " ")
    .trim();

// Keep only digits and + ( ) - . space
const sanitizePhone = (s: string) =>
  s.replace(/[^0-9+()\-.\s]/g, "").replace(/\s+/g, " ").trim();

// Lowercase + trim + strip whitespace inside
const sanitizeEmail = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "");

const applicationSchema = z.object({
  fullName: z
    .string()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(2, "Please enter your full name")
        .max(100, "Name must be under 100 characters")
    ),
  email: z
    .string()
    .transform(sanitizeEmail)
    .pipe(
      z
        .string()
        .min(1, "Email is required so we can contact you")
        .email("Please enter a valid email address")
        .max(255, "Email must be under 255 characters")
    ),
  phone: z
    .string()
    .transform(sanitizePhone)
    .pipe(
      z
        .string()
        .min(7, "Please enter a valid phone number")
        .max(25, "Phone number is too long")
        .regex(/^[0-9+()\-.\s]+$/, "Phone can only contain digits and + ( ) - .")
    ),
  position: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().max(100, "Position must be under 100 characters"))
    .optional()
    .or(z.literal("")),
});

const referenceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Reference name is required")
    .max(100, "Name must be under 100 characters"),
  address: z
    .string()
    .trim()
    .min(5, "Please enter a full address")
    .max(200, "Address must be under 200 characters"),
  business: z
    .string()
    .trim()
    .min(2, "Business or occupation is required")
    .max(100, "Business must be under 100 characters"),
  yearsKnown: z
    .string()
    .trim()
    .min(1, "Years known is required")
    .regex(/^\d+(\.\d+)?$/, "Years known must be a number")
    .refine((v) => Number(v) >= 1 && Number(v) <= 80, {
      message: "Must be between 1 and 80 years",
    }),
});

type ReferenceErrors = Partial<Record<"name" | "address" | "business" | "yearsKnown", string>>;

type FieldErrors = Partial<Record<"fullName" | "email" | "phone" | "position", string>> & {
  references?: string;
  referenceRows?: Record<number, ReferenceErrors>;
};


interface Employer {
  from: string;
  to: string;
  name: string;
  position: string;
  reasonForLeaving: string;
}

interface Reference {
  name: string;
  address: string;
  business: string;
  yearsKnown: string;
}

const emptyEmployer: Employer = { from: "", to: "", name: "", position: "", reasonForLeaving: "" };
const emptyReference: Reference = { name: "", address: "", business: "", yearsKnown: "" };

const Apply = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const [form, setForm] = useState({
    fullName: "",
    presentAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    secondaryPhone: "",
    email: "",
    position: "",
    referredBy: "",
    dateCanStart: "",
    employedNow: "",
    mayInquirePresent: "",
    appliedBefore: "",
    appliedWhere: "",

    highSchool: "",
    highSchoolYears: "",
    highSchoolSubjects: "",
    college: "",
    collegeYears: "",
    collegeSubjects: "",
    otherSchool: "",
    otherSchoolYears: "",
    otherSchoolSubjects: "",

    usCitizen: "",
    specialTraining: "",
    specialSkills: "",
    militaryService: "",
    militaryRank: "",
  });

  const [employers, setEmployers] = useState<Employer[]>([
    { ...emptyEmployer },
    { ...emptyEmployer },
    { ...emptyEmployer },
    { ...emptyEmployer },
  ]);

  const [references, setReferences] = useState<Reference[]>([
    { ...emptyReference },
    { ...emptyReference },
    { ...emptyReference },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEmployerChange = (index: number, field: keyof Employer, value: string) => {
    const updated = [...employers];
    updated[index] = { ...updated[index], [field]: value };
    setEmployers(updated);
  };

  const handleReferenceChange = (index: number, field: keyof Reference, value: string) => {
    const updated = [...references];
    updated[index] = { ...updated[index], [field]: value };
    setReferences(updated);
    // Clear that specific field's error
    if (errors.referenceRows?.[index]?.[field]) {
      setErrors((prev) => {
        const rows = { ...(prev.referenceRows || {}) };
        const row = { ...(rows[index] || {}) };
        delete row[field];
        if (Object.keys(row).length === 0) delete rows[index];
        else rows[index] = row;
        return { ...prev, referenceRows: rows, references: undefined };
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FieldErrors = {};

    // 1. Validate required contact fields
    const result = applicationSchema.safeParse({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      position: form.position,
    });

    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as "fullName" | "email" | "phone" | "position";
        if (key && !newErrors[key]) newErrors[key] = issue.message;
      }
    }

    // 2. Validate references — at least one fully-completed valid reference
    //    Any row that has ANY field filled in must be fully valid.
    const refRowErrors: Record<number, ReferenceErrors> = {};
    let validReferenceCount = 0;

    references.forEach((ref, i) => {
      const hasAnyValue = Boolean(
        ref.name?.trim() || ref.address?.trim() || ref.business?.trim() || ref.yearsKnown?.trim()
      );
      if (!hasAnyValue) return; // empty row is fine — just skip it

      const parsed = referenceSchema.safeParse(ref);
      if (parsed.success) {
        validReferenceCount += 1;
      } else {
        const rowErr: ReferenceErrors = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0] as keyof ReferenceErrors;
          if (key && !rowErr[key]) rowErr[key] = issue.message;
        }
        refRowErrors[i] = rowErr;
      }
    });

    if (Object.keys(refRowErrors).length > 0) {
      newErrors.referenceRows = refRowErrors;
    }

    if (validReferenceCount === 0 && Object.keys(refRowErrors).length === 0) {
      newErrors.references = "Please provide at least one personal reference.";
    } else if (validReferenceCount === 0) {
      newErrors.references = "Please complete the reference details below.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: "Please fix the highlighted fields",
        description: newErrors.references
          ? "At least one complete personal reference is required."
          : "We need valid contact details to continue.",
        variant: "destructive",
      });
      requestAnimationFrame(() => {
        // Scroll to the first contact error, or to references section if that's the only issue
        const contactKeys = ["fullName", "email", "phone", "position"] as const;
        const firstContact = contactKeys.find((k) => newErrors[k]);
        if (firstContact) {
          document
            .querySelector(`[name="${firstContact}"]`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          document
            .getElementById("references-section")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Use sanitized values from zod, plus normalize the optional secondary phone
    const cleanForm = {
      ...form,
      ...result.data,
      secondaryPhone: form.secondaryPhone ? sanitizePhone(form.secondaryPhone) : "",
    };

    try {
      // Save to database first so we always have a record
      const { error: dbError } = await supabase.from("applications").insert([{
        full_name: cleanForm.fullName,
        email: cleanForm.email,
        phone: cleanForm.phone,
        position: cleanForm.position || null,
        form_data: cleanForm as any,
        employers: employers as any,
        personal_references: references as any,
      }]);

      if (dbError) throw dbError;

      // Then send the email notification (best-effort)
      const { error } = await supabase.functions.invoke("send-application-email", {
        body: { form: cleanForm, employers, references },
      });

      if (error) console.error("Email notification failed:", error);


      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll be in touch soon!",
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionClass = "bg-card rounded-2xl p-6 md:p-8 warm-shadow space-y-5";
  const labelClass = "text-sm font-semibold text-foreground/80";

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Apply Now | The Whistle Stop — Port Salerno</title>
        <meta name="description" content="Join the Whistle Stop team! Apply for a position at our Port Salerno restaurant." />
        <link rel="canonical" href="https://thewhistlestopstuart.com/apply" />
        <meta property="og:title" content="Apply Now | The Whistle Stop" />
        <meta property="og:description" content="We're hiring at our Port Salerno location. Apply online today." />
        <meta property="og:url" content="https://thewhistlestopstuart.com/apply" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">We're Hiring</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
              Join Our Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be part of a Port Salerno tradition. Fill out the application below and we'll get back to you as soon as possible.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Personal Information */}
            <ScrollReveal>
              <div className={sectionClass}>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
                  Personal Information
                </h2>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Pre-Employment • Equal Opportunity Employer</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label className={labelClass}>Full Name (Last, First, Middle) *</Label>
                    <Input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      aria-invalid={!!errors.fullName}
                      className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label className={labelClass}>Present Address</Label>
                    <Input name="presentAddress" value={form.presentAddress} onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <Label className={labelClass}>City</Label>
                      <Input name="city" value={form.city} onChange={handleChange} />
                    </div>
                    <div>
                      <Label className={labelClass}>State</Label>
                      <Input name="state" value={form.state} onChange={handleChange} />
                    </div>
                    <div>
                      <Label className={labelClass}>Zip Code</Label>
                      <Input name="zipCode" value={form.zipCode} onChange={handleChange} />
                    </div>
                  </div>
                  <div>
                    <Label className={labelClass}>Phone No. *</Label>
                    <Input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      aria-invalid={!!errors.phone}
                      className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className={labelClass}>Secondary Phone No.</Label>
                    <Input name="secondaryPhone" type="tel" value={form.secondaryPhone} onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2">
                    <Label className={labelClass}>Email Address *</Label>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      aria-invalid={!!errors.email}
                      className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Employment Desired */}
            <ScrollReveal>
              <div className={sectionClass}>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
                  Employment Desired
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={labelClass}>Position</Label>
                    <Input name="position" value={form.position} onChange={handleChange} />
                  </div>
                  <div>
                    <Label className={labelClass}>Date You Can Start</Label>
                    <Input name="dateCanStart" type="date" value={form.dateCanStart} onChange={handleChange} />
                  </div>
                  <div>
                    <Label className={labelClass}>Are You Currently Employed?</Label>
                    <Input name="employedNow" value={form.employedNow} onChange={handleChange} placeholder="Yes / No" />
                  </div>
                  <div>
                    <Label className={labelClass}>May We Inquire of Your Present Employer?</Label>
                    <Input name="mayInquirePresent" value={form.mayInquirePresent} onChange={handleChange} placeholder="Yes / No" />
                  </div>
                  <div>
                    <Label className={labelClass}>Ever Applied Here Before?</Label>
                    <Input name="appliedBefore" value={form.appliedBefore} onChange={handleChange} placeholder="Yes / No" />
                  </div>
                  <div>
                    <Label className={labelClass}>If Yes, Where / When?</Label>
                    <Input name="appliedWhere" value={form.appliedWhere} onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2">
                    <Label className={labelClass}>Referred By</Label>
                    <Input name="referredBy" value={form.referredBy} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal>
              <div className={sectionClass}>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
                  Education History
                </h2>
                {[
                  { label: "High School", prefix: "highSchool" },
                  { label: "College", prefix: "college" },
                  { label: "Other School / Correspondence", prefix: "otherSchool" },
                ].map(({ label, prefix }) => (
                  <div key={prefix} className="space-y-3 pb-4 border-b border-border last:border-0">
                    <h3 className="font-semibold text-foreground/90">{label}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label className={labelClass}>Name & Location of School</Label>
                        <Input name={prefix} value={(form as any)[prefix]} onChange={handleChange} />
                      </div>
                      <div>
                        <Label className={labelClass}>No. of Years</Label>
                        <Input name={`${prefix}Years`} value={(form as any)[`${prefix}Years`]} onChange={handleChange} />
                      </div>
                      <div className="md:col-span-3">
                        <Label className={labelClass}>Subjects Studied</Label>
                        <Input name={`${prefix}Subjects`} value={(form as any)[`${prefix}Subjects`]} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* General Information */}
            <ScrollReveal>
              <div className={sectionClass}>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
                  General Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label className={labelClass}>U.S. Citizen or Legal Authorization to Work?</Label>
                    <Input name="usCitizen" value={form.usCitizen} onChange={handleChange} placeholder="Yes / No" />
                  </div>
                  <div className="md:col-span-2">
                    <Label className={labelClass}>Special Training</Label>
                    <Textarea name="specialTraining" value={form.specialTraining} onChange={handleChange} rows={2} />
                  </div>
                  <div className="md:col-span-2">
                    <Label className={labelClass}>Special Skills</Label>
                    <Textarea name="specialSkills" value={form.specialSkills} onChange={handleChange} rows={2} />
                  </div>
                  <div>
                    <Label className={labelClass}>U.S. Military or Naval Service</Label>
                    <Input name="militaryService" value={form.militaryService} onChange={handleChange} />
                  </div>
                  <div>
                    <Label className={labelClass}>Rank</Label>
                    <Input name="militaryRank" value={form.militaryRank} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Former Employers */}
            <ScrollReveal>
              <div className={sectionClass}>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
                  Former Employers
                </h2>
                <p className="text-sm text-muted-foreground">List your last four employers, starting with the most recent.</p>
                {employers.map((emp, i) => (
                  <div key={i} className="space-y-3 pb-5 border-b border-border last:border-0">
                    <h3 className="font-semibold text-foreground/90">Employer {i + 1}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Label className={labelClass}>From</Label>
                        <Input value={emp.from} onChange={(e) => handleEmployerChange(i, "from", e.target.value)} />
                      </div>
                      <div>
                        <Label className={labelClass}>To</Label>
                        <Input value={emp.to} onChange={(e) => handleEmployerChange(i, "to", e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <Label className={labelClass}>Name & Address of Employer</Label>
                        <Input value={emp.name} onChange={(e) => handleEmployerChange(i, "name", e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <Label className={labelClass}>Position</Label>
                        <Input value={emp.position} onChange={(e) => handleEmployerChange(i, "position", e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <Label className={labelClass}>Reason for Leaving</Label>
                        <Input value={emp.reasonForLeaving} onChange={(e) => handleEmployerChange(i, "reasonForLeaving", e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* References */}
            <ScrollReveal>
              <div id="references-section" className={sectionClass}>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
                  References *
                </h2>
                <p className="text-sm text-muted-foreground">
                  Three persons not related to you, whom you have known at least one year.
                  At least one complete reference is required.
                </p>
                {errors.references && (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {errors.references}
                  </div>
                )}
                {references.map((ref, i) => {
                  const rowErr = errors.referenceRows?.[i];
                  const fieldClass = (k: keyof Reference) =>
                    rowErr?.[k] ? "border-destructive focus-visible:ring-destructive" : "";
                  return (
                    <div key={i} className="space-y-2 pb-4 border-b border-border last:border-0">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Label className={labelClass}>Name</Label>
                          <Input
                            value={ref.name}
                            onChange={(e) => handleReferenceChange(i, "name", e.target.value)}
                            aria-invalid={!!rowErr?.name}
                            className={fieldClass("name")}
                          />
                          {rowErr?.name && (
                            <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {rowErr.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className={labelClass}>Address</Label>
                          <Input
                            value={ref.address}
                            onChange={(e) => handleReferenceChange(i, "address", e.target.value)}
                            aria-invalid={!!rowErr?.address}
                            className={fieldClass("address")}
                          />
                          {rowErr?.address && (
                            <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {rowErr.address}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className={labelClass}>Business</Label>
                          <Input
                            value={ref.business}
                            onChange={(e) => handleReferenceChange(i, "business", e.target.value)}
                            aria-invalid={!!rowErr?.business}
                            className={fieldClass("business")}
                          />
                          {rowErr?.business && (
                            <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {rowErr.business}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className={labelClass}>Years Known</Label>
                          <Input
                            inputMode="numeric"
                            value={ref.yearsKnown}
                            onChange={(e) => handleReferenceChange(i, "yearsKnown", e.target.value)}
                            aria-invalid={!!rowErr?.yearsKnown}
                            className={fieldClass("yearsKnown")}
                          />
                          {rowErr?.yearsKnown && (
                            <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {rowErr.yearsKnown}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Authorization & Submit */}
            <ScrollReveal>
              <div className={sectionClass}>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
                  Authorization
                </h2>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "I certify that facts contained in this application are true and complete to the best of my knowledge
                  and understand that, if employed, falsified statements on this application shall be grounds for dismissal."
                </p>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </ScrollReveal>

          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Apply;
