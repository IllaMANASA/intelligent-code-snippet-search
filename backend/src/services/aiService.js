const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAISuggestion = async (query, snippets) => {
  try {
    let context = "";

    if (snippets.length > 0) {
      context = snippets
        .map(
          (s) =>
            `Title: ${s.title}\nDescription: ${s.description}\nCode:\n${s.code}`
        )
        .join("\n\n");
    }

    const prompt =
      snippets.length > 0
        ? `Improve or suggest best practices for the following code snippets related to "${query}":\n\n${context}`
        : `Provide a simple and best-practice code snippet for "${query}".`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI service error:", error.message);

    // fallback
    return "AI suggestions are currently unavailable due to API limits. Please refer to the retrieved code snippets or try again later.";
  }
};

module.exports = { getAISuggestion };
