import React from "react";
import { Star } from "lucide-react";

function ReviewCard({ name, review, service, rating }) {
  return (
    <div className="border rounded-md p-4 shadow-md w-[300px]">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-semibold">{name}</h3>
        <div className="flex">
          {[...Array(rating)].map((_, index) => (
            <Star key={index} className="text-yellow-500 w-4 h-4" />
          ))}
        </div>
      </div>
      <p className="text-gray-600 mb-2">{review}</p>
      <h4 className="text-primary underline cursor-pointer">{service}</h4>
    </div>
  );
}

export default ReviewCard;
