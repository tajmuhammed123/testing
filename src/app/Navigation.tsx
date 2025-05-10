// src/app/Navigation.tsx
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link href="/tasks" className="hover:text-blue-500">Tasks</Link>
      <Link href="/settings" className="hover:text-blue-500">Settings</Link>
    </nav>
  );
}