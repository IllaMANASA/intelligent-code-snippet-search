import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { searchSnippets } from "../services/snippetService";
import SnippetCard from "../components/SnippetCard";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError("");
    setSnippets([]);
    setAiSuggestion("");

    try {
      const data = await searchSnippets(query);
      setSnippets(data.snippets || []);
      setAiSuggestion(data.aiSuggestion || "");
    } catch (err) {
      setError("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Intelligent Code Snippet Search
      </Typography>

      <Box display="flex" gap={2} mb={4}>
        <TextField
          fullWidth
          label="Search code snippets"
          placeholder="Try: jwt, authentication, mongodb, react, express"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {snippets.map((snippet) => (
        <SnippetCard key={snippet._id} snippet={snippet} />
      ))}

      {aiSuggestion && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            AI Suggested Improvement
          </Typography>
          <Box
            component="pre"
            sx={{
              backgroundColor: "#e3f2fd",
              p: 2,
              whiteSpace: "pre-wrap",
            }}
          >
            {aiSuggestion}
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default SearchPage;
