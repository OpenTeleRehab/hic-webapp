import randomSeed from './random';

export const defaultColumnValues = {
  gender: ['Male', 'Female'],
  name: [
    'gender'
  ]
};

export const globalSalesValues = {
  id: [
    '0001', '0002', '0003', '0004', '005'],
  firstName: ['Albert', 'Blaise', 'Caroline', 'Dorothy', 'Max'],
  lastName: ['Einstein', 'Pascal', 'Herschel', 'Hodgkin', 'Born'],
  email: ['admin1@gmail.com', 'admin2@gmail.com', 'admin3@gmail.com', 'admin4@gmail.com', 'admin5@gmail.com'],
  status: ['Active', 'Active', 'Active', 'Active', 'Inactive'],
  lastLogin: ['27/04/2020', '27/04/2020', '27/04/2020', '27/04/2020', '27/04/2020'],
  action: ['Actions', 'Actions', 'Actions', 'Actions', 'Actions']
};

export function generateRows ({
  columnValues = defaultColumnValues,
  length,
  random = randomSeed(329972281)
}) {
  const data = [];
  const columns = Object.keys(columnValues);

  for (let i = 0; i < length; i += 1) {
    const record = {};

    columns.forEach((column) => {
      let values = columnValues[column];

      if (typeof values === 'function') {
        record[column] = values({ random, index: i, record });
        return;
      }

      while (values.length === 2 && typeof values[1] === 'object') {
        values = values[1][record[values[0]]];
      }

      const value = values[Math.floor(random() * values.length)];
      if (typeof value === 'object') {
        record[column] = { ...value };
      } else {
        record[column] = value;
      }
    });

    data.push(record);
  }

  return data;
}
