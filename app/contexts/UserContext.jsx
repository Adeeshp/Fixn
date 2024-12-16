'use client';
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state on initial render

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (parsedUser) {
      // Optional: Add a check for token validity here
      setUser(parsedUser);
    }

    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  // Update localStorage when user data changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Handle signOut
  const signOut = () => {
    localStorage.removeItem("token"); // Clear token if used
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login"); // Redirect to login page after sign out
  };

  if (loading) return null; // Optionally return a loading spinner or some indicator

  return (
    <UserContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
