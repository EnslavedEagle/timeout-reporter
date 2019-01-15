const fs = require('fs');
const moment = require('moment');
const path = require('path');

const error = (error) => {
  console.error('Error!', error);
};

const filename = (() => {
  const date = new Date();
  return `report_${moment().format('DD-MM-YYYY')}`;
})();

const directory = 'reports';
const reportsPath = path.resolve(__dirname, directory);

if (!fs.existsSync(reportsPath)) {
  fs.mkdirSync(reportsPath);
}

const stream = fs.createWriteStream(path.join(reportsPath, `${filename}.txt`));

stream.on('open', () => {
  console.log('Report will be saved to ', stream.path);
});

const report = (text) => new Promise((resolve, reject) => {
  console.log(text);
  stream.write(text, (error) => {
    if (error) {
      reject(error);
      return;
    }
    resolve();
  });
});

module.exports = report;