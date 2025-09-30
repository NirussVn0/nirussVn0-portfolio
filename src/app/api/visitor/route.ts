//route.ts

import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const count = await kv.get<number>('visitor_count') || 0;
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Failed to fetch visitor count:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const hash = await crypto.subtle.digest(
      'SHA-256', 
      new TextEncoder().encode(ip)
    );
    const hashedIP = Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // check ip
    const isNewVisitor = await kv.set(
      `visitor:${hashedIP}`, 
      true, 
      { ex: 86400, nx: true } 
    );
    
    if (isNewVisitor) {
      // Increment counter
      const newCount = await kv.incr('visitor_count');
      return NextResponse.json({ count: newCount, incremented: true });
    }
    
    const currentCount = await kv.get<number>('visitor_count') || 0;
    return NextResponse.json({ count: currentCount, incremented: false });
  } catch (error) {
    console.error('Failed to increment visitor count:', error);
    return NextResponse.json({ error: 'Failed to increment' }, { status: 500 });
  }
}
