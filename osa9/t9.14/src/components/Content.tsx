import React from 'react';
import Part from './Part';
import { CoursePart } from '../index';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((course) => (
        <Part part={course} />
      ))}
    </div>
  );
};

export default Content;
