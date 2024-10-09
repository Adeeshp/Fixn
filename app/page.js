"use client";
import { useEffect, useState } from "react";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import ReviewsSection from "./_components/ReviewsSection";
import HowItWorks from "./_components/HowItWorks";
import OurServices from "./_components/OurServices";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  /**
   * Fetches category list from the backend API
   */
  const getCategoryList = async () => {
    try {
      const response = await fetch("/api/category");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Log the parsed JSON data
      console.log("Parsed Data:", data);
  
      if (data.success) {
        setCategoryList(data.data);
      } else {
        console.error("Error fetching categories:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  

  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList} />
      <OurServices categoryList={categoryList} />
      <HowItWorks />
      <ReviewsSection />
    </div>
  );
}
