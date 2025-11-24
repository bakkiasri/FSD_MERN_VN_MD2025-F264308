// Create an array of 5 numbers and print:
// The sum
// The largest number

let Arr = [1, 2, 3, 4, 6];
let sum = 0;
for (let i = 0; i < Arr.length; i++) {
  sum = sum + Arr[i];
}
console.log("Sum of the array is", sum);
let largest = 0;
for (let i = 0; i < Arr.length; i++) {
  if (largest <= Arr[i]) {
    largest = Arr[i];
  }
}
console.log(largest, "is the largest number");
