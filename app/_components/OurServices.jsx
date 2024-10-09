// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// function OurServices({ categoryList }) {
//   return (
//     <div className="mt-5 p-20">
//       <h2 className="font-bold text-[32px] text-primary">Popular Services</h2>
//       <div
//         className="grid grid-cols-3 md:grid-cols-4
//         lg:grid-cols-4 gap-6 mt-5 "
//       >
//         {categoryList.length > 0
//           ? categoryList.map((category, index) => (
//               index < 4 ?
//               <Link
//                 href="#how-it-works"
//                 key={index}
//                 className="shadow-md 
//                 rounded-lg bg-gray-50 hover:shadow-md cursor-pointer hover:scale-105 transition-all ease-in-out"
//               >
//                 <Image
//                   src={category.imageURL}
//                   alt={category.categoryName}
//                   width={500}
//                   height={200}
//                   className="h-[150px] md:h-[200px]
//                     object-cover rounded-lg"
//                 />
//                 <div
//                   className="flex flex-col 
//                     items-baseline p-3 gap-1 "
//                 >
//                   <h2 className='font-bold text-lg'>{category.categoryName}</h2>
//                   <Button className="w-full border-2 border-primary bg-white text-primary hover:text-white rounded-lg mt-3">Know More</Button>
//                 </div>
//               </Link>
//               : <div key={index}></div>
//             ))
//           : [1, 2, 3, 4, 5, 6].map((item, index) => (
//               <div
//                 key={index}
//                 className="w-full h-[300px] bg-slate-200 rounded-lg animate-pulse"
//               ></div>
//             ))}
//       </div>
//     </div>
//   );
// }

// export default OurServices;

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function OurServices({ categoryList }) {
  const [expandedIndex, setExpandedIndex] = useState(null); // Track expanded card index
  const [subcategories, setSubcategories] = useState([]);  // Store subcategories for the expanded card

  // Toggle card expansion and fetch subcategories
  const toggleExpand = async (index, categoryId) => {
    if (expandedIndex === index) {
      // Collapse the card if it's already expanded
      setExpandedIndex(null);
      setSubcategories([]);
    } else {
      setExpandedIndex(index);
      
      // Fetch subcategories for the clicked category
      try {
        const response = await fetch(`/api/subcategories/${categoryId}`);
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
                  className="shadow-md rounded-lg bg-gray-50 hover:shadow-md cursor-pointer hover:scale-105 transition-all ease-in-out"
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

                    {/* Display subcategories if this card is expanded */}
                    {expandedIndex === index && (
                      <div className="mt-4">
                        <h3 className="font-bold text-primary">Subcategories:</h3>
                        <ul className="list-disc pl-4">
                          {subcategories.map((subcat, subIndex) => (
                            <li key={subIndex} className="mt-2">
                              {subcat.subCategoryName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
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
