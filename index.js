var owasp = require("owasp-password-strength-test");
var commonPasswordList = require("./lib/10k.js");

owasp.tests.required.push(function(password) {
  if ( commonPasswordList.indexOf(password) !== -1 ) {
    return "Password is on the 10,000 most commonly used password list";
  }
});

module.exports = function PassTest(options) {
  options = options || {};

  owasp.config({
    allowPassphrases: options.allowPassphrases || true,
    maxLength: options.maxLength || 256,
    minLength: options.minLength || 8,
    minPhraseLength: options.minPhraseLength || 20,
    minOptionalTestsToPass: options.minOptionalTestsToPass || 3
  });

  this.test = owasp.test.bind(owasp);
};
