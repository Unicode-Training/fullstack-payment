import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./services/auth.service";
import { ROUTES_PROTECTED } from "./constants/route.constant";

export const proxy = async (request: NextRequest) => {
    const user = await getUser();
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.nextUrl.origin))
    }
    if (user.type === "CLIENT") {
        return NextResponse.redirect(new URL('/forbidden', request.nextUrl.origin))
    }

    const { pathname } = request.nextUrl;

    const route = ROUTES_PROTECTED.find(val => pathname.startsWith(val.path));

    if (user.type !== 'ADMIN') {
        if (route && !user.permissions.includes(route.permissions)) {
            return NextResponse.redirect(new URL('/forbidden', request.nextUrl.origin))
        }
    }
}

export const config = {
    matcher: '/admin/:path*',
}