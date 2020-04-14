interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// interface Input {
//   days: Array<number>;
//   target: number;
// }

export const isNumber = (num: number): boolean => !isNaN(num);

// export const parseArgumentsCalculator = (args: Array<string>): Input => {
//   if (args.length < 2) throw new Error('Not enough arguments');

//   const argsToNumbers = args.slice(2).map(Number);

//   if (!argsToNumbers.every(isNumber)) {
//     throw new Error('All inputs were not numbers');
//   }
//   return {
//     days: argsToNumbers.slice(0, -1),
//     target: [...argsToNumbers].slice(-1)[0]
//   };
// };

const generateDescription = (rating: number): string => {
  switch (rating) {
    case 3:
      return 'Very good job';
    case 2:
      return 'not too bad but could be better';
    case 1:
      return 'did you even try??';
    default:
      throw Error('Invalid rating');
  }
};

const calculateRating = (average: number, target: number): number => {
  const percentage = average / target;
  if (percentage > 1) {
    return 3;
  } else if (percentage >= 2 / 3) {
    return 2;
  } else {
    return 1;
  }
};

const totalHours = (days: Array<number>): number => {
  return days.reduce((prev, curr) => prev + curr, 0);
};

const calculateTrainingDays = (days: Array<number>): number => {
  const isNotZero = (hours: number): boolean => hours !== 0;
  return days.filter(isNotZero).length;
};

const calculate = (days: Array<number>, target: number): ExerciseStats => {
  const periodLength = days.length;
  const trainingDays = calculateTrainingDays(days);
  const average = totalHours(days) / periodLength;
  const rating = calculateRating(average, target);
  const ratingDescription = generateDescription(rating);
  return {
    periodLength,
    trainingDays,
    success: target <= average,
    rating,
    ratingDescription,
    target,
    average
  };
};

export default calculate;

// try {
//   const { days, target } = parseArgumentsCalculator(process.argv);
//   console.log(calculate(days, target));
// } catch (error) {
//   console.log('Error', error.message);
// }
