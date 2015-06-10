var Lab = require('lab'),
  lab = exports.lab = Lab.script(),
  experiment = lab.experiment,
  test = lab.test,
  before = lab.before,
  expect = require('code').expect,
  PassTest = require('../'),
  weakPasswords = require('../lib/10k.js'),
  pt;

experiment('PassTest', function() {
  experiment('Default Settings', function() {
    before(function(done) {
      pt = new PassTest();
      done();
    });

    test('exists & is function', function(done) {
      expect(PassTest).to.exist();
      expect(PassTest).to.be.a.function();
      done();
    });

    test('Builds with no options', function(done) {
      expect(pt).to.be.an.object(done);
      expect(pt.test).to.be.a.function();
      done();
    });

    test('Disallows passwords on 10,000 most commonly used password list', function(done) {
      weakPasswords.forEach(function(password) {
        var result = pt.test(password);
        expect(result.strong).to.equal(false);
        expect(result.errors).to.contain('Password is on the 10,000 most commonly used password list');
      });
      done();
    });

    test('disallows short password', function(done) {
      var result = pt.test('2Short');

      expect(result.errors.length).to.equal(2);
      expect(result.errors).to.contain([
        'The password must be at least 8 characters long.',
        'The password must contain at least one special character.'
      ]);
      expect(result.isPassphrase).to.be.false();
      expect(result.strong).to.be.false();
      done();
    });

    test('disallows single class password', function(done) {
      var result = pt.test('pwqwenxhue');

      expect(result.errors.length).to.equal(3);
      expect(result.errors).to.contain([
        'The password must contain at least one uppercase letter.',
        'The password must contain at least one number.',
        'The password must contain at least one special character.'
      ]);
      expect(result.isPassphrase).to.be.false();
      expect(result.strong).to.be.false();
      done();
    });

    test('disallows two class password', function(done) {
      var result = pt.test('pwWGeWxBue');
      expect(result.errors.length).to.equal(2);
      expect(result.errors).to.contain([
        'The password must contain at least one number.',
        'The password must contain at least one special character.'
      ]);
      expect(result.isPassphrase).to.be.false();
      expect(result.strong).to.be.false();
      done();
    });

    test('allows three class password', function(done) {
      var result = pt.test('pwWGe!xBue');

      expect(result.strong).to.be.true();
      expect(result.optionalTestsPassed).to.equal(3);
      expect(result.isPassphrase).to.be.false();
      done();
    });

    test('allows four class password', function(done) {
      var result = pt.test('pw3Ge!xBue');

      expect(result.strong).to.be.true();
      expect(result.optionalTestsPassed).to.equal(4);
      expect(result.isPassphrase).to.be.false();
      done();
    });

    test('considers passwords longer than 20 characters to be passphrases, and strong by default', function(done) {
      var result = pt.test('golden monkey totem pole');

      expect(result.strong).to.be.true();
      expect(result.isPassphrase).to.be.true();
      expect(result.errors.length).to.equal(0);
      done();
    });
  });

  experiment('Custom Config', function() {
    before(function(done) {
      pt = new PassTest({
        allowPassphrases: true,
        maxLength: 32,
        minLength: 10,
        minPhraseLength: 15,
        minOptionalTestsToPass: 4
      });
      done();
    });

    test('disallows short password', function(done) {
      var result = pt.test('ninechars');

      expect(result.errors.length).to.equal(4);
      expect(result.errors).to.contain([
        'The password must be at least 10 characters long.'
      ]);
      expect(result.isPassphrase).to.be.false();
      expect(result.strong).to.be.false();
      done();
    });

    test('disallows single class password', function(done) {
      var result = pt.test('pwqwenxhue');

      expect(result.errors.length).to.equal(3);
      expect(result.errors).to.contain([
        'The password must contain at least one uppercase letter.',
        'The password must contain at least one number.',
        'The password must contain at least one special character.'
      ]);
      expect(result.isPassphrase).to.be.false();
      expect(result.strong).to.be.false();
      done();
    });

    test('disallows two class password', function(done) {
      var result = pt.test('pwWGeWxBue');
      expect(result.errors.length).to.equal(2);
      expect(result.errors).to.contain([
        'The password must contain at least one number.',
        'The password must contain at least one special character.'
      ]);
      expect(result.isPassphrase).to.be.false();
      expect(result.strong).to.be.false();
      done();
    });

    test('disallows three class password', function(done) {
      var result = pt.test('pwWGe!xBue');

      expect(result.errors.length).to.equal(1);
      expect(result.errors).to.contain([
        'The password must contain at least one number.'
      ]);
      expect(result.isPassphrase).to.be.false();
      expect(result.strong).to.be.false();
      done();
    });

    test('allows four class password', function(done) {
      var result = pt.test('pw3Ge!xBue');

      expect(result.strong).to.be.true();
      expect(result.optionalTestsPassed).to.equal(4);
      expect(result.isPassphrase).to.be.false();
      done();
    });

    test('considers passwords longer than 20 characters to be passphrases, and strong by default', function(done) {
      var result = pt.test('golden monkey totem pole');

      expect(result.strong).to.be.true();
      expect(result.isPassphrase).to.be.true();
      expect(result.errors.length).to.equal(0);
      done();
    });
  });
});
