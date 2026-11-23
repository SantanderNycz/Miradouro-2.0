import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Supabase ainda não configurado — não bloquear o pedido (nem a criação do cliente).
  if (!url || !key) return response;

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  let user = null;
  try {
    const res = await supabase.auth.getUser();
    user = res.data.user;
  } catch {
    // Supabase indisponível / credenciais em falta — não bloquear o pedido.
  }

  // "/" e "/login" são públicos; um utilizador autenticado é levado ao /dashboard.
  const path = request.nextUrl.pathname;
  if (user && (path === "/" || path === "/login")) {
    const dash = request.nextUrl.clone();
    dash.pathname = "/dashboard";
    const redirect = NextResponse.redirect(dash);
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
