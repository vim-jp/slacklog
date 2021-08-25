class Foo {
  play() {
    console.log('play')
  }
  pause() {
    console.log('pause')
  }
}
// これを tsc すると(target は ES5)
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.play = function () {
        console.log('play');
    };
    Foo.prototype.pause = function () {
        console.log('pause');
    };
    return Foo;
}());
// こうなる