import { API_BASE_URL } from "./apiConfig";

export const searchSnippets = async (query) => {
  const response = await fetch(
    `${API_BASE_URL}/snippets/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch snippets");
  }

  return response.json();
};

export const rateSnippet = async (id, rating) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/snippets/${id}/rate`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to rate snippet");
  }

  return response.json();
};

export const toggleFavorite = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/snippets/${id}/favorite`,
    {
      method: "PUT",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update favorite");
  }

  return response.json();
};
