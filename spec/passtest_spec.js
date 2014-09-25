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
    var pt = new PassTest();

    assertEqual('object', typeof pt);
    assertEqual('function', typeof pt.test);
  }});

  it('Can have minLength configured', function() { with(this) {
    var pt = new PassTest({
      minLength: {
        value: 5
      }
    });

    assert(pt);
    assert(pt.config);
    assert(pt.config.minLength);
    assert(pt.config.minLength.enabled);
    assertEqual(5, pt.config.minLength.value);
  }});

  it('Can have maxLength configured', function() { with(this) {
    var pt = new PassTest({
      maxLength: {
        value: 80
      }
    });

    assert(pt);
    assert(pt.config);
    assert(pt.config.maxLength);
    assert(pt.config.maxLength.enabled);
    assertEqual(80, pt.config.maxLength.value);
  }});

    it('Can have minLength disabled', function() { with(this) {
    var pt = new PassTest({
      minLength: {
        enabled: false
      }
    });

    assert(pt);
    assert(pt.config);
    assert(pt.config.minLength);
    assert(!pt.config.minLength.enabled);
  }});

  it('Can have maxLength disabled', function() { with(this) {
    var pt = new PassTest({
      maxLength: {
        enabled: false
      }
    });

    assert(pt);
    assert(pt.config);
    assert(pt.config.maxLength);
    assert(!pt.config.maxLength.enabled);
  }});

  it('Can have commonPasswords checking disabled', function() { with(this) {
    var pt = new PassTest({
      commonPasswords: {
        enabled: false
      }
    });

    assert(pt);
    assert(pt.config);
    assert(pt.config.commonPasswords);
    assert(!pt.config.commonPasswords.enabled);
  }});

  it('Can have lowerCase checking disabled', function() { with(this) {
    var pt = new PassTest({
      lowerCase: {
        enabled: false
      }
    });

    assert(pt);
    assert(pt.config);
    assert(pt.config.lowerCase);
    assert(!pt.config.lowerCase.enabled);
  }});

  it('Can have upperCase checking disabled', function() { with(this) {
    var pt = new PassTest({
      upperCase: {
        enabled: false
      }
    });

    assert(pt);
    assert(pt.config);
    assert(pt.config.upperCase);
    assert(!pt.config.upperCase.enabled);
  }});

  it('Can have specialChars checking disabled', function() { with(this) {
    var pt = new PassTest({
      specialChars: {
        enabled: false
      }
    });

    assert(pt);
    assert(pt.config);
    assert(pt.config.specialChars);
    assert(!pt.config.specialChars.enabled);
  }});

  it('Can have numbers checking disabled', function() { with(this) {
    var pt = new PassTest({
      numbers: {
        enabled: false
      }
    });

    assert(pt);
    assert(pt.config);
    assert(pt.config.numbers);
    assert(!pt.config.numbers.enabled);
  }});

  it('Complains about weak passwords', function() { with(this) {
    var pt = new PassTest();
    var weakPasswords = require('../lib/10k.js');

    var caughtAllPasswords = weakPasswords.every(function(password) {
      var result = pt.test(password);
      return !result.commonPasswordsTest && !result.passed;
    });

    assert(caughtAllPasswords);
  }});

  it("accepts custom string sets", function() { with(this) {
    var userValues = ["username123", "username123@example.com"];

    var pt = new PassTest({
      userValues: {
        enabled: true
      }
    });

    assert(pt.config.userValues.enabled);

    userValues.forEach(function(value) {
      var result = pt.test(value, userValues);
      assert(!result.userValuesTest);
      assert(!result.passed);
    });

    userValues.forEach(function(value) {
      var result = pt.test( "not" + value + "allowed", userValues);
      assert(!result.userValuesTest);
      assert(!result.passed);
    });
  }});
}});
