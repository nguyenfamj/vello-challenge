import fs from 'fs';
import papa from 'papaparse';

export const convertCSVToJSON = async (filePath) => {
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();

  return new Promise((resolve) => {
    papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        resolve(result.data);
        console.log(`Converted ${result.data.length} records successfully`);
      },
    });
  });
};

/* 
This function work with csv format of delimiter ";" and the new line of \r?\n
*/
/* export const convertCSVToJSON = async (filePath) => {
  const csvFile = fs.readFileSync(filePath);
  // Convert csv rows into array
  const dataArray = csvFile.toString().split(/\r?\n/);
  const headers = dataArray[0].split(';');

  let data = [];

  for (let i = 1; i < dataArray.length - 1; i++) {
    let rowObject = {};
    const rowArray = dataArray[i].split(';');

    for (let j in headers) {
      rowObject[headers[j]] = rowArray[j];
    }

    data.push(rowObject);
  }

  console.log(`Converted ${data.length} records successfully`);
  return data;
}; */
