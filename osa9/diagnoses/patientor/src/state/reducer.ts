import { State } from './state';
import { Patient, DiagnoseEntry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'CHANGE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES_LIST';
      payload: DiagnoseEntry[];
    };

export const setDiagnoseList = (diagnoses: DiagnoseEntry[]): Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnoses
  };
};

export const changePatient = (patient: Patient): Action => {
  return {
    type: 'CHANGE_PATIENT',
    payload: patient
  };
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      console.log(action.payload);
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'CHANGE_PATIENT':
      return {
        ...state,
        patient: action.payload
      };
    case 'SET_DIAGNOSES_LIST':
      return {
        ...state,
        diagnoses: action.payload
      };
    default:
      return state;
  }
};
