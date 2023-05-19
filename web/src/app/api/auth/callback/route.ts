import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    const code = searchParams.get('code')

    const registerResponse = await api.post('/register', { code });

    const { token } = registerResponse.data;

    const redirectUrl = new URL('/', request.url)

    const OneDayInSeconds = 60 * 60 * 25;
    console.log('🚀 ~ GET ~ cookie:', `client.token=${token}; Path=/; max-age: ${OneDayInSeconds};`);

    // armazena o token nos cookies ao redirecionar
    return NextResponse.redirect(redirectUrl, {
        headers: {
            'Set-Cookie': `client.token=${token}; Path=/; max-age=${OneDayInSeconds};`
        }
    })
}
