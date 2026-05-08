import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

PLATFORM_NAMES = {
    "lovable": "Lovable",
    "bolt": "Bolt",
    "v0": "v0",
    "cursor": "Cursor",
    "general": "an AI builder",
}


class AnalyzeRequest(BaseModel):
    error: str
    code: str = ""
    platform: str = "general"


@app.get("/")
def root():
    return {"status": "VibeFix API is running"}


@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    platform_label = PLATFORM_NAMES.get(request.platform.lower(), "an AI builder")

    system_prompt = f"""You are VibeFix, an expert at explaining code errors to non-developers who used {platform_label} to build their app.

The user is NOT a developer. Avoid all jargon. Explain everything in plain, simple English like you're talking to someone who has never coded before.

You must respond ONLY with a single valid JSON object — no markdown, no code blocks, no preamble, no explanation outside the JSON. The JSON must have exactly these fields:

{{
  "what": "1-2 sentence plain English explanation of what went wrong",
  "why": "The root cause explained simply, no technical jargon",
  "fix": ["Step 1 in plain English", "Step 2 in plain English", "Step 3 in plain English"],
  "prompt": "A complete, ready-to-paste message the user can send directly to {platform_label} to fix this exact issue. Start with 'I got this error:' and include everything needed.",
  "severity": "low or medium or high"
}}

Rules:
- "what": Describe what broke as if explaining to a 10-year-old
- "why": Explain the root cause without any programming terms
- "fix": Give 2-5 numbered steps in plain language; each step should be an action the user can actually take
- "prompt": Write the full copy-paste prompt they can send to {platform_label}. It should be complete and specific — include the error, what they were trying to do, and ask for a fix
- "severity": Assess based on whether the app completely crashes (high), a feature is broken (medium), or it's a minor issue (low)
- Respond ONLY with the JSON object. No other text."""

    user_message = f"Error message:\n{request.error}"
    if request.code.strip():
        user_message += f"\n\nRelevant code:\n{request.code}"

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system=system_prompt,
        messages=[{"role": "user", "content": user_message}],
    )

    raw = message.content[0].text.strip()

    # Strip markdown code fences if Claude wraps anyway
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    try:
        result = json.loads(raw)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="Could not parse the analysis response. Please try again.",
        )

    return result
