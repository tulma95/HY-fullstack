import React from 'react';
import { CoursePart } from '../index';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Base: React.FC<{ part: CoursePart }> = ({ part }) => {
  return (
    <div>
      {part.name}
      {part.exerciseCount}
    </div>
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <Base part={part} />
        </div>
      );

    case 'Using props to pass data':
      return (
        <div>
          <Base part={part} />
        </div>
      );

    case 'Deeper type usage':
      return (
        <div>
          <Base part={part} />
        </div>
      );

    case 'Fourth course':
      return (
        <div>
          <Base part={part} />
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
