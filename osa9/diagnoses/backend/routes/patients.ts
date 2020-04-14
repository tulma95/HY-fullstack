import express from 'express';
import patientService from '../services/patientsService';
import { toNewPatientEntry, toNewEntry } from '../utils';
const route = express.Router();

route.get('/', (_req, res) => {
  res.send(patientService.getPatientsNoSSN());
});

route.get('/:id', (req, res) => {
  const foundPatient = patientService.findPatient(req.params.id);
  res.json(foundPatient);
});

route.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addNewEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

route.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addNewPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default route;
