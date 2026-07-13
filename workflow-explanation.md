# PathFinder: AI Alternate Universe Generator
## Project Workflow & Implementation Summary

This document outlines the workflow, architecture, and accomplishments of the PathFinder project.

### 1. The Core Workflow (How the App Works)

PathFinder is designed to simulate alternate life trajectories based on past decisions ("The Road Not Taken"). The workflow operates as follows:

- **Step 1: User Input (Frontend)**
  The user enters a historical decision or "What if" scenario into the Next.js React frontend. Examples include "What if I pursued mechanical engineering instead of computer science?" or "What if I moved to Tokyo after high school?"

- **Step 2: API Request (Client to Server)**
  The frontend sends this prompt via a secure POST request to the Next.js backend API route (`/api/generate`).

- **Step 3: Prompt Engineering & Schema Enforcement (Backend)**
  The API route acts as a Timeline Architect. It wraps the user's prompt in strict system instructions, demanding that the output be a highly structured JSON object representing a recursive tree of life stages across decades.

- **Step 4: LLM Processing (Google Gemini)**
  The backend sends the constructed prompt to Google's Gemini 2.5 Flash model. The AI computes genuine divergence, generating branches for the user's professional career, personal lifestyle, and internal personality evolution, complete with calculated probability estimates for each branch.

- **Step 5: Data Parsing & Response (Backend to Client)**
  The API route receives the raw JSON string, parses it into a valid JavaScript object, and securely sends it back to the client.

- **Step 6: Interactive Visualization (Frontend)**
  The React frontend receives the timeline tree data. Using recursion (`TimelineTree` and `TimelineNode` components), it renders the data into a responsive, visually appealing branching tree.

---

### 2. What We Accomplished

Over the course of this build sprint, several major milestones were achieved:

- **Robust Architecture:** We successfully set up a full-stack Next.js application, integrating secure API communication and the `@google/genai` SDK for interaction with the Gemini 2.5 Flash model.
- **Strict JSON Parsing:** We engineered prompts that force the LLM to output valid, deeply nested JSON data structures, allowing us to map unstructured AI generation directly to structured UI components.
- **Advanced Human Developer UI:** We overhauled the design system. We transitioned away from an overly flashy "vibecoded" aesthetic (neon glows, space gradients) to a sleek, professional interface inspired by top-tier engineering tools like Vercel and Linear. This included pure dark mode backgrounds, crisp 1px borders, and snappy micro-interactions.
- **Dynamic Data Visualization:** We created a custom recursive React component that dynamically visualizes the timeline branches using CSS Flexbox and Grid, complete with probability-based styling chips.
- **Content Expansion:** We implemented client-side Next.js routing and built out dedicated "How It Works" and "Creator" profile pages to provide context and background for the application.

*Report generated automatically for the PathFinder project.*
