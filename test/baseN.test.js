var should = require('should');
var BaseN = require("../index.js");


describe('test with base 10', function() {
    var testCase = [
        [1, '1'],
        [0, '0'],
        [9007199254740992, '9007199254740992']
    ];
    var baseN = new BaseN(10);

    it('should encode success', function() {
        testCase.forEach(function(item) {
            baseN.encode(item[0]).should.equal(item[1]);
        });
    });

    it('should decode success', function() {
        testCase.forEach(function(item) {
            baseN.decode(item[1]).should.equal(item[0]);
        });
    });
});

describe('test with base 2', function() {
    var testCase = [
        [1, '1'],
        [0, '0'],
        [8, '1000'],
        [11, '1011'],
        [20, '10100']
    ];
    var baseN = new BaseN(2);

    it('should encode success', function() {
        testCase.forEach(function(item) {
            baseN.encode(item[0]).should.equal(item[1]);
        });
    });

    it('should decode success', function() {
        testCase.forEach(function(item) {
            baseN.decode(item[1]).should.equal(item[0]);
        });
    });
});

describe('test with base 60', function() {
    var testCase = [
        [1, '1'],
        [0, '0'],
        [1020, 'h0'],
        [1048572, '4Pgc'],
        [1073741821, '1mP1B1']
    ];
    var baseN = new BaseN(60);

    it('should encode success', function() {
        testCase.forEach(function(item) {
            baseN.encode(item[0]).should.equal(item[1]);
        });
    });

    it('should decode success', function() {
        testCase.forEach(function(item) {
            baseN.decode(item[1]).should.equal(item[0]);
        });
    });
});


describe('test with default base', function() {
    var testCase = [
        [0, '0'],
        [1, '1'],
        [20, 'k'],
        [1000, 'g8'],
        [20130718, '1msV0']
    ];
    var baseN = new BaseN();

    it('should encode success', function() {
        testCase.forEach(function(item) {
            baseN.encode(item[0]).should.equal(item[1]);
        });
    });

    it('should decode success', function() {
        testCase.forEach(function(item) {
            baseN.decode(item[1]).should.equal(item[0]);
        });
    });
});

describe('test with customized base', function() {
    var testCase = [
        [1, 'b'],
        [0, 'a'],
        [8, 'bd'],
        [1020, 'bdaea'],
        [1023, 'bdaed']
    ];
    var baseN = new BaseN({
        base: ['a', 'b', 'c', 'd', 'e']
    });

    it('should encode success', function() {
        testCase.forEach(function(item) {
            baseN.encode(item[0]).should.equal(item[1]);
        });
    });

    it('should decode success', function() {
        testCase.forEach(function(item) {
            baseN.decode(item[1]).should.equal(item[0]);
        });
    });
});

describe('test with wrong customized base', function() {
    it('should throw error', function() {
        try {
            var baseN = new BaseN({
                base: ['a', 'b', 'c', 'd', 'e'],
                radix: 10 //should be 5
            });
        } catch (e) {
            should.exist(e);
        }
    });
});


describe('test rebase', function() {
    var baseN = new BaseN();
    baseN.reBase(10);

    it('base length should be 10 after reBase', function() {
        baseN.base.length.should.equal(10);
    });

    var testCase2 = [0, 1, 20, 1000, 1024, 123456789];

    it('should encode and decode success after reBase', function() {
        testCase2.forEach(function(item) {
            baseN.decode(baseN.encode(item)).should.equal(item);
        });
    });
});

describe('test with a number > maxNum', function() {
    var baseN = new BaseN();

    it('result should be "-"', function() {
        baseN.encode(Math.pow(2, 54)).should.equal('-');
    });
});