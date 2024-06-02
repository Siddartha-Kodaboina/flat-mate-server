const searchService = require('./search.service');

const searchCommunities = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await searchService.searchCommunities(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  searchCommunities
};
