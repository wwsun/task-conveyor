'use strict';

const createRunner = require('../');
const runner = createRunner();

describe('test/index.test.js', () => {
  describe('test runner', () => {
    it('should #run tasks', function* () {

      function* task1(before) {
        console.log(before);
        yield runner.next(null, 1);
      }

      function* task2(before) {
        console.log(before);
        yield runner.next(null, 2);
      }

      function* task3(before) {
        console.log(before);
      }

      function beforeEach() {
        console.log('>>>> write database');
      }

      const tasks = [ task1, task2, task3 ];
      runner.init(tasks, beforeEach);
      yield runner.next(null, 'init');
    });
  });
});
