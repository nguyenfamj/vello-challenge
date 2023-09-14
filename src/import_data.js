import fs from 'fs';
import { convertCSVToJSON } from './utils/csvToJSONConverter.js';
import { dirname } from 'path';

const DATA_SOURCE_PATH = 'data-sources/person.csv';
const IMPORTED_DATA_PATH = 'data/person.json';

convertCSVToJSON(DATA_SOURCE_PATH).then((result) => {
  fs.mkdir(dirname(IMPORTED_DATA_PATH), { recursive: true }, (error) => {
    if (error) console.log(error);

    fs.writeFileSync(IMPORTED_DATA_PATH, JSON.stringify(result, null, 2));
    console.log(`Imported CSV file into JSON successfully`);
  });
});

/**
 * TODO
 *
 * Import the data from ./data-sources/person.csv to ./data/person.json
 * It's up to you to choose how you would like to do that.
 */
