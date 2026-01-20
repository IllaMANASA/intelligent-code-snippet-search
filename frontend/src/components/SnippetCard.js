import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Rating,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { rateSnippet, toggleFavorite } from "../services/snippetService";

function SnippetCard({ snippet }) {
  const [rating, setRating] = useState(snippet.rating || 0);
  const [favorite, setFavorite] = useState(snippet.isFavorite || false);

  const handleRatingChange = async (event, newValue) => {
    if (!newValue) return;

    try {
      const updated = await rateSnippet(snippet._id, newValue);
      setRating(updated.rating);
    } catch (error) {
      console.error("Rating failed");
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      const updated = await toggleFavorite(snippet._id);
      setFavorite(updated.isFavorite);
    } catch (error) {
      console.error("Favorite toggle failed");
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{snippet.title}</Typography>

          <IconButton onClick={handleFavoriteToggle} color="error">
            {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {snippet.description}
        </Typography>

        <Rating
          value={rating}
          onChange={handleRatingChange}
          precision={1}
        />

        <Box
          component="pre"
          sx={{
            backgroundColor: "#f5f5f5",
            p: 2,
            mt: 2,
            overflowX: "auto",
            fontSize: "0.85rem",
          }}
        >
          {snippet.code}
        </Box>
      </CardContent>
    </Card>
  );
}

export default SnippetCard;
