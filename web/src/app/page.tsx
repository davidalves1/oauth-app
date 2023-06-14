import { getUser } from '@/lib/auth';
import Link from 'next/link';

export default function Home() {
  const user = getUser();

  const isAutenticated = !!user?.sub;

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-5xl">My App</h1>
      <Link
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
        className="bg-green-500 text-gray-900 py-3 px-4 rounded-md hover:bg-green-600 transition">
        Registrar
      </Link>
      <h2>{isAutenticated ? `Olá, ${user?.name}` : 'Usuário não registrado'}</h2>
      <Link href="/api/auth/logout" className="bg-gray-500 text-white py-3 px-4 rounded-md hover:bg-gray-600 transition">
        Sair
      </Link>
    </main>
  )
}
