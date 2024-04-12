const express = require('express');

const router = express.Router();

app.route('/').get().post();

app.route('/:id').get().patch().delete();

module.exports = router;
