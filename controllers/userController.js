const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const Codice = require('./../models/codiceModel');

exports.patchUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const codiceId = req.body.toReadLater || req.body.gophed;
  const codice = await Codice.findById(codiceId);

  if (req.body.toReadLater) {
    const userIncludes = user.toReadLater.includes(codiceId);

    if (userIncludes) {
      user.toReadLater = user.toReadLater.filter(
        (id) => String(id) !== String(codiceId)
      );

      codice.toReadLater = codice.toReadLater.filter(
        (id) => String(id) !== String(user._id)
      );
    }

    if (!userIncludes) {
      codice.toReadLater.push(user._id);
      user.toReadLater.push(codiceId);
    }
  }

  if (req.body.gophed) {
    const userIncludes = user.gophed.includes(codiceId);

    if (userIncludes) {
      user.gophed = user.gophed.filter((id) => String(id) !== String(codiceId));

      codice.likes = codice.likes.filter(
        (id) => String(id) !== String(user._id)
      );
    }

    if (!userIncludes) {
      codice.likes.push(user._id);
      user.gophed.push(codiceId);
    }
  }

  const updatedUser = await user.save();
  await codice.save();

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.getUserReadLaters = catchAsync(async (req, res, next) => {
  const populatedUser = await req.user.populate('toReadLater');

  const codices = populatedUser.toReadLater;

  res.status(200).json({
    status: 'success',
    data: {
      codices: codices,
    },
  });
});
