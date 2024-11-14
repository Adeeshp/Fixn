"use client"; 
import { Button } from "@/components/ui/button"; 
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const updateUserState = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    updateUserState(); // Check on mount
    window.addEventListener("storage", updateUserState); // Listen for changes

    return () => {
      window.removeEventListener("storage", updateUserState); // Clean up the listener
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="fixed w-full z-10 shadow-sm bg-white">
      <div className="mx-6 md:mx-20 py-5 flex justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/fixn.svg" alt="logo" width={100} height={100} />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="md:flex items-center gap-6 hidden text-black">
            <Link href="/">
              <h2 className="hover:scale-105 hover:text-primary cursor-pointer">Home</h2>
            </Link>
            <Link href="/postings">
              <h2 className="hover:scale-105 hover:text-primary cursor-pointer">Job Postings</h2>
            </Link>
            {!user && (
              <Link href="/login">
                <h2 className="hover:scale-105 hover:text-primary cursor-pointer">Login</h2>
              </Link>
            )}
          </div>
          {user && (
            <div className="flex items-center gap-6">
              <span className="text-black">Welcome, <span className='text-primary'>{user.firstname}!</span></span>
              
              { user.role === "normal" && (
                <Button
                  className="hover:bg-primary bg-white hover:scale-105 border border-primary text-primary hover:text-white border-2 cursor-pointer"
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
              )}
              { user.role === "serviceProvider" && (
                <Button
                  className="hover:bg-white bg-primary hover:scale-105 border border-primary hover:text-primary text-white border-2 cursor-pointer"
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
              )}

            </div>
          )}
          { (!user || user.role !== "serviceProvider") && (
            <Link href="/register">
              <Button className="bg-primary text-white hover:bg-white hover:scale-105 hover:border-primary hover:text-primary border-2 border-transparent cursor-pointer">
                Become a Fixer
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
