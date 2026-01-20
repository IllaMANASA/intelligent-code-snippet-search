const express = require("express");
const router = express.Router();
const {
    searchSnippets,
    rateSnippet,
    toggleFavorite,
} = require("../controllers/snippetController");

// search snippets
 router.get("/search", searchSnippets);

// rate snippet 
router.put("/:id/rate", rateSnippet);

// favorite snippet 
router.put("/:id/favorite", toggleFavorite);
   
module.exports = router;