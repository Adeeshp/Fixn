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
      setSubcategories([]); // Clear subcategories when collapsing
    } else {
      setExpandedIndex(index); // Set the clicked card to expand
      setLoading(true);  // Start loading

      try {
        const response = await fetch(`/api/subcategory/${categoryId}`); // Fetch subcategories using proxy
        const data = await response.json();
        
        if (data.success) {
          setSubcategories(data.data);  // Set subcategories for the selected card
        } else {
          console.error("Error fetching subcategories:", data.message);
          setSubcategories([]); // Clear in case of error
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setSubcategories([]); // Clear on fetch error
      }

      setLoading(false);  // End loading
    }
  };

  return (
    <div className="mt-5 p-20">
      <h2 className="font-bold text-[32px] text-primary">Popular Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        {categoryList.length > 0
          ? categoryList.map((category, index) => (
              index < 4 ? (
                <div
                  key={index}
                  className={`shadow-md rounded-lg bg-gray-50 hover:shadow-lg transition-all ease-in-out cursor-pointer ${
                    expandedIndex === index ? "expanded-card h-full" : "lg:h-[310px]"
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
                      onClick={() => toggleExpand(index, category._id)} // Use index and category ID to expand only one
                    >
                      {expandedIndex === index ? "Show Less" : "Know More"}
                    </Button>
                  </div>

                  {/* Display subcategories if this card is expanded */}
                  {expandedIndex === index && (
                    <div className="border-t-2 border-gray-300 mt-2 p-2 w-full rounded-b-lg">
                      <div className="flex flex-wrap justify-start">
                        {loading ? (
                          <div>Loading...</div>
                        ) : (
                          subcategories.map((subcat, subIndex) => (
                            <div
                              key={subIndex}
                              className="m-[4px] text-center text-white bg-primary/90 shadow-md text-[14px] p-1 rounded-lg px-2"
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
          : [1, 2, 3, 4].map((item, index) => (
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