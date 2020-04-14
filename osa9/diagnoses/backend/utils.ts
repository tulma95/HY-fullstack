/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  newPatientEntry,
  Gender,
  NewEntry,
  HealthCheckRating,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthCareEntry,
} from './types';

const createError = (label: string, value: string): Error => {
  return new Error(`Incorrect or missing ${label}: ${value}`);
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isValidSSN = (ssn: string): boolean => {
  return /^\d{6}-[\d\w]{2,4}$/.test(ssn);
};

const isValidDateOfBirth = (dateOfBirth: string): boolean => {
  return /^\d{4}(-\d{2}){2}/.test(dateOfBirth);
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw createError('name', name);
  }

  return name;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isValidSSN(ssn) || !isString(ssn)) {
    throw createError('ssn', ssn);
  }
  return ssn;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (
    !dateOfBirth ||
    !isValidDateOfBirth(dateOfBirth) ||
    !isString(dateOfBirth)
  ) {
    throw createError('date of birth', dateOfBirth);
  }
  return dateOfBirth;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw createError('occupation', occupation);
  }

  return occupation;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw createError('gender', gender);
  }
  return gender;
};

export const toNewPatientEntry = (object: any): newPatientEntry => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw createError('description', description);
  }
  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date)) {
    throw createError('date', date);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw createError('specialist', specialist);
  }
  return specialist;
};

const parseString = (object: any, errorName: string): string => {
  if (!object || !isString(object)) {
    throw createError(errorName, object);
  }
  return object;
};

const parseHealthCheckrating = (object: string): HealthCheckRating => {
  if (!object || !isHealthCheckRating(object)) {
    throw createError('healthCheckRating', object);
  }
  return object;
};

export const toNewEntry = (object: any): NewEntry => {
  const base = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: object.diagnosisCodes,
  };

  switch (object.type) {
    case 'Hospital':
      return {
        ...base,
        type: object.type,
        discharge: {
          date: parseString(object.discharge.date, 'discharge date'),
          criteria: parseString(
            object.discharge.criteria,
            'discharge criteria'
          ),
        },
      } as HospitalEntry;

    case 'HealthCheck':
      return {
        ...base,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckrating(object.healthCheckRating),
      } as HealthCheckEntry;

    case 'OccupationalHealthcare':
      return {
        ...base,
        type: object.type,
        employerName: parseString(object.employerName, 'Employer name'),
        sickLeave: {
          endDate: parseString(object.sickLeave.endDate, 'Sickleave end date'),
          startDate: parseString(
            object.sickLeave.startDate,
            'Sickleave start date'
          ),
        },
      } as OccupationalHealthCareEntry;

    default:
      throw createError('type', object.type);
  }
};
