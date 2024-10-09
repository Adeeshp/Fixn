import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const reviews = [
  {
    name: 'Alice M.',
    review: 'John did an amazing job painting our living room. He was thorough, neat, and finished earlier than expected. Highly recommend his services!',
    category: 'Painting',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/1.jpg' // Sample image URL
  },
  {
    name: 'Michael L.',
    review: 'Sarah was prompt and professional while assembling my new office furniture. She even gave suggestions on optimizing the space. A pleasure to work with.',
    category: 'Furniture Assembly',
    rating: 4.5,
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    name: 'Emily R.',
    review: 'David installed our kitchen backsplash perfectly. His attention to detail is impressive, and he made sure everything was spotless before leaving.',
    category: 'Tiling',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    name: 'Liam P.',
    review: 'Had my leaky faucet repaired by Adam. Quick service, but I had to call him back to fix a minor issue later. Overall, it was a good experience.',
    category: 'Plumbing',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    name: 'Sophia N.',
    review: 'Bryan was fantastic at mounting our large TV. He ensured everything was secure and helped conceal the cables. Very polite and knowledgeable.',
    category: 'TV Mounting',
    rating: 4.5,
    image: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    name: 'James F.',
    review: 'Needed help moving heavy furniture to my new apartment, and Jessica was a lifesaver. She was punctual, careful with the items, and extremely efficient.',
    category: 'Help Moving',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
];


const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="text-yellow-500" />
      ))}
      {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
      {[...Array(totalStars - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
        <FaRegStar key={i} className="text-yellow-500" />
      ))}
    </div>
  );
};

function ReviewsSection() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
        staggerChildren: 0.3 // Stagger effect for child elements
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: [0, 5, -5, 0], // Small rotation bounce effect
      transition: { 
        duration: 0.8, 
        type: 'spring', 
        stiffness: 120 
      }
    }
  };


  return (
    <div className="mb-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-center font-bold text-4xl mt-20">
          Here’s what satisfied customers are saying about Fixn!
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="p-5 shadow-lg rounded-lg flex flex-col items-start"
              variants={cardVariants}  // Apply animation on each card
            >
              <div className="flex items-center mb-2">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-10 h-10 rounded-full mr-3" // Adjust the size and shape as needed
                />
                <h3 className="font-bold">{review.name}</h3>
              </div>
              <p>{review.review}</p>
              <p className="text-sm text-gray-500">{review.category}</p>
              <RatingStars rating={review.rating} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ReviewsSection;
