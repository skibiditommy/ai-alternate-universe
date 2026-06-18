import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export async function POST(req) {
  try {
    const body = await req.json();
    const { choice, history } = body;

    let promptText = `You are the "Alternate Universe Generator", an interactive narrator. 
The user is exploring branching paths of an alternate life based on past choices.
Maintain an engaging, immersive, and vivid narrative style. Keep the story internally consistent.

Current context and history:
`;
    
    if (history && history.length > 0) {
      history.forEach((h) => {
        promptText += `\n${h.role === 'user' ? 'User Choice' : 'Narrator'}: ${h.content}`;
      });
    }

    promptText += `\n\nLatest User Choice: ${choice}`;
    promptText += `\n\nBased on the user's latest choice, write the next segment of the story (around 2-3 paragraphs). Describe the consequences and the new reality.
Then, provide exactly 2 to 3 branching choices for the user's next action.
Output your response in valid JSON format ONLY, structured like this:
{
  "story": "The narrative text here...",
  "choices": [
    {
      "title": "Short title for choice 1",
      "action": "Description of action 1"
    },
    {
      "title": "Short title for choice 2",
      "action": "Description of action 2"
    }
  ]
}
Do not include any markdown formatting like \`\`\`json around the output, just the raw JSON object.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
        config: {
            responseMimeType: "application/json",
            temperature: 0.7,
        }
    });

    const responseText = response.text;
    
    try {
        const jsonResponse = JSON.parse(responseText);
        return NextResponse.json(jsonResponse);
    } catch (parseError) {
        console.error("Failed to parse JSON from LLM:", responseText);
        return NextResponse.json({ 
            story: "The timeline became unstable and the narrative fractured. (Error parsing AI response)", 
            choices: [] 
        }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in generate route:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
  }
}
