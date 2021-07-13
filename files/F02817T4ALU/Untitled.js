let a= String.fromCodePoint(9731, 9733, 9842, 0x2F804);

console.log(a);
// expected output: "☃★♲你"

console.log(a.length);
// this outputs: 5

for (var i = 0; i < a.length; i++) {
   console.log("#"+i+": "+a.codePointAt(i).toString(16));
}
// output:
// "#0: 2603"
// "#1: 2605"
// "#2: 2672"
// "#3: 2f804"
// "#4: dc04"