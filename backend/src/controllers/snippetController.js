const Snippet = require("../models/Snippet");
const { getAISuggestion } = require("../services/aiService");

// @desc    Search code snippets
// @route   GET /api/snippets/search
// @access  Public
const searchSnippets = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const snippets = await Snippet.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(5);

    let aiSuggestion = null;

    // Call AI only if useful
    if (snippets.length > 0 || snippets.length === 0) {
      aiSuggestion = await getAISuggestion(query, snippets);
    }

    res.status(200).json({
      count: snippets.length,
      snippets,
      aiSuggestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while searching snippets" });
  }
};


// @desc    Rate a snippet
// @route   PUT /api/snippets/:id/rate
// @access  Public
const rateSnippet = async (req, res) => {
  try {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    snippet.rating = rating;
    await snippet.save();

    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ message: "Error rating snippet" });
  }
};

// @desc    Toggle favorite
// @route   PUT /api/snippets/:id/favorite
// @access  Public
const toggleFavorite = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    snippet.isFavorite = !snippet.isFavorite;
    await snippet.save();

    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ message: "Error updating favorite" });
  }
};


module.exports = { searchSnippets, rateSnippet, toggleFavorite };
