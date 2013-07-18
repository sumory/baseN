function BaseN(options) {
    this.defaultBase = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
        "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"
    ]; //default base array: letter(52) + numeric(10)

    //max num to encode
    //The JavaScript number format allows you to exactly represent all integers 
    //between −9007199254740992  and 9007199254740992
    this.maxNum = Math.pow(2, 53);

    if (!isNaN(options)) { //if options is numeric
        if (options > 62 || options < 2) {
            throw new Error('Error param: if the param is numeric, it must be between 2 and 62.');
        } else {
            this.base = this.defaultBase.slice(0, options);
            this.radix = options;
        }
    } else {
        options = options || {};
        if (options.base) {
            if (options.radix && options.base.length != options.radix) {
                throw new Error('Error param: radix must be equal to the length of base array.');
            }
        }
        this.base = options.base || this.defaultBase;
        this.radix = options.radix ? options.radix : this.base.length;
    }
}

function getArrayItems(arr, num) {

}

BaseN.prototype.reBase = function(radix) {
    if (radix > this.defaultBase.length) {
        throw new Error('Error param: radix must be <= 62.');
    }
    var newBase = [];
    var tempArray = [];
    var defaultArray = this.defaultBase;
    for (var index in defaultArray) {
        tempArray.push(defaultArray[index]);
    }

    for (var i = 0; i < radix; i++) {
        if (tempArray.length > 0) {
            var arrIndex = Math.floor(Math.random() * tempArray.length);
            newBase.push(tempArray[arrIndex]);
            tempArray.splice(arrIndex, 1);
        } else {
            break;
        }
    }
    this.base = newBase;
    this.radix = radix;
};

BaseN.prototype.encode = function(num) {
    num = Number(num);
    if (num > this.maxNum) {
        return '-';
    }

    var arr = [],
        result = '',
        negative = false;

    if (num == 0) {
        return this.base[0];
    }
    if (num < 0) {
        negative = true;
        num = -num;
    }

    while (num) {
        arr.push(this.base[num % this.radix]);
        num = Math.floor(num / this.radix);
    }

    result = arr.reverse().join('');
    return negative ? '-' + result : result;
}

BaseN.prototype.decode = function(str) {
    var result = 0,
        negative = false;

    if (str.indexOf('-') === 0) {
        negative = true;
        str = str.slice(1);
    }

    for (var index = 0; index < str.length; index++) {
        var c = str.charAt(index);
        var tableIndex = this.base.indexOf(c);
        result += tableIndex * Math.pow(this.radix, str.length - index - 1)
    }

    return Number(negative ? '-' + result : result);
}

module.exports = BaseN;