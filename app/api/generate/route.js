import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { choice } = body;

    const promptText = `You are an expert Timeline Architect for an alternate universe simulator.
The user is asking: "What if I had chosen: ${choice}?"
Your task is to generate a comprehensive branching timeline of their life from that decision point onwards.

Generate a JSON object representing a tree of life stages.
Start with a root node (the immediate aftermath of the decision, e.g., Year 1-3).
Then create 2-3 branches representing different paths their life could take (e.g., Year 5-10).
For each of those branches, create 1-2 more sub-branches (e.g., Year 15+).

Ensure the narrative is internally consistent, vivid, and realistic. Branches MUST genuinely diverge (e.g., one path leads to massive success but burnout, another leads to quiet contentment, another is a complete pivot).

The output MUST be valid JSON with the exact following schema:
{
  "timeline": {
    "id": "root",
    "year": "Years 1-3",
    "title": "Short title of this life stage",
    "career": "Description of professional life...",
    "lifestyle": "Description of personal life, location, habits...",
    "personality": "Description of how their worldview/mindset has changed...",
    "probability": 100,
    "branches": [
      {
        "id": "branch-1",
        "year": "Years 5-10",
        "title": "...",
        "career": "...",
        "lifestyle": "...",
        "personality": "...",
        "probability": 60,
        "branches": [
           // Further sub-branches following the exact same structure...
        ]
      }
    ]
  }
}
Output ONLY the raw JSON object. Do not include markdown formatting like \`\`\`json.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a JSON-only response bot. You output valid JSON and nothing else." },
        { role: "user", content: promptText }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const responseText = chatCompletion.choices[0]?.message?.content;
    
    try {
        const jsonResponse = JSON.parse(responseText);
        return NextResponse.json(jsonResponse);
    } catch (parseError) {
        console.error("Failed to parse JSON from LLM:", responseText);
        return NextResponse.json({ error: "Failed to parse timeline." }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in generate route:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
  }
}
