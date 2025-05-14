// src/app/Navigation.tsx
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Navigation() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.push("/login");
    }
  };
  return (
    <nav className="flex justify-between border-b">
      <div className="flex gap-4 p-4">
        <Link href="/tasks" className="hover:text-blue-500">
          Tasks
        </Link>
        <Link href="/settings" className="hover:text-blue-500">
          Settings
        </Link>
      </div>
      <div className="flex gap-4 p-4">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
