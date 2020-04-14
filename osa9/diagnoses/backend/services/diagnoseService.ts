import diagnosesData from '../data/diagnoses';
import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnosesData;

const getEntries = (): DiagnoseEntry[] => diagnoses;

export default {
  getEntries
};
