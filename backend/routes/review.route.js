import express from 'express';
import {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} from '../controllers/review.controller.js';

const router = express.Router();

// **POST /api/review**
router.post('/review', createReview); // Create a new review

// **GET /api/reviews**
router.get('/reviews', getAllReviews); // Get all reviews

// **GET /api/review/:reviewId**
router.get('/review/:reviewId', getReviewById); // Get a specific review by ID

// **PUT /api/review/:reviewId**
router.put('/review/:reviewId', updateReview); // Update a review by ID

// **DELETE /api/review/:reviewId**
router.delete('/review/:reviewId', deleteReview); // Delete a review by ID

export default router;
