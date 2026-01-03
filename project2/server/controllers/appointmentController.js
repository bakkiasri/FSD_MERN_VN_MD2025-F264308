const Appointment = require("../models/Appointment");

// PATIENT → BOOK APPOINTMENT
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    // Use req.user._id, matching schema field names
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date,
      time
    });

    res.status(201).json({
      message: "Appointment booked",
      appointment
    });
  } catch (error) {
    console.error("Book Appointment Error:", error.message); // <-- Log full error
    res.status(500).json({ error: error.message });
  }
};

// PATIENT → VIEW OWN APPOINTMENTS
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id
    }).populate("doctor", "name specialization");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DOCTOR → VIEW APPOINTMENTS
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user._id
    }).populate("patient", "name email");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DOCTOR → APPROVE / REJECT
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    res.json({
      message: "Appointment updated",
      appointment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATIENT → CANCEL
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    appointment.status = "cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};