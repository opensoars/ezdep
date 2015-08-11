/**
 * @module ezdep
 */

/**
 * Ezdep constructor function.
 * @constructor
 * @public
 * @param {object} conf - Ezdep config (both dependency data and config)
 * @return {object} this - Allows chain calls
 */
var Ezdep = function (conf) {
  /** Errors array, fills up if we don't stop on a single failed dependency */
  //this.errs = [];

  /** Module config, contains stuff like; use_throw: true */
  var ezdep_conf = {};
  /**
   * Actual dependency config, contains stuff like;
   * name: { data: 'Sam', type: 'string' }
   */
  var dep_conf = {};

  // Sets key value data pairs to this scope, so we emulate the Ezdep instance
  // to be a plain object. `new Ezdep({ url: { data: 'google.com' } })`
  // results in `{ url: 'google.com' }`. When a key value pair isn't dependency
  // data, remove it from conf so we can `setProto({ dep_conf: conf })`
  for (var key in conf) {
    if (conf.hasOwnProperty(key)) {
      if (!conf[key].data) {
        ezdep_conf[key] = conf[key];
        delete conf[key];
      }
      else {
        this[key] = conf[key].data;
      }
    }
  }

  this.setProto({
    dep_conf: conf,
    ezdep_conf: ezdep_conf
  });

  return this;
};

/**
 * @TODO
 */
Ezdep.prototype.checkDeps = function () {
  var dep_conf = this.dep_conf;

  if (!dep_conf) {
    this.err('@checkDeps: !dep_conf');
  }

  for (var key in dep_conf) {
    if (dep_conf.hasOwnProperty(key)) {
      this.checkSingleDep(key, dep_conf[key]);
      // @TODO handle succes and fail
    }
  }
};

/**
 * @param {string} single_key - @TODO
 * @param {object} single_value - @TODO
 */
Ezdep.prototype.checkSingleDep = function (single_key, single_value) {
  var self = this;

  function is(type, data) {
    return self.is.call(self, type, data);
  }

  // @TODO internal ezdep error
  if (!single_key) {}
  if (!single_value) {}

  var data = single_value.data || undefined,
      type = single_value.type || undefined;

  // @TODO handle succes and fail
  if (type) {
    if (is(type, data)) {
      console.log('Type check passed for:', single_key);
    }
    else {
      console.log('Type check NOT passed for:', single_key);
    }
  }
  // @TODO handle succes and fail


  var customs = single_value.customs;

  if (customs) {
    for (var custom_key in customs) {
      if (customs.hasOwnProperty(custom_key) &&
          self.isFunction(customs[custom_key])) {
        var custom_results = customs[custom_key].call(self, data);

        if (custom_results.passed) {
          console.log('passed custom');
        }
        else {
          console.log('not passed custom');
        }
      }
    }
  }

};

/**
 * @param {string} - Data type to check for
 * @param {any} - Data of which the type gets examined
 */
Ezdep.prototype.is = function (type, data) {
  // @TODO
  if (!type) {}
  if (!data) {}

  var typeChecker = this[
    'is' + (type.charAt(0).toUpperCase() + type.slice(1))
  ];

  return (
    typeChecker && typeof typeChecker === 'function'
      ? typeChecker(data)
      : false
  );
};
/**
 * @TODO
 */
Ezdep.prototype.isArray = function (data) {
  return (
    data instanceof Array &&
    typeof data === 'object' &&
    data.length !== undefined
  );
};
/**
 * @TODO
 */
Ezdep.prototype.isString = function (data) {
  return (
    typeof data === 'string' &&
    data.length !== undefined
  );
};
/**
 * @TODO
 */
Ezdep.prototype.isFunction = function (data) {
  return (typeof data === 'function');
};
/**
 * @TODO
 */
Ezdep.prototype.isBoolean = function (data) {
  return (typeof data === 'boolean');
};


/**
 * Sets `this.__proto__` key value pairs.
 * @param {object} to_set - Key value pairs to set to this.__proto__
 */
Ezdep.prototype.setProto = function (to_set) {
  for (var key in to_set) {
    if (to_set.hasOwnProperty(key)) {
      this.__proto__[key] = to_set[key];
    }
  }
};

/**
 * Helper method that throws errors with given messages
 * @param {string} msg - Error message to append to default error message
 */
Ezdep.prototype.err = function (msg) {
  throw new Error('Internal ezdep error\n' + msg);
};

Ezdep.prototype.fail = function (msg) {
  
  var err_str = 'FAIL: ' + msg;

  if (this.ezdep_conf.use_throw) {
    throw new Error(err_str);
  }

  else {
    console.log(err_str);
  }

};



// Public API
module.exports = {
  Constructor: Ezdep
};