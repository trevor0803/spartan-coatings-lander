import { NextResponse } from 'next/server';
import { getFreeSlots } from '../../../lib/ghl';

export const dynamic = 'force-dynamic';

// Returns the next 21 days of free slots from the GHL calendar.
export async function GET(req) {
  try {
    if (!process.env.GHL_API_TOKEN || !process.env.GHL_CALENDAR_ID) {
      return NextResponse.json({ error: 'Booking is not configured for this site' }, { status: 500 });
    }
    const { searchParams } = new URL(req.url);
    const timezone = searchParams.get('timezone') || undefined;
    const now = Date.now();
    const data = await getFreeSlots({
      startMs: now,
      endMs: now + 21 * 24 * 60 * 60 * 1000,
      timezone,
    });
    // Strip non-date keys (GHL sometimes includes traceId etc.)
    const clean = {};
    for (const [k, v] of Object.entries(data)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(k)) clean[k] = v;
    }
    return NextResponse.json(clean);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
