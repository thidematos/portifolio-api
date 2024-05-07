const fs = require('fs');
const AppError = require('./../utils/appError');

function deleteFile(fileName, next) {
  fs.unlink(`client/public/${fileName}`, (err) => {
    if (err)
      return next(
        new AppError('Não foi encontrado um arquivo antigo para excluir.')
      );
    console.log('Sucess deleted!');
  });
}

module.exports = deleteFile;
