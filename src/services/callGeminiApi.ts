import { NormalizedResult, ResumeAnalysisResult } from "@/type";
import geminiClient from "../lib/gemini";
import { DocumentData } from "firebase/firestore";
import { Buffer } from "buffer";

/**
 * Gọi Gemini API để phân tích CV
 * @param resumeUrl URL của CV từ Cloudinary
 * @param resumeBase64 Base64 của CV (sử dụng nếu URL không khả dụng)
 * @param jobDescription Mô tả công việc để so sánh với CV
 * @returns Kết quả phân tích từ Gemini API, đã được chuẩn hóa
 */
export async function callGeminiApi(
  resumeData: DocumentData,
  jobDescription: string
): Promise<ResumeAnalysisResult> {
  try {
    console.log("Calling Gemini API to analyze resume");

    const pdfResponse = await fetch(
      resumeData.fileUrl.secureUrl || resumeData.fileUrl.publicUrl,
      {
        method: "GET",
      }
    );
    console.log({ pdfResponse });
    if (!pdfResponse.ok) {
      throw new Error("Failed to fetch PDF file");
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();
    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

    const prompt = `
      You are an expert resume analyzer. Analyze the attached PDF resume and compare it with the following job description:
      
      JOB DESCRIPTION:
      ${jobDescription}
      
      Please provide a structured analysis with the following:
      1. Overall score (0-100)
      2. Match percentage with the job description (0-100)
      3. Skills analysis:
         - Present skills in the resume
         - Missing skills based on job description
         - Recommended skills to add
      4. Format score (0-100)
      5. Keyword match score (0-100)
      6. Relevance score (0-100)
      7. Analysis of strengths
      8. Weaknesses
      9. Suggestions for improvement
      
      Return your analysis in JSON format with these exact fields:
      {
        "overallScore": number,
        "matchPercentage": number,
        "skillsAnalysis": {
          "presentSkills": [strings],
          "missingSkills": [strings],
          "recommendedSkills": [strings]
        },
        "formatScore": number,
        "keywordMatchScore": number,
        "relevanceScore": number,
        "analysis": [strings],
        "weaknesses": [strings],
        "suggestions": [strings]
      }
      
      Important: Make sure to return valid JSON that can be parsed.
    `;

    const contents = [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "application/pdf",
              data: pdfBase64,
            },
          },
        ],
      },
    ];

    const response = await geminiClient.models.generateContent({
      contents,
      model: "gemini-2.0-flash",
    });

    if (!response || !response.text) {
      throw new Error("Invalid response from Gemini API");
    }

    const responseText = response.text;

    const jsonMatch =
      responseText.match(/```json\s*([\s\S]*?)\s*```/) ||
      responseText.match(/```\s*([\s\S]*?)\s*```/) ||
      responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Invalid JSON format in response");
    }

    const jsonStr = jsonMatch[1] || jsonMatch[0];
    const cleanedJsonStr = jsonStr.replace(/^```json|```$/gm, "").trim();
    const rawAnalysisData = JSON.parse(cleanedJsonStr);

    // Chuẩn hóa kết quả
    const normalizedAnalysis = normalizeAnalysisResult(rawAnalysisData);

    console.log("Resume analysis completed successfully");

    return {
      success: true,
      message: "Resume analysis completed successfully",
      analysis: normalizedAnalysis,
    };
  } catch (error) {
    console.log("Error calling Gemini API", error);
    throw new Error("Error calling Gemini API: " + (error as Error).message);
  }
}

/**
 * Chuẩn hóa kết quả phân tích từ Gemini API
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeAnalysisResult(result: any): NormalizedResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clampScore = (value: any, defaultValue: number): number =>
    typeof value === "number"
      ? Math.max(0, Math.min(100, value))
      : defaultValue;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ensureArray = (value: any): string[] =>
    Array.isArray(value) ? value : [];

  return {
    skills: {
      present: ensureArray(result.skillsAnalysis?.presentSkills),
      missing: ensureArray(result.skillsAnalysis?.missingSkills),
      keywordsToAdd: ensureArray(result.skillsAnalysis?.recommendedSkills),
    },
    scores: {
      overall: clampScore(result.overallScore, 70),
      format: clampScore(result.formatScore, 65),
      keywords: clampScore(result.keywordMatchScore, 60),
      relevance: clampScore(result.relevanceScore, 55),
    },
    analysis: {
      strengths: ensureArray(result.analysis),
      weaknesses: ensureArray(result.weaknesses),
    },
    suggestions: ensureArray(result.suggestions),
  };
}
