Pass-Test
=========

A tool for checking if a password satisfies basic rules (using [owasp-password-strength-test](https://npmjs.org/package/owasp-password-strength-test), or appears on the list of
10,000 most common passwords (https://xato.net/passwords/more-top-worst-passwords/#.VCQkvh37vtQ)

Configuration
=============

You can configure pass-test to fit your password policy

|property              |Description                                                                  |Default|
|----------------------|-----------------------------------------------------------------------------|-------|
|maxLength             |Maximum password length                                                      |256    |
|minLength             |Minimum password length                                                      |8      |
|minPhraseLength       |Minimum length to be considered a passphrase                                 |20     |
|minOptionalTestsToPass|Passwords must pass at least this many optional tests to be considered strong|3      |
|allowPassphrases      |If false, passphrases are no longer exempt from optional tests               |true   |

Usage
=====
```
var PassTest = require("PassTest");
var pt = new PassTest();

var badPassword = "password";
var goodPassword = "LaserUnicornHammerTime23!";

var result = pt.test(badPassword);
console.log(resultSet1);
/*
{
  // details of required and optional tests passed
  "errors": [
    "Password is on the 10,000 most commonly used password list",
    "The password must contain at least one uppercase letter.",
    "The password must contain at least one number.",
    "The password must contain at least one special character."
  ],
  "failedTests": [
    3,
    5,
    6,
    7
  ],
  "passedTests": [
    0,
    1,
    2,
    4
  ],
  "isPassphrase": false,
  // failed overall
  "strong": false,
  "optionalTestsPassed": 1
}
*/

var resultSet2 = pt.test(goodPassword);
console.log(resultSet2);
/*
{
  "errors": [],
  "failedTests": [],
  "passedTests": [
    0,
    1,
    2,
    3
  ],
  "isPassphrase": true,
  "strong": true,
  "optionalTestsPassed": 0
}
*/
```

Tests
=====
`npm test` to run unit tests
