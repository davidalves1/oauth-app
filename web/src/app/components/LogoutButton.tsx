'use client';

import { logout } from "@/lib/auth";
import { useRouter } from "next/router";

export function LogoutButton() {
  const handleLogout = () => {
    logout();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    router.replace('/');
  }

  return (
    <button onClick={handleLogout} className="bg-gray-500 text-white py-3 px-4 rounded-md hover:bg-gray-600 transition">
      Sair
    </button>
  )
}
