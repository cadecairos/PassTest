var commonPasswordList = require("./lib/10k.js");

// polyfill String.contains - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains
if ( !String.prototype.contains ) {
  String.prototype.contains = function() {
    return String.prototype.indexOf.apply( this, arguments ) !== -1;
  };
}

var testMap = {
  minLength: function minLengthTest(password) {
    return password.length >= this.config.minLength.value;
  },
  maxLength: function maxLengthText(password) {
    return password.length <= this.config.maxLength.value;
  },
  commonPasswords: function commonPasswordsTest(password) {
    return commonPasswordList.indexOf(password) === -1;
  },
  lowerCase: function lowerCaseTest(password) {
    return password.match(/[a-z]+/) !== null;
  },
  upperCase: function upperCaseTest(password) {
    return password.match(/[A-Z]+/) !== null;
  },
  specialChars: function specialCharsTest(password) {
    return password.match(/[\W_]+/) !== null;
  },
  numbers: function numbersTest(password) {
    return password.match(/\d+/) !== null;
  },
  userValues: function userValuesTest(password) {
    return this.config.userValues.value.every(function(uv) {
      return !password.contains(uv);
    });
  }
};

module.exports = function PassTest(options) {
  options = options || {};

  var self = this;

  var config = this.config = {
    minLength: {
      enabled: true,
      value: 8
    },
    maxLength: {
      enabled: true,
      value: 128
    },
    commonPasswords: {
      enabled: true
    },
    lowerCase: {
      enabled: true
    },
    upperCase: {
      enabled: true
    },
    specialChars: {
      enabled: true
    },
    numbers: {
      enabled: true
    },
    userValues: {
      enabled: false
    }
  };

  var testArray = this.testArray = [];

  Object.keys(config).forEach(function(optName) {
    var opt = options[optName] || config[optName];
    if  ( typeof opt.enabled === 'boolean' ) {
      config[optName].enabled = opt.enabled;
    }
    if ( opt.value && opt.value !== config[optName].value  && typeof opt.value === typeof config[optName].value ) {
      config[optName].value = opt.value;
    }
    testArray.push({
      fn: testMap[optName].bind(self),
      name: testMap[optName].name
    });
  });

  this.test = function test(password, userValues) {
    var results = {
      passed:false
    };

    this.config.userValues.value = userValues || [];

    testArray.forEach(function(test) {
      var testResult = test.fn(password);
      results[test.name] = testResult;
      if ( !testResult ) {
        results.passed = false;
      }
    });
    return results;
  };
};
