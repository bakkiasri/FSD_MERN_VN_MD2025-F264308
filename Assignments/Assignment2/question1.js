// Write a program that takes a number and prints whether it is even/odd,
// positive/negative/zero, and whether it is divisible by both 3 and 5.

let num = 5;

if (num % 2 == 0) {
  console.log(num, "is even number");
} else {
  console.log(num, "is odd number");
}
if (num == 0) {
  console.log(num, "is zero");
} else if (num < 0) {
  console.log(num, "is negative number");
} else {
  console.log(num, "is positive number");
}

if (num % 3 == 0 && num % 5 == 0) {
  console.log(num, "is divisible by both 3 and 5");
} else {
  console.log("The number is NOT divisible by both 3 and 5.");
}
