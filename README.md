Pass-Test
=========

A tool for checking if a password satisfies basic rules, or apears on the list of
10,000 most common passwords (https://xato.net/passwords/more-top-worst-passwords/#.VCQkvh37vtQ)

Configuration
=============

You can configure pass-test to tweak values or disable some checks

|property       |requires                     |configureable|enabled by default|
|---------------|-----------------------------|-------------|------------------|
|minLength      |length >= 8                  |true         |true              |
|maxLength      |length <= 128                |true         |true              |
|commonPassword |password NOT IN 10k list     |false        |true              |
|lowerCase      |matches /[a-z]+/             |false        |true              |
|upperCase      |matches /[A-Z+]/             |false        |true              |
|specialChar    |matches /[\W_]+/             |false        |true              |
|numbers        |matches /\d+/                |false        |true              |
|userValues     |password NOT IN [] of strings|true         |false             |

userValues is a custom array of strings you can pass in to see if the password
matches or contains any of them. Useful for disallowing the account's email or username
from being counted as a valid password. It is passed as a second arg to `.test()`

```
var PassTest = require("PassTest");

// defaults
var pt = new PassTest();

// change minimum and maximum length bounds
var ptNewMinMax = new PassTest({
  minLength: {
    value: 12
  },
  maxLength: {
    value: 32
  }
});

// disable special char case
var ptNoSpecialCharCheck = new PassTest({
  specialChar: {
    enabled: false
  }
});

// disallow custom userValues
var ptNoUserValues = new PassTest({
  userValues: {
    enabled: true
  }
});
```

Usage
=====
```
var PassTest = require("PassTest");
var pt = new PassTest();

var badPassword = "password";
var goodPassword = "LaserUnicornHammerTime23!";

var resultSet1 = pt.test(badPassword);
console.log(resultSet1);
/*
  {
    // input satisfied all tests
    passed: false,

    // individual test results
    minLengthTest: true,
    maxLengthTest: true,
    commonPasswordsTest: false,
    lowerCaseTest: true,
    upperCaseTest: false,
    specialCharsTest: false,
    numbersTest: false
  }
*/

var resultSet2 = pt.test(goodPassword);
console.log(resultSet2);
/*
  {
    // input satisfied all tests
    passed: true,

    // individual test results
    minLengthTest: true,
    maxLengthTest: true,
    commonPasswordsTest: true,
    lowerCaseTest: true,
    upperCaseTest: true,
    specialCharsTest: true,
    numbersTest: true
  }
*/

var resultSet3 = pt.test("UsernameAsPasword", ["UsernameAsPassword"]);
console.log(resultSet3);
/*
  {
    passedTest: false,
    minLengthTest: true,
    maxLengthTest: true,
    commonPasswordsTest: true,
    lowerCaseTest: true,
    upperCaseTest: true,
    specialCharsTest: false,
    numbersTest: false,
    userValuesTest: false
  }
*/
```

Tests
=====
`npm test` to run unit tests
