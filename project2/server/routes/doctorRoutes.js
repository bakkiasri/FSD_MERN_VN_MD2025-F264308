const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getApprovedDoctors,
  getDoctorById,
  getPendingDoctors,
  approveDoctor,
  addDoctorReview,
  deleteDoctor,
} = require("../controllers/doctorController");

/* ========= ADMIN ========= */
router.get("/pending", protect, getPendingDoctors);
router.put("/approve/:id", protect, approveDoctor);
router.delete("/:id", protect, deleteDoctor);

/* ========= PATIENT ========= */
router.post("/:id/review", protect, addDoctorReview);

/* ========= PUBLIC ========= */
router.get("/", getApprovedDoctors);
router.get("/:id", getDoctorById); // ⚠️ MUST BE LAST

module.exports = router;
