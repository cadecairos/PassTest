var JS  = require('jstest'),
    PassTest = require('../');

JS.Test.describe('PassTest', function() { with(this) {
  it('exists', function() { with(this) {
    assert(PassTest);
  }});

  it('is function', function() { with(this) {
    assertEqual('function', typeof PassTest);
  }});

  it('Builds with no options', function() { with(this) {
    var pws = new PassTest();

    assertEqual('object', typeof pws);
    assertEqual('function', typeof pws.test);
  }});

  it('Can have minLength configured', function() { with(this) {
    var pws = new PassTest({
      minLength: {
        value: 5
      }
    });

    assert(pws);
    assert(pws.config);
    assert(pws.config.minLength);
    assert(pws.config.minLength.enabled);
    assertEqual(5, pws.config.minLength.value);
  }});

  it('Can have maxLength configured', function() { with(this) {
    var pws = new PassTest({
      maxLength: {
        value: 80
      }
    });

    assert(pws);
    assert(pws.config);
    assert(pws.config.maxLength);
    assert(pws.config.maxLength.enabled);
    assertEqual(80, pws.config.maxLength.value);
  }});

    it('Can have minLength disabled', function() { with(this) {
    var pws = new PassTest({
      minLength: {
        enabled: false
      }
    });

    assert(pws);
    assert(pws.config);
    assert(pws.config.minLength);
    assert(!pws.config.minLength.enabled);
  }});

  it('Can have maxLength disabled', function() { with(this) {
    var pws = new PassTest({
      maxLength: {
        enabled: false
      }
    });

    assert(pws);
    assert(pws.config);
    assert(pws.config.maxLength);
    assert(!pws.config.maxLength.enabled);
  }});

  it('Can have commonPasswords checking disabled', function() { with(this) {
    var pws = new PassTest({
      commonPasswords: {
        enabled: false
      }
    });

    assert(pws);
    assert(pws.config);
    assert(pws.config.commonPasswords);
    assert(!pws.config.commonPasswords.enabled);
  }});

  it('Can have lowerCase checking disabled', function() { with(this) {
    var pws = new PassTest({
      lowerCase: {
        enabled: false
      }
    });

    assert(pws);
    assert(pws.config);
    assert(pws.config.lowerCase);
    assert(!pws.config.lowerCase.enabled);
  }});

  it('Can have upperCase checking disabled', function() { with(this) {
    var pws = new PassTest({
      upperCase: {
        enabled: false
      }
    });

    assert(pws);
    assert(pws.config);
    assert(pws.config.upperCase);
    assert(!pws.config.upperCase.enabled);
  }});

  it('Can have specialChars checking disabled', function() { with(this) {
    var pws = new PassTest({
      specialChars: {
        enabled: false
      }
    });

    assert(pws);
    assert(pws.config);
    assert(pws.config.specialChars);
    assert(!pws.config.specialChars.enabled);
  }});

  it('Can have numbers checking disabled', function() { with(this) {
    var pws = new PassTest({
      numbers: {
        enabled: false
      }
    });

    assert(pws);
    assert(pws.config);
    assert(pws.config.numbers);
    assert(!pws.config.numbers.enabled);
  }});

  it('Complains about weak passwords', function() { with(this) {
    var pws = new PassTest();
    var weakPasswords = require('../lib/10k.js');

    var caughtAllPasswords = weakPasswords.every(function(password) {
      var result = pws.test(password);
      return !result.commonPasswordsTest && !result.passed;
    });

    assert(caughtAllPasswords);
  }});

  it("accepts custom string sets", function() { with(this) {
    var customValues = ["ThisIsACustomString", "ThisIsACustomStringToo"];

    var pws = new PassTest({
      userValues: {
        enabled: true,
        value: customValues
      }
    });

    assert(pws.config.userValues.enabled);
    assert(Array.isArray(pws.config.userValues.value));
    assertEqual(2, pws.config.userValues.value.length);

    var caughtAllPasswords = customValues.every(function(password) {
      var result = pws.test(password);
      return !result.userValuesTest && !result.passed;
    });
  }});
}});
