const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus
} = require("../controllers/appointmentController");

router.post("/", protect, bookAppointment);
router.get("/patient", protect, getPatientAppointments);
router.get("/doctor", protect, getDoctorAppointments);
router.put("/:id/status", protect, updateAppointmentStatus);

module.exports = router;