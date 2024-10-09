import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function OurServices({ categoryList }) {
  const [expandedIndex, setExpandedIndex] = useState(null); // Track expanded card index
  const [subcategories, setSubcategories] = useState([]);  // Store subcategories for the expanded card
  const [loading, setLoading] = useState(false);  // Handle loading state for API call

  // Toggle card expansion and fetch subcategories
  const toggleExpand = async (index, categoryId) => {
    if (expandedIndex === index) {
      // Collapse the card if it's already expanded
      setExpandedIndex(null);
      setSubcategories([]);
    } else {
      setExpandedIndex(index);
      setLoading(true);  // Start loading
      try {
        const response = await fetch(`/api/subcategory/${categoryId}`); // Using the proxy URL
        const data = await response.json();
        
        if (data.success) {
          setSubcategories(data.data);  // Set subcategories for the selected card
        } else {
          console.error("Error fetching subcategories:", data.message);
          setSubcategories([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setSubcategories([]);
      }
      setLoading(false);  // End loading
    }
  };

  return (
    <div className="mt-5 p-20">
      <h2 className="font-bold text-[32px] text-primary">Popular Services</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-5">
        {categoryList.length > 0
          ? categoryList.map((category, index) => (
              index < 4 ? (
                <div
                  key={index}
                  className={`shadow-md rounded-lg bg-gray-50 hover:shadow-lg transition-all ease-in-out cursor-pointer ${
                    expandedIndex === index ? "expanded-card" : ""
                  }`}
                >
                  <Image
                    src={category.imageURL}
                    alt={category.categoryName}
                    width={500}
                    height={200}
                    className="h-[150px] md:h-[200px] object-cover rounded-lg"
                  />
                  <div className="flex flex-col items-baseline p-3 gap-1">
                    <h2 className="font-bold text-lg">{category.categoryName}</h2>
                    <Button
                      className="w-full border-2 border-primary bg-white text-primary hover:text-white rounded-lg mt-3"
                      onClick={() => toggleExpand(index, category._id)}
                    >
                      {expandedIndex === index ? "Show Less" : "Know More"}
                    </Button>
                  </div>

                  {/* Display subcategories if this card is expanded */}
                  {expandedIndex === index && (
                    <div className="mt-4 p-4 w-full bg-gray-100 rounded-b-lg">
                      <div className="flex flex-wrap justify-center">
                        {loading ? (
                          <div>Loading...</div>
                        ) : (
                          subcategories.map((subcat, subIndex) => (
                            <div
                              key={subIndex}
                              className="w-fit m-2 text-center text-secondary border-secondary bg-blue-50 text-[12px] border-2 p-2 rounded-full px-4"
                            >
                              {subcat.subCategoryName}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div key={index}></div>
              )
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="w-full h-[300px] bg-slate-200 rounded-lg animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default OurServices;
