import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  cookies().set('client.token', '');

  const redirectUrl = new URL('/', request.url);

  return NextResponse.redirect(redirectUrl);
}
