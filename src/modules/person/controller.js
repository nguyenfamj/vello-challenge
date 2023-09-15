import database from '../../lib/database.js';

const personTable = database.getTable('person');

const getPersonsWithIndex = async (req, res) => {
  // Set default value in case limit and offset is missing in the request
  const limit = req.query.limit ? parseInt(req.query.limit) : 50;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  const result = personTable.indexDocuments(limit, offset);

  return res.status(200).json({ status: 'success', data: result });
};

const getPersonById = async (req, res) => {
  const id = parseInt(req.params.id);

  const foundPerson = personTable.getDocument(id);

  if (!foundPerson) {
    return res.status(404).json({ status: 'fail', data: { title: 'Cannot find the person' } });
  }

  return res.status(200).json({ status: 'success', data: foundPerson });
};

const createPerson = async (req, res) => {
  // Might have some problem when the body contains more fields than needed
  const savedPerson = personTable.putDocument({ ...req.body });

  if (!savedPerson) {
    return res.status(500).json({ status: 'fail', data: { title: 'Cannot create new person' } });
  }

  return res.status(200).json({ status: 'success', data: savedPerson });
};

const updatePersonById = async (req, res) => {
  const id = parseInt(req.params.id);

  const updateStatus = personTable.updateDocument(id, req.body);

  if (!updateStatus) {
    return res
      .status(500)
      .json({ status: 'fail', data: { title: 'Cannot update the person information' } });
  }

  return res
    .status(200)
    .json({ status: 'success', data: { title: 'Update the person successfully' } });
};

const deletePersonById = async (req, res) => {
  const id = parseInt(req.params.id);

  const deleteStatus = personTable.deleteDocument(id);

  if (!deleteStatus) {
    return res
      .status(500)
      .json({ status: 'fail', data: { title: 'Cannot delete the person information' } });
  }

  return res.status(200).json({ status: 'success', data: { title: 'Person data deleted' } });
};

export { getPersonsWithIndex, createPerson, getPersonById, deletePersonById, updatePersonById };
