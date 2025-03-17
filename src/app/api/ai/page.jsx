export async function POST(request) {
  try {
    const { message } = await request.json();

    // This is where you would connect to your AI service
    // For example, using OpenAI:
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-3.5-turbo',
    //     messages: [{ role: 'user', content: message }],
    //     max_tokens: 150
    //   })
    // });
    // const data = await response.json();
    // const aiReply = data.choices[0].message.content;

    // For now, just return a simulated response
    const aiReply = `This is a simulated AI response to: "${message}". In a real implementation, this would come from your AI API service.`;

    return new Response(
      JSON.stringify({
        message: aiReply,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("AI API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process your request",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
