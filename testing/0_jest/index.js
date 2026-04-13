"use strict";

/**
 * Demo-function to throw an error
 */
const throwsError = () => {
  throw Error("this is an error");
};

/**
 * Demo-function for async behaviour
 * @returns {Promise<boolean>}
 */
const asyncResponse = async () => {
  return Promise.resolve(true);
};

/**
 * Demo-function for conditional behaviour
 * @param {boolen} yes to go through different paths
 * @returns {string | number}
 */
const condition = (yes) => {
  if (yes) {
    return "this is true";
  } else {
    return -1;
  }
};

class Point {
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  /**
   * Calculate the distance between two Points
   * https://www.calculatorsoup.com/calculators/geometry-plane/distance-two-points.php
   * 
   * distance = SQRT((x2 - x1)^2 + (y2 - y2)^2)
   * 
   * In JavaScript you can calculate the square of a number using `Math.pow(<NUMBER>, 2)`
   * To calculate the squareroot, use `Math.sqrt(<NUMBER>)`
   * 
   * @param {Point} otherPoint to calculate distance to. if no other point is given, it uses Point(0, 0)
   * @returns {number} the distance between this point and the other
   */
  distance(otherPoint) {
    if (!otherPoint) otherPoint = new Point();
    if (!(otherPoint instanceof Point)) throw Error("invalid type");

    const dx = Math.abs(this._x - otherPoint._x);
    const dy = Math.abs(this._y - otherPoint._y);

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
}


module.exports = { asyncResponse, condition, Point, throwsError };
