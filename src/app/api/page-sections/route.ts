import { NextResponse } from 'next/server';
import { getPageSections } from '@/lib/queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'homepage';

  try {
    const sections = await getPageSections(page);
    return NextResponse.json(sections);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}
