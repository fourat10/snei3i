const express = require('express');
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} = require('../controllers/reservation.controller');
//reservation
// Create a new reservation
router.post('/', createReservation);

// Get all reservations
router.get('/', getAllReservations);

// Get a single reservation by ID
router.get('/:id', getReservationById);

// Update a reservation by ID
router.put('/:id', updateReservation);

// Delete a reservation by ID
router.delete('/:id', deleteReservation);




module.exports = router;



