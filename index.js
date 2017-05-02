'use strict';


class TaskRunner {
  init(tasks, beforeEach) {
    this.tasks = tasks;
    this.beforeEach = beforeEach;
  }

  * next(err, result) {
    if (err) {
      throw err;
    }
    if (this.tasks.length) {
      const task = this.tasks.shift();
      if (task) {
        if (this.beforeEach) {
          // TODO: beforeEach 是函数还是 generator
          yield this.beforeEach();
        }
        return yield task(result);
      }
    }
  }
}

module.exports = () => new TaskRunner();
