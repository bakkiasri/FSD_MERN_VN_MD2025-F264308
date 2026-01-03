const User = require("../models/User");

/* =====================================================
   GET APPROVED DOCTORS (PUBLIC + SEARCH)
   ===================================================== */
const getApprovedDoctors = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {
      role: "doctor",
      approved: true,
    };

    // 🔍 TEXT SEARCH (name OR specialization)
    if (search && search.trim() !== "") {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
      ];
    }

    const doctors = await User.find(query).select("-password");
    res.json(doctors);
  } catch (error) {
    console.error("Doctor search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   GET SINGLE DOCTOR PROFILE (PUBLIC)
   ===================================================== */
const getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findOne({
      _id: req.params.id,
      role: "doctor",
    })
      .select("-password")
      .populate("reviews.patient", "name");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    console.error("Get doctor error:", error);
    res.status(500).json({ message: "Failed to load doctor profile" });
  }
};

/* =====================================================
   GET PENDING DOCTORS (ADMIN ONLY)
   ===================================================== */
const getPendingDoctors = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const doctors = await User.find({
      role: "doctor",
      approved: false,
    }).select("-password");

    res.json(doctors);
  } catch (error) {
    console.error("Pending doctors error:", error);
    res.status(500).json({ message: "Failed to fetch pending doctors" });
  }
};

/* =====================================================
   APPROVE DOCTOR (ADMIN ONLY)
   ===================================================== */
const approveDoctor = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const doctor = await User.findById(req.params.id);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.approved = true;
    await doctor.save();

    res.json({ message: "Doctor approved successfully" });
  } catch (error) {
    console.error("Approve doctor error:", error);
    res.status(500).json({ message: "Failed to approve doctor" });
  }
};

/* =====================================================
   ADD REVIEW (PATIENT ONLY)
   ===================================================== */
const addDoctorReview = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "patient") {
      return res
        .status(403)
        .json({ message: "Only patients can add reviews" });
    }

    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res
        .status(400)
        .json({ message: "Rating and comment are required" });
    }

    const doctor = await User.findOne({
      _id: req.params.id,
      role: "doctor",
      approved: true,
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // 🚫 Prevent duplicate review
    const alreadyReviewed = doctor.reviews.find(
      (r) => r.patient.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You already reviewed this doctor" });
    }

    doctor.reviews.push({
      patient: req.user._id,
      rating: Number(rating),
      comment,
    });

    await doctor.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ message: "Failed to submit review" });
  }
};

/* =====================================================
   DELETE DOCTOR (ADMIN ONLY)
   ===================================================== */
const deleteDoctor = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const doctor = await User.findById(req.params.id);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await doctor.deleteOne();

    res.json({ message: "Doctor removed successfully" });
  } catch (error) {
    console.error("Delete doctor error:", error);
    res.status(500).json({ message: "Failed to delete doctor" });
  }
};

/* =====================================================
   EXPORTS
   ===================================================== */
module.exports = {
  getApprovedDoctors,
  getDoctorById,
  getPendingDoctors,
  approveDoctor,
  addDoctorReview,
  deleteDoctor,
};