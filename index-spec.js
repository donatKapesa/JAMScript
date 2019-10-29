var assert = require('chai').assert

var MyClass = require('./index')

var testObject = new MyClass('tom',0) // 0 is dummy in constructor


assert.equal(testObject.name, 'tom') //(input,output)

console.log('------------------------')
console.log('all tests passed')
console.log('------------------------')