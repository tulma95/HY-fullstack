import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      Number of exercises{' '}
      {courseParts.reduce((sum, course) => sum + course.exerciseCount, 0)}
    </div>
  );
};

export default Total;
