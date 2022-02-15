import calculator from "../calculator";

// Terminal -> npx; jest calculator


// each of the objects in the dataset array has the pieces of a math problem.
// "add": x + y
// "subtract": x - y
// "multiply": x * y
// "divide": x / y
let dataset = [
  {
    x: 5,
    y: 10,
    method: "add"
  },
  {
    x: 5,
    y: 10,
    method: "subtract"
  },
  {
    x: 5,
    y: 10,
    method: "multiply"
  },
  {
    x: 5,
    y: 10,
    method: "divide"
  }, {
    x: -12,
    y: 10000,
    method: "add"
  }, {
    x: -12,
    y: 10000,
    method: "subtract"
  }, {
    x: -12,
    y: 10000,
    method: "multiply"
  }, {
    x: -12,
    y: 10000,
    method: "divide"
  }, {
    x: 42,
    y: 0,
    method: "add"
  }, {
    x: 42,
    y: 0,
    method: "subtract"
  }, {
    x: 42,
    y: 0,
    method: "multiply"
  }, {
    x: 42,
    y: 0,
    method: "divide"
  }, {
    x: 81,
    y: 227,
    method: "add"
  }, {
    x: 81,
    y: 227,
    method: "subtract"
  }, {
    x: 81,
    y: 227,
    method: "multiply"
  }, {
    x: 81,
    y: 227,
    method: "divide"
  },
];

describe("Calculator", () => {

  for (let i = 0; i < dataset.length; i++) {
    test(`calculator should ${dataset[i].method} ${dataset[i].x} and ${dataset[i].y}`, () => {
      let methodName: string = dataset[i].method;
      let x: number = dataset[i].x;
      let y: number = dataset[i].y;

      let calculatorMethod: Function = calculator[methodName];

      switch (methodName) {
        case 'add':
          expect(calculatorMethod(x, y)).toBe(x + y);
          break;
        case 'subtract':
          expect(calculatorMethod(x, y)).toBe(x - y);
          break;
        case 'multiply':
          expect(calculatorMethod(x, y)).toBe(x * y);
          break;
        case 'divide':
          expect(calculatorMethod(x, y)).toBe(x / y);
          break;
      }
    })

  }
});

describe("stretch: not using switch - Calculator", () => {
  const checkCalculatorResultMethods = {
    add: (x: number, y: number): number => {
      return x + y;
    },
    subtract: (x: number, y: number): number => {
      return x - y;
    },
    multiply: (x: number, y: number): number => {
      return x * y;
    },
    divide: (x: number, y: number): number => {
      return x / y;
    }
  }

  for (let i = 0; i < dataset.length; i++) {
    test(`calculator should ${dataset[i].method} ${dataset[i].x} and ${dataset[i].y}`, () => {
      let methodName: string = dataset[i].method;
      let x: number = dataset[i].x;
      let y: number = dataset[i].y;

      let calculatorMethod: Function = calculator[methodName];
      let checkCalculatorResultMethod: Function = checkCalculatorResultMethods[methodName];

      expect(calculatorMethod(x, y)).toBe(checkCalculatorResultMethod(x, y));
    });
  }

});

