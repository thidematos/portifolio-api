const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

exports.patchUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (req.body.toReadLater) {
    const codiceId = req.body.toReadLater;
    const includes = user.toReadLater.includes(codiceId);

    if (includes) {
      user.toReadLater = user.toReadLater.filter(
        (id) => String(id) !== String(codiceId)
      );
    }

    if (!includes) user.toReadLater.push(codiceId);
  }

  const updatedUser = await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
