import {
  NoSSNPatientEntry,
  newPatientEntry,
  Patient,
  Entry,
  NewEntry,
} from '../types';
import patientData from '../data/patients';

const getPatientsNoSSN = (): NoSSNPatientEntry[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const findPatient = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addNewEntry = (entry: NewEntry, id: string): Entry => {
  const patient = findPatient(id);
  const withId = {
    ...entry,
    id: Math.random() * 100000 + '',
  };
  patient?.entries.push(withId as Entry);
  return withId as Entry;
};

const addNewPatient = (newPatient: newPatientEntry): newPatientEntry => {
  const withId: Patient = {
    ...newPatient,
    id: Math.random() * 100000 + '',
  };
  patientData.push(withId);
  return withId;
};

export default {
  getPatientsNoSSN,
  addNewPatient,
  findPatient,
  addNewEntry,
};
