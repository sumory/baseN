# baseN [![Build Status](https://travis-ci.org/sumory/baseN.png?branch=master)](https://travis-ci.org/sumory/baseN)  

[![NPM](https://nodei.co/npm/baseN.png)](https://npmjs.org/package/baseN)  

**baseN**: Encode number(max is Math.pow(2,53)) to base(2~62) hash string and decode it back. Customization is also supported.


## Install

```bash
$ npm install basen
```

## Usage

see [baseN.test.js](https://github.com/sumory/baseN/blob/master/test/baseN.test.js) for detail.

#### new BaseN()

Three ways to start with `baseN`

```
var baseN = new BaseN();//use default base array: letter(52) + numeric(10)
var baseN = new BaseN(15);//set radix 15, and use first 1~15 chars as base array
var baseN = new BaseN({
    base:[
        'a','b','c','d','e','0','1','2'
    ]
});//customize base array
```

#### encode()

convert number to hash string

```
var testCase = [
    [0, '0'],
    [1, '1'],
    [20, 'k'],
    [1000, 'g8'],
    [20130718, '1msV0']
];
var baseN = new BaseN();

testCase.forEach(function(item) {
    baseN.encode(item[0]);
});
```

#### decode()

convert hash string to the origin number

```
var testCase = [
    [0, '0'],
    [1, '1'],
    [20, 'k'],
    [1000, 'g8'],
    [20130718, '1msV0']
];
var baseN = new BaseN();

testCase.forEach(function(item) {
    baseN.decode(item[1]);
});
```

#### reBase()

change base array to a random base array

```
var baseN = new BaseN();
baseN.reBase(10);//select 10 chars from default base array as new base array
baseN.base.length == 10;//true

var testCase = [0, 1, 20, 1000, 1024, 123456789];
testCase.forEach(function(item) {
    baseN.decode(baseN.encode(item))==item;//true
});
```



## License

baseN is released under a **MIT License**:

    Copyright (C) 2013 by Sumory Wu <sumory.wu@gmail.com>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.