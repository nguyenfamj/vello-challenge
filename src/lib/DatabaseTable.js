import fs from 'fs';
import { getCurrentHighestIndex } from '../utils/dbUtils.js';

const _tables = {};

export default class DatabaseTable {
  static getInstance(name, data) {
    if (!_tables[name]) _tables[name] = new DatabaseTable(name, data);

    return _tables[name];
  }

  constructor(name, data) {
    if (!name) throw new Error('Name must be specified');
    if (_tables[name]) {
      throw new Error(`DatabaseTable ${name} has already been initialized`);
    }

    const fileDir = `${process.cwd()}/data/${name}.json`;

    this.name = name;

    // For test purposes, we allow passing data.
    if (data) {
      this.data = data;
    } else {
      try {
        this.data = JSON.parse(fs.readFileSync(fileDir, 'utf-8'));
      } catch (err) {
        console.log('ERROR WHEN LOADING DATA!', `Does ${fileDir} exist?`, '\n');
        throw err;
      }
    }
  }

  /**
   * Add document to table.
   *
   * @param {document} document
   * @returns {document} the created document, including a new unique ID
   */
  putDocument(document) {
    const fileDir = `${process.cwd()}/data/${this.name}.json`;
    document['id'] = getCurrentHighestIndex(this.data) + 1;

    this.data.push(document);
    // Write the updated JSON data back to the file
    fs.writeFileSync(fileDir, JSON.stringify(this.data, null, 2), (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
        return;
      }
      console.log('New record added successfully!');
    });

    return document;
  }

  /**
   * Get selected document.
   *
   * @param {number} id
   * @returns {document | null} document or null if not found
   */
  getDocument(id) {
    const results = this.data.filter((item) => item['id'] === id);
    if (results.length === 0) {
      return null;
    }

    if (results.length > 1) {
      console.log(`There are more than 1 record with id ${id}, return the first found record`);
    }

    return results[0];
  }

  /**
   * Update selected document.
   *
   * @param {number} id
   * @param {*} document
   * @returns {boolean} whether the operation succeeded
   */
  updateDocument(id, document) {
    const fileDir = `${process.cwd()}/data/${this.name}.json`;
    const updateIndex = this.data.findIndex((item) => item['id'] === id);

    this.data[updateIndex] = { ...this.data[updateIndex], ...document };

    try {
      // Write the updated JSON data back to the file
      fs.writeFileSync(fileDir, JSON.stringify(this.data, null, 2), (err) => {
        if (err) {
          throw new Error(`Cannot write to the file: ${err}`);
        }
        console.log('Record updated successfully!');
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * Delete selected document.
   *
   * @param {number} id
   * @returns {boolean} whether the operation succeeded
   */
  deleteDocument(id) {
    const fileDir = `${process.cwd()}/data/${this.name}.json`;
    for (let i = this.data.length - 1; i >= 0; i--) {
      if (this.data[i].id === id) {
        this.data.splice(i, 1);
        break;
      }
    }

    try {
      // Write the updated JSON data back to the file
      fs.writeFileSync(fileDir, JSON.stringify(this.data, null, 2), (err) => {
        if (err) {
          throw new Error(`Cannot write to the file: ${err}`);
        }
        console.log('Record delete successfully!');
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * Get documents based on limit and offset.
   *
   * @param {number} limit
   * @param {number} offsetId
   * @returns {document[]}
   */
  indexDocuments(limit = 50, offsetId = 0) {
    return this.data.slice(offsetId, offsetId + limit);
  }
}
