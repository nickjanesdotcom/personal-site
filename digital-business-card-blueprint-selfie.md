# Digital Business Card Website Blueprint

This document is a blueprint for building a personal digital business
card website using **Next.js** deployed on **Vercel**, with an API
backend for automations. The design is inspired by **Notion** (minimal,
structured) and **Attio** (sleek, data-driven).

------------------------------------------------------------------------

## 🎨 Aesthetic & Branding

-   Black-and-white aesthetic with one accent color.
-   Minimal sans-serif typography (Inter, Work Sans, Neue Haas Grotesk).
-   Generous spacing, clean grids, subtle micro-interactions.
-   Mobile-first design.

------------------------------------------------------------------------

## 📂 Project Structure

    /app
      /layout.tsx        # Global layout (fonts, colors, meta)
      /page.tsx          # Homepage (digital business card)
      /about/page.tsx    # (optional) About page
      /work/page.tsx     # Services / templates
      /api
        /contact/route.ts  # Save contact form submissions + selfies
        /analytics/route.ts# Track NFC/QR scans
    /components
      Header.tsx
      Hero.tsx
      ContactButtons.tsx
      ResourceGrid.tsx
      ConferenceBanner.tsx
      ShareYourDetails.tsx
      SelfieExchange.tsx
      Footer.tsx
    /lib
      utils.ts
      db.ts (if using Prisma/DB)
      email.ts (if sending follow-ups)
    /public
      avatar.png
      logo.svg
      qrcode.png

------------------------------------------------------------------------

## 🖥️ Homepage Layout

### Hero Section

-   Profile picture, name, and tagline.
-   Buttons: **Save My Contact**, **Share My Card**.
-   Optional QR code backup.

### Resources / Links

-   Grid of Notion/Attio templates, guides, or work highlights.
-   Clean cards with hover effects.

### Conference Mode (Toggle)

-   Banner: "Currently at \[Conference Name\] --- let's connect!"
-   Buttons: Book a Meeting (Calendly), Exchange Contact (form).
-   Can be toggled on/off with environment variable or DB flag.

### About / Services

-   Describe offerings (Notion consulting, Attio setups, automations).

### Socials

-   Row of monochrome icons: LinkedIn, X, YouTube, Instagram.

### Footer

-   Minimal, clean design.

------------------------------------------------------------------------

## ⚡ Features

-   **Save to Contacts**: `.vcf` file download for universal use.
-   **Share My Card**: Native Web Share API with fallback
    copy-to-clipboard.
-   **Quick Connect Buttons**: SMS, WhatsApp, Telegram, Email, LinkedIn.
-   **Exchange Contact Form**: Simple form with name + email, submits to
    API.
-   **Selfie Exchange**: Take a selfie together, share with each other,
    and exchange details.
-   **Conference Mode**: Optional banner with scheduler + exchange form.
-   **Analytics**: Track taps, scans, and submissions via API routes.

------------------------------------------------------------------------

## 🧩 Example: Selfie + Share Your Details Component

``` tsx
"use client";
import { useRef, useState } from "react";

export default function SelfieExchange() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;
  }

  function takePhoto() {
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 320, 240);
        setPhoto(canvasRef.current.toDataURL("image/png"));
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      photo, // selfie as base64
    };

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section className="max-w-xl mx-auto p-6 border rounded-2xl shadow bg-white text-black space-y-6">
      <h2 className="text-xl font-semibold">🤳 Take a Selfie & Share Details</h2>

      {!photo ? (
        <>
          <video ref={videoRef} autoPlay playsInline width="320" height="240" className="mx-auto border rounded-lg"/>
          <canvas ref={canvasRef} width="320" height="240" className="hidden"/>
          <div className="flex gap-3 justify-center mt-2">
            <button onClick={startCamera} className="px-4 py-2 bg-black text-white rounded-lg">Start Camera</button>
            <button onClick={takePhoto} className="px-4 py-2 bg-gray-700 text-white rounded-lg">Take Photo</button>
          </div>
        </>
      ) : (
        <div>
          <img src={photo} alt="Selfie" className="mx-auto rounded-lg shadow"/>
        </div>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Your name" required className="w-full p-3 border rounded-lg"/>
          <input type="email" name="email" placeholder="Your email" required className="w-full p-3 border rounded-lg"/>
          <button type="submit" disabled={loading} className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800">
            {loading ? "Sending..." : "Share & Get Selfie"}
          </button>
        </form>
      ) : (
        <p className="text-green-600">✅ Selfie & details shared — check your inbox!</p>
      )}
    </section>
  );
}
```

------------------------------------------------------------------------

## 📡 API Endpoint Example

``` ts
// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  // TODO: Upload selfie (data.photo) to storage (Supabase/S3)
  // Save name + email to DB or CRM (Attio/Notion)
  // Send email with selfie + vCard attached

  console.log("New contact with selfie:", data);

  return NextResponse.json({ success: true });
}
```

------------------------------------------------------------------------

## 🔄 Automations & Integrations

Your Next.js API routes let you plug in automations. Here are some
options:

### 1. Auto-Send Your vCard

-   After someone submits the form, trigger an email with your `.vcf`
    file attached.\
-   Use providers like **Resend**, **SendGrid**, or **Postmark**.

### 2. CRM Integration (Attio)

-   Push contact form submissions directly into **Attio CRM**.\
-   Use Attio's API with your `/api/contact` endpoint.

### 3. Notion Sync

-   Append submissions to a Notion database (for lightweight CRM).\
-   Use the Notion API inside your API route.

### 4. Conference Analytics

-   Track NFC taps vs QR scans vs form submissions.\
-   Save into Supabase or a lightweight DB for later analysis.

### 5. Auto-Follow-Up Email

-   Send a quick "Nice to meet you at \[Conference\]!" email
    automatically.\
-   Personalize with their name from the form.\
-   Include the selfie + your vCard.

------------------------------------------------------------------------

## 🚀 Deployment

1.  Push repo to GitHub.\
2.  Deploy on Vercel.\
3.  Add environment variables in Vercel dashboard.\
4.  Connect Supabase, Notion, or Attio APIs for automations.

------------------------------------------------------------------------

## ✅ Summary

This site will serve as: - A polished, Notion/Attio-inspired personal
hub.\
- A **conference-ready tool** with quick contact exchange.\
- A **fun "selfie exchange" feature** to make networking memorable.\
- A backend-enabled platform for automations and analytics.\
- A launchpad for syncing with CRM (Attio), Notion, and follow-ups.
