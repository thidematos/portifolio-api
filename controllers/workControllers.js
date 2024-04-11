const Work = require('./../models/workModel');

exports.getWorks = async (req, res, next) => {
  try {
    const { page, sort, limit, fields, ...queryParams } = req.query;

    let queryStr = JSON.stringify(queryParams);

    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );

    let query = Work.find(queryStr);

    if (sort) {
      const sortBy = sort.replaceAll(',', ' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (fields) {
      const fieldsLimit = fields.replaceAll(',', ' ');
      query = query.select(fieldsLimit);
    } else {
      query = query.select('-__v');
    }

    const works = await query;

    res.status(200).json({
      status: 'sucess',
      results: works.length,
      data: {
        works,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Could not find any work',
    });
  }
};

exports.getWork = async (req, res, next) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) throw new Error('Could not find this work.');

    res.status(200).json({
      status: 'sucess',
      data: { work },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createWork = async (req, res, next) => {
  try {
    const {
      src,
      title,
      description,
      mainImg,
      subTitle,
      sections,
      finalDetails,
      colors,
      link,
    } = req.body;

    const newWork = await Work.create({
      src,
      title,
      description,
      mainImg,
      subTitle,
      sections,
      finalDetails,
      colors,
      link,
    });

    res.status(201).json({
      status: 'sucess',
      data: newWork,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.patchWork = async (req, res, next) => {
  try {
    const updatedWork = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedWork) throw new Error('Could not find this work');

    res.status(200).json({
      status: 'sucess',
      data: {
        work: updatedWork,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteWork = async (req, res, next) => {
  try {
    await Work.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.handleIdParam = (req, res, next, param) => {
  console.log(`Hello from the Router Param Middleware! Param: ${param}`);
  next();
};
