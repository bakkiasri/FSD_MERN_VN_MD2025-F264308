let totalSeats = 120;
let bookedSeats = 78;

let AvailableSeats = totalSeats - bookedSeats;

console.log("Available Seats:", AvailableSeats);

if (AvailableSeats < 20) {
  console.log("Almost Full — only", AvailableSeats, "seats are available.");
} else if (AvailableSeats >= 20 && AvailableSeats <= 60) {
  console.log(
    "Moderate Availability —",
    AvailableSeats,
    "seats are available."
  );
} else {
  console.log(
    "Plenty of Seats Available —",
    AvailableSeats,
    "seats are available."
  );
}
