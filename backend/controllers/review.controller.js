import Review from '../models/review.model.js';
import Task from '../models/task.model.js';

// Create a new review
// export const createReview = async (req, res) => {
//   const { taskId, review, rating } = req.body;

//   try {
//     const task = await Task.findById(taskId);
//     if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

//     const newReview = new Review({
//       taskId,
//       review,
//       rating,
//     });

//     await newReview.save();
//     res.status(201).json({ success: true, data: newReview });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('taskId');
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createReview = async (req, res) => {
  const { taskId, userId, review, rating } = req.body;

  try {
    if (!taskId || !userId || !review || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: taskId, userId, review, rating',
      });
    }

    // Create and save the review
    const newReview = new Review({
      taskId,
      userId,
      review,
      rating,
    });

    const savedReview = await newReview.save();
    
    // Update Task with reviewId
    const task = await Task.findByIdAndUpdate(
      taskId,
      { reviewId: savedReview._id },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(201).json({
      success: true,
      data: savedReview,
    });

  } catch (error) {
    console.error('Error while submitting review:', error);
    res.status(500).json({ success: false, message: 'An error occurred, please try again later.' });
  }
};


// Get review by ID
export const getReviewById = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId).populate('taskId');
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update review
export const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { review, rating } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { review, rating },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
