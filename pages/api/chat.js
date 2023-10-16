// pages/api/chat.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { question, history } = req.body;

    // Validate history
    if (!Array.isArray(history)) {
      return res.status(400).json({ message: "History must be an array" });
    }

    // Ensure all history items are strings and not empty
    history = history
      .filter((item) => typeof item === "string" && item.trim() !== "")
      .map((item) => item.trim());

    // Define the headers and body of the request to the Chat API
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: question,
        full_source: true,
        format: "markdown",
        history: history,
      }),
    };

    try {
      // Forward the request to the Chat API
      const response = await fetch(
        "https://api.docsbot.ai/teams/AQlopPkXnxW7eKsGqeSe/bots/lnPRMgAXQgaYl0JG0uXj/chat",
        requestOptions
      );

      if (!response.ok) {
        // Extract the error message if possible
        let errorMsg = "";
        try {
          const errorResponse = await response.json();
          errorMsg = errorResponse.error || JSON.stringify(errorResponse);
        } catch (parseError) {
          errorMsg = "An error occurred, but the response could not be parsed.";
        }

        console.error(`Error from Chat API: ${errorMsg}`);
        return res.status(response.status).json({
          message: `Received error from Chat API: ${errorMsg}`,
        });
      }

      const data = await response.json();

      res.status(200).json(data);
    } catch (error) {
      // Handle any errors
      console.error("Error posting chat", error);

      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    // Handle any requests that aren't POST
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
