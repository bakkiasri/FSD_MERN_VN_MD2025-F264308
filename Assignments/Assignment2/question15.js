let expenses = [2000, 1500, 3500, 4000];

function calculateTotal(arr) {
  let total = 0;
  for (let amount of arr) {
    total += amount;
  }
  console.log("Total Expenses: ₹" + total);
}

calculateTotal(expenses);
