"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Button } from "../components/ui/button";
import { supabase } from "../integrations/supabase/client";

const Navbar = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-primary">
              InsuranceAI
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary">
              Product
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary">
              Technology
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary">
              Team
            </a>
            {user ? (
              <>
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Dashboard
                </Button>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => router.push("/auth")}>
                  Sign In
                </Button>
                <Button onClick={() => router.push("/auth")}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;