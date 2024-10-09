import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function OurServices({ categoryList }) {
  return (
    <div className="mt-5 p-20">
      <h2 className="font-bold text-[32px] text-primary">Popular Services</h2>
      <div
        className="grid grid-cols-3 md:grid-cols-4
        lg:grid-cols-4 gap-6 mt-5 "
      >
        {categoryList.length > 0
          ? categoryList.map((category, index) => (
              index < 4 ?
              <Link
                href="#how-it-works"
                key={index}
                className="shadow-md 
                rounded-lg bg-gray-50 hover:shadow-md cursor-pointer hover:scale-105 transition-all ease-in-out"
              >
                <Image
                  src={category.imageURL}
                  alt={category.categoryName}
                  width={500}
                  height={200}
                  className="h-[150px] md:h-[200px]
                    object-cover rounded-lg"
                />
                <div
                  className="flex flex-col 
                    items-baseline p-3 gap-1 "
                >
                    {/* <h2
                        className="p-1 bg-green-100
                            text-primary rounded-full px-2
                            text-[12px]"
                    >
                        {category.categoryName}
                    </h2> */}
                    <h2 className='font-bold text-lg'>{category.categoryName}</h2>
                    {/* <h2 className='text-primary'>{category.categoryName}</h2>
                    <h2 className='text-gray-500 text-sm'>{category.categoryName}</h2> */}
                  <Button className="w-full border-2 border-primary bg-white text-primary hover:text-white rounded-lg mt-3">Know More</Button>
                </div>
              </Link>
              : <div key={index}></div>
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
