// interface Stats {
//   weight: number;
//   height: number;
// }

// const parseArguments = (args: Array<string>): Stats => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
//     throw new Error('Provided values were not numbers');
//   } else {
//     return {
//       weight: Number(args[2]),
//       height: Number(args[3])
//     };
//   }
// };

const calculateBMI = (weight: number, height: number): string => {
  const heightInMeter = height > 3 ? height / 100 : height;
  const bmi = weight / Math.pow(heightInMeter, 2);
  if (bmi < 15) {
    return 'Very severely underweight';
  } else if (bmi < 16) {
    return 'Severely underweight';
  } else if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal';
  } else {
    return 'Overweight';
  }
};

export default calculateBMI;
