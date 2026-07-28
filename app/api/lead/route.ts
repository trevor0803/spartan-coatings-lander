import { NextResponse } from "next/server";

const SPARTAN_LEAD_ENDPOINT =
  "https://mat-spartan-coatings.vercel.app/api/lead";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const required = [
      body.firstName,
      body.lastName,
      body.phone,
      body.email,
      body.zip,
      body.size,
      body.priority,
      body.timing,
    ];

    if (
      required.some((value) => !String(value || "").trim()) ||
      !Array.isArray(body.projectTypes) ||
      !body.projectTypes.length ||
      body.consent !== true
    ) {
      return NextResponse.json(
        { error: "Please complete the required fields." },
        { status: 400 },
      );
    }

    const message = [
      `Project areas: ${body.projectTypes.join(", ")}`,
      `ZIP: ${body.zip}`,
      `Approximate size: ${body.size}`,
      `Priority: ${body.priority}`,
      `Timing: ${body.timing}`,
      body.comments ? `Comments: ${body.comments}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const upstream = await fetch(SPARTAN_LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: body.firstName,
        lastName: body.lastName,
        name: `${body.firstName} ${body.lastName}`.trim(),
        phone: body.phone,
        email: body.email,
        message,
        source: "spartan-trust-landing-page",
        tag: "free-concrete-evaluation",
        eventId: body.eventId,
        fbp: body.fbp,
        fbc: body.fbc,
        eventSourceUrl: body.eventSourceUrl,
      }),
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return NextResponse.json(
        { error: data.error || "We could not send your request. Please call us." },
        { status: upstream.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "We could not send your request. Please call us." },
      { status: 500 },
    );
  }
}
