//
// --- Mock Date Helper ---

/**
 * MockDateHekper
 *
 * Provides a couple functions that allow you to mock Date objects. Call
 * MockDateHelper.mockDate() and pass in a string ISO-8601 value to mock that
 * date. Use MockDateHelper.restoreMockDate() to reset the Date object back to
 * standard Date object.
 *
 * NOTE: This does not return a mocked date object. This overrides the Date object
 * so when any code calls "new Date()" it will return a Date object for that time.
 *
 * @see: https://github.com/facebook/jest/issues/2234
 *
 * Usage:
 * import { MockDateHelper } from 'testHelpers';
 *
 * in beforeAll, beforeEach, or in individual tests, call MockDateHelper.mockDate('iso-date');
 * when done, in afterAll, afterEach, or in individual test, call MockDateHelper.restoreMockDate();
 *
 * if you are overriding `moment()` then use MockDateHelper.mockNow('iso-date'); and when done
 * use MockDateHelper.restoreMockNow();
 */

const RealDate = Date; // store reference to actual Date class

export const MockDateHelper = {
  mockDate: isoDate => {
    global.Date = class extends RealDate {
      // tslint:disable-next-line:readonly-array
      constructor(...args) {
        super();
        if (args.length) {
          return Reflect.construct(RealDate, args);
        }
        return new RealDate(isoDate);
      }
    };

    MockDateHelper.mockNow(isoDate);
  },

  mockNow: isoDate => {
    global.Date.now = jest.fn(() => new Date(isoDate).getTime());
  },

  restoreMockDate: () => {
    global.Date = RealDate;
    MockDateHelper.restoreMockNow(); // restore date after each test
  },

  restoreMockNow: () => {
    global.Date.now = RealDate.now;
  }
};
