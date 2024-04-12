const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Review = require('./../models/reviewsModel');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Review.find({}), req.query);

  features.filter().sort().selectFields().paginate();

  const reviews = await features.mongoQuery;

  res.status(200).json({
    status: 'sucess',
    data: {
      review: reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) next(new AppError('Could not find this review', 404));

  res.status(200).json({
    status: 'sucess',
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { review, rating, user, work, projectRequest } = req.body;

  const newReview = await Review.create({
    review,
    rating,
    user,
    work,
    projectRequest,
  });

  res.status(201).json({
    status: 'sucess',
    data: {
      review: newReview,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedReview) next(new AppError('Could not find any review', 404));

  res.status(200).json({
    status: 'sucess',
    data: {
      review: updatedReview,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  await Review.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
