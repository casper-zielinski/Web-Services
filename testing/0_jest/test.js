const { asyncResponse, condition, Point, throwsError } = require("./index.js");
const { sum } = require("./sum.js");

/** simple example test */
test("my first test with jest", () => {
  expect(true).toBeTruthy();
});

test("adds 1 + 2 equal 3'", () => {
  expect(sum(1, 2)).toBe(3);
});

/** example for test-block */
describe("JavaScript number casting", () => {
  /** `it` and `test` are the same */
  it("should cast correct to a number", () => {
    const text = "3.14159265359 is PI";
    const int = parseInt(text);
    const float = parseFloat(text);

    expect(int).toBe(3);
    expect(float).toBe(3.14159265359);
  });

  it("should cast correct to number or NaN", () => {
    const u = undefined;
    expect(+u).toBeNaN();
    expect(+"abc").toBeNaN();

    expect(+"1").toBe(1);
    expect(+"2.43").toBe(2.43);
  });
});

/** example for async testing */
describe("async testing", () => {
  /** you can use the `async` keyword in front of the test-callback function... */
  it("should test async function with 'async' keyword", async () => {
    const val = await asyncResponse();

    expect(val).toBeTruthy();
  });

  /** or pass a `done` callback, the test will seen as finished, after `done()` was called */
  it("should test async function with 'done' callback function", (done) => {
    asyncResponse().then((val) => {
      expect(val).toBeTruthy();
      done();
    });
  });
});

/** example for testing errors */
describe("testing Errors", () => {
  it("should throw an error", () => {
    // you need to wrap the function, that throws an error, otherwhise it will be thrown inside the test-function itself and creates an unexpectet error!
    expect(() => {
      throwsError();
    }).toThrow(Error("this is an error"));
  });
});

/** to pass a high coverage, don't forget to test all possible paths! */
describe("conditional testing", () => {
  test("true path", () => {
    const val = condition(true);

    expect(val).toBe("this is true");
  });

  test("false path", () => {
    const val = condition(false);

    expect(val).toBe(-1);
  });
});

/** example for class testing */
describe("Point testing", () => {
  let sut; // System Under Test... instance of

  // SETUP for EACH test (create new Point for each test)
  // alternate `beforeAll` will run just once for (describe) block
  beforeEach(() => {
    sut = new Point(4, -3);
  });

  it("should calculate correct distance from Origin", () => {
    const distance = sut.distance();

    expect(distance).toBe(5);
  });

  it("should calculate correct distance from other Point", () => {
    const newPoint = new Point(8, -3);
    const distance = sut.distance(newPoint);

    expect(distance).toBe(4);
  });

  it("should throw an error on wrong type", () => {
    expect(() => {
      sut.distance("not a point");
    }).toThrow(Error("invalid type"));
  });
});
