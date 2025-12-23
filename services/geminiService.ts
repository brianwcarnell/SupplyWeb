import { GoogleGenAI } from "@google/genai";

// Initialization helper to ensure we don't crash if process.env is slightly delayed
const getAIClient = () => {
  const apiKey = (window as any).process?.env?.API_KEY || "";
  return new GoogleGenAI({ apiKey });
};

export const getPredictiveAnalysis = async (timeOffset: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a military theater logistics risk analysis for T+${timeOffset} hours in the INDOPACOM region. 
      Nodes: Okinawa (Hub), Guam (APS), Darwin (Base). 
      Provide a concise military report format (SITREP).`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "ANALYSIS FAILED: SECURE CHANNEL TIMEOUT. RETRYING...";
  }
};

export const getHealthPrognosis = async () => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a 7-day predictive health prognosis for the INDOPACOM theater. 
      Analyze: Readiness fatigue, resource burn rates, and infrastructure stability.
      Format: Use bullet points. Keep it professional and diagnostic.`,
      config: {
        temperature: 0.6,
      },
    });
    return response.text;
  } catch (error) {
    return "PROGNOSIS UNAVAILABLE: DATA FEED DISRUPTED.";
  }
};

export const getIntelligenceBriefing = async () => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a structured tactical intelligence briefing for the INDOPACOM theater. 
      Divide the response into three distinct sections:
      1. OSINT (Open Source Intelligence): Focus on regional media and social sentiment.
      2. SIGINT (Signals Intelligence): Focus on communication intercepts and radar anomalies.
      3. HIMINT (High-level Imagery/Tactical Intelligence): Focus on satellite observations and field reports.
      Format: Concise, professional, and formatted for a command screen.`,
      config: {
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    return "INTEL FEED OFFLINE. LOCAL ENCRYPTION ACTIVE.";
  }
};

export const getSupplyRiskAssessment = async () => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a tactical supply chain risk assessment for INDOPACOM. 
      Focus on maritime choke points (Malacca, Sunda, Lombok) and aerial corridor vulnerabilities.
      Identify 3 high-probability disruptive events and their mission impact.
      Format: Use short, punchy paragraphs with tactical headings.`,
      config: {
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    return "RISK ASSESSMENT FAILED. MONITORING MANUAL FEEDS...";
  }
};

export const getTransactionSummary = async () => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze INDOPACOM logistics flow and summarize the 3 most strategic supply movements currently in progress. 
      Include impacts on combat readiness for Class V (Ammunition) and Class III (Fuel).
      Use a brief, high-level summary format for a theater commander.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    return "TRANSACTION ANALYSIS OFFLINE. LOCAL CACHE ACTIVE.";
  }
};

export const getMissionStrategyAnalysis = async (missionName: string, objectives: string[]) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Review the proposed mission: "${missionName}". 
      Objectives: ${objectives.join(', ')}.
      Evaluate strategic viability, logistics sustainment risks, and potential operational counter-moves.
      Provide 3 tactical recommendations to improve success probability.
      Format: Professional theater command tone.`,
      config: {
        temperature: 0.75,
      },
    });
    return response.text;
  } catch (error) {
    return "STRATEGY REVIEW UNAVAILABLE. PROCEED WITH CAUTION.";
  }
};

export const analyzeCommTraffic = async () => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze theater communication patterns. 
      Identify 2 potential signals intelligence (SIGINT) anomalies or traffic density shifts.
      Recommend a protocol level (e.g., Emission Control / EMCON status).
      Keep it very short and professional.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    return "TRAFFIC ANALYSIS INCONCLUSIVE. EMCON BRAVO MAINTAINED.";
  }
};

export const generateTickerAlerts = async () => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 5 critical military flash alerts for a simulated INDOPACOM COP. Format as single line strings separated by //.",
      config: {
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    return "// CRITICAL LOW: CLASS V @ DARWIN NODE (40% STOCK) // INTERCEPT DETECTED SECTOR 7 // ALT ROUTE BRAVO-2 ACTIVATED //";
  }
};

export const startTacticalAdvisor = async (history: any[]) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the INDOPACOM Tactical Advisor AI. 
      You provide concise, military-grade situational awareness. 
      The current nodes are Okinawa (Active), Guam (Warning - Supply delay), Darwin (Critical - Ammo shortage). 
      Format: Short sentences, tactical terminology. Use [SECURE CHANNEL] header for long replies.`,
    },
  });
  return chat;
};