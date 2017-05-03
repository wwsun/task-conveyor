'use strict';

class TaskRunner {
  /**
   * Init the task runner
   * @param {Array} tasks Tasks you want to execute
   * @param {Function} beforeEach The before hook you want to run before each task
   */
  init(tasks, beforeEach) {
    this.tasks = tasks;
    this.beforeEach = beforeEach;
  }

  /**
   * Execute the next task
   * @param {Object} err The error object
   * @param {Any} result The result of previous task
   * @return {Object} The result of current task
   */
  * next(err, result) {
    if (err) {
      throw err;
    }
    if (this.tasks.length) {
      const task = this.tasks.shift();
      if (task) {
        if (this.beforeEach) {
          yield executeTask(this.beforeEach);
        }
        return yield executeTask(task, result);
      }
    }
  }
}

function* executeTask(taskFunc, params = null) {
  if (!taskFunc && (!isFunction(taskFunc) || !isGeneratorFunction(taskFunc))) {
    throw Error('You should provide a function or generator function!');
  }
  if (isGeneratorFunction(taskFunc)) {
    return yield taskFunc(params);
  }
  if (isFunction(taskFunc)) {
    return taskFunc(params);
  }
}

function isGenerator(obj) {
  return typeof obj.next === 'function' && typeof obj.throw === 'function';
}

function isGeneratorFunction(obj) {
  const constructor = obj.constructor;
  if (!constructor) {
    return false;
  }
  if (constructor.name === 'GeneratorFunction' || constructor.displayName === 'GeneratorFunction') {
    return true;
  }
  return isGenerator(constructor.prototype);
}

function isFunction(func) {
  return typeof func === 'function';
}

module.exports = () => new TaskRunner();
