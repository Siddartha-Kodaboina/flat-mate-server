const openingService = require('./opening.service');

const getUserCurrentOpenings = async (req, res) => {
  const userId = req.params.userId;
  try {
    const openings = await openingService.getUserCurrentOpenings(userId);
    res.status(200).json(openings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserClosedOpenings = async (req, res) => {
  const userId = req.params.userId;
  try {
    const openings = await openingService.getUserClosedOpenings(userId);
    res.status(200).json(openings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserCurrentOpenings,
  getUserClosedOpenings
};
