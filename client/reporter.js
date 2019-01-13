const fs = require('fs');
const moment = require('moment');
const path = require('path');

const error = (error) => {
  console.error('Error!', error);
};

const getFilename = () => {
  const date = new Date();
  return `report_${moment().format('DD-MM-YYYY')}`;
};

class Reporter {  
  constructor() {
    const filename = getFilename();
    this.dirname = 'reports';
    this.directory = path.resolve(__dirname, this.dirname);
    this.filePath = path.resolve(this.directory, `${filename}.txt`);

    if (!fs.existsSync(this.directory)) {
      fs.mkdirSync(this.directory);
    }

    this.stream = fs.createWriteStream(this.filePath);

    this.stream.on('open', () => {
      console.log('File Stream opened.');
    });
    
    this.stream.on('close', () => {
      console.log('File Stream closed.');
    })
  }
}

module.exports = Reporter;