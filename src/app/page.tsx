import Landing from "./Landing";

// Landing pública. Um utilizador autenticado é reencaminhado para /dashboard no middleware.
export default function Home() {
  return <Landing />;
}
