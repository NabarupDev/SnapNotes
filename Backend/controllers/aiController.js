require("dotenv").config();
const axios = require("axios");

//const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Checks if content may contain sensitive or inappropriate material
 * @param {string} text The text to check
 * @returns {object} Object with isSafe flag and detected patterns if unsafe
 */
const isContentSafe = (text) => {
    // Academic/study exemptions - these are always allowed
    const academicExemptions = [
        // Database and SQL related
        /\bdatabase\b/i,
        /\bSQL\b/i,
        /\bquery\b/i,
        /\btable\b/i,
        /\bschema\b/i,
        /\bcolumn\b/i,
        /\brow\b/i,
        /\bindex\b/i,
        /\bjoin\b/i,
        /\bselect\b/i,
        /\bupdate\b/i,
        /\bdelete\b/i,
        /\binsert\b/i,
        /\brelational\b/i,
        /\bentity\b/i,
        /\battribute\b/i,
        /\bforeign key\b/i,
        /\bprimary key\b/i,
        /\bnormalization\b/i,

        // Various academic subjects
        /\balgebra\b/i,
        /\bcalculus\b/i,
        /\bphysics\b/i,
        /\bchemistry\b/i,
        /\bbiology\b/i,
        /\bmathematics\b/i,
        /\bhistory\b/i,
        /\bliterature\b/i,
        /\bcomputer science\b/i,
        /\bprogramming\b/i,
        /\balgorithm\b/i,
        /\bdata structure\b/i,
        
        // Additional academic keywords
        /\blecture\b/i,
        /\btheory\b/i,
        /\bconcept\b/i,
        /\basynchronous\b/i,
        /\barchitecture\b/i,
        /\bframework\b/i,
        /\bimplementation\b/i,
        /\bsystem\b/i,
        /\bnetwork\b/i,
        /\bprotocol\b/i,
        /\bequation\b/i,
        /\bformula\b/i,
        /\btheorem\b/i,
        /\bproof\b/i,
        /\bassignment\b/i,
        /\bhomework\b/i,
        /\bcourse\b/i,
        /\btutorial\b/i,
        /\bgraph\b/i,
        /\btree\b/i,
        /\bstack\b/i,
        /\bqueue\b/i,
        /\barray\b/i,
        /\bvector\b/i,
        /\bobject\b/i,
        /\bclass\b/i,
        /\bfunction\b/i,
        /\bmethod\b/i,
        /\binterface\b/i,
        /\bstudy\b/i,
        /\bresearch\b/i,
        /\bacademic\b/i,
        /\beducation\b/i,
        /\blearning\b/i
    ];

    // If content clearly contains academic content, allow it
    const isAcademic = academicExemptions.some(pattern => pattern.test(text));
    if (isAcademic) {
        return { isSafe: true };  // Content is safe for academic topics
    }

    // List of patterns/keywords to check for potentially sensitive content
    const sensitivePatterns = [
        // Personal identifiable information
        /\bpassword\s*[:=]/i, // Modified to match actual passwords, not just the word
        /\bcredit\s*card\s*(number|details|info)/i, // More specific for credit card info
        /\bsocial\s*security/i,
        /\bpersonal\s*identification/i,
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, // email
        /\b(?:\d{3}-\d{2}-\d{4}|\d{9})\b/, // SSN
        /\b(?:\d{4}[- ]?){3}\d{4}\b/, // Credit card
        /\bpassport\s*number/i,
        /\b\d{9}\b/, // Passport number format
        /\b\d{3}[\s-]?\d{3}[\s-]?\d{4}\b/, // Phone number
        /\bphysical\s*address\b/i, // Modified to avoid flagging database address/addressing
        /\bbank\s*account/i,
        /\b\d{10,12}\b/, // Bank account number
        /\brouting\s*number/i,
        // Removing duplicate pattern for 9-digit numbers as it conflicts with database IDs
        /\bbirth\s*date/i,
        /\bdate\s*of\s*birth/i,
        /\bdriver'?s?\s*licen[sc]e/i,
        /\b(?:[A-Z]\d{7}|\d{9})\b/, // Driver's license format
        /\btax\s*id\b/i,
        /\bein\b/i, // Employer Identification Number
        /\b\d{2}-\d{7}\b/, // EIN format
        
        // Inappropriate content
        /\bnsfw\b/i,
        /\binappropriate\s*content\b/i, 
        /\boffensive\s*content\b/i,
        /\bhate\s*speech\b/i,
        /\bviolent\s*content\b/i, // Modified to avoid flagging discussion about data violations
        /\bharassment\b/i,
        /\babusive\s*content\b/i, // More specific to avoid false positives
        /\bthreatening\s*content\b/i,
        /\bsexually\s*explicit\b/i, // More specific than just "explicit"
        /\badult\s*content\b/i,
        /\bpornography\b/i,
        /\bobscene\s*content\b/i,
        /\bsuicidal\s*content\b/i,
        /\bself-harm\b/i,
        /\bracist\s*content\b/i,
        /\bsexist\s*content\b/i,
        /\bhomophobic\s*content\b/i,
        /\btransphobic\s*content\b/i,
        /\bxenophobic\s*content\b/i,
        /\bbigotry\b/i,
        /\bdiscrimination\b/i,
        /\bterrorist\b/i,
        /\bextremist\b/i,
        /\bradicalization\b/i,
        /\bweapon\s*(making|building)\b/i, // More specific to avoid "weapon" in other contexts
        /\bbomb\s*making\b/i,
        /\bexplosive\s*(making|device)\b/i,
        /\bdrug\s*dealing\b/i,
        /\bnarcotics\s*trade\b/i,
        /\billegal\s*substance\b/i,
        /\bchild\s*abuse\b/i,
        /\bhuman\s*trafficking\b/i,
        /\bsexual\s*exploitation\b/i,
        /\banimal\s*cruelty\b/i,
        /\bhacking\s*instructions\b/i, // Modified to not flag general "hack" discussion
        /\bmalware\s*creation\b/i,
        /\bphishing\s*attack\b/i,
        /\bcyberattack\s*instructions\b/i,
        /\bfraudulent\s*scheme\b/i, // More specific than just "fraud"
        /\bscamming\b/i,
        /\billegal\s*gambling\b/i,
        /\bcounterfeiting\b/i,
        /\bmoney\s*laundering\b/i,
        /\bprofane\s*language\b/i, // More specific than just "profanity"
        /\boffensive\s*slur\b/i,
        /\bhate\s*group\b/i,
        /\bextremist\s*propaganda\b/i,
        /\bconspiracy\s*theory\b/i,
        /\bmalicious\s*misinformation\b/i,
        /\bdeliberate\s*disinformation\b/i,
    ];
    
    // Find any matching patterns
    const detectedPatterns = sensitivePatterns
        .filter(pattern => pattern.test(text))
        .map(pattern => pattern.toString().replace(/\/\\b|\b\/i|\/i/g, '').replace(/\\/g, ''));
    
    return { 
        isSafe: detectedPatterns.length === 0,
        detectedPatterns: detectedPatterns.length > 0 ? detectedPatterns : null
    };
};

/**
 * Suggests content rewording guidance based on detected patterns
 * @param {Array} detectedPatterns Array of detected sensitive patterns
 * @returns {string} Guidance for user to reword their content
 */
const generateRewriteSuggestion = (detectedPatterns) => {
    if (!detectedPatterns || detectedPatterns.length === 0) {
        return null;
    }

    // Categorize the patterns
    const piiPatterns = ['password', 'credit', 'card', 'social', 'security', 'personal', 'email', 'passport'];
    const inappropriatePatterns = ['nsfw', 'inappropriate', 'offensive', 'hate', 'explicit'];
    const securityPatterns = ['hacking', 'malware', 'phishing', 'cyberattack'];
    
    const hasPII = detectedPatterns.some(pattern => 
        piiPatterns.some(p => pattern.toLowerCase().includes(p)));
    const hasInappropriate = detectedPatterns.some(pattern => 
        inappropriatePatterns.some(p => pattern.toLowerCase().includes(p)));
    const hasSecurity = detectedPatterns.some(pattern => 
        securityPatterns.some(p => pattern.toLowerCase().includes(p)));

    let suggestion = "Your request was flagged by our content filter. Please consider rewording your request:";
    
    if (hasPII) {
        suggestion += "\n- Remove any personal identifiable information";
    }
    if (hasInappropriate) {
        suggestion += "\n- Use more academic/professional language";
    }
    if (hasSecurity) {
        suggestion += "\n- Focus on educational aspects rather than implementation details";
    }
    
    suggestion += "\n\nFor academic topics, try to be more specific about the educational context.";
    
    return suggestion;
};

const summarizeWithAI = async (req, res) => {
    try {
        const { text, format, length } = req.body;

        if (!text || !format || !length) {
            return res.status(400).json({ error: "Missing required fields: text, format, length" });
        }
        
        // Check if request content is safe
        const contentCheck = isContentSafe(text);
        if (!contentCheck.isSafe) {
            // Generate rewrite suggestion
            const rewriteSuggestion = generateRewriteSuggestion(contentCheck.detectedPatterns);
            
            return res.status(403).json({ 
                error: "Request contains potentially sensitive content that cannot be processed.",
                rewriteSuggestion,
                detectedPatterns: contentCheck.detectedPatterns
            });
        }
        
        //console.log("⚠️ Switching to Gemini AI...");
        const geminiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                "text": `Imagine you are an **expert tutor** helping a student understand and solve a problem. Your task is to create the **most effective, structured, and easy-to-follow explanation** for this topic or problem.  
                              
                              📌 **Topic/Problem:** ${text}  
                              📌 **Format:** ${format}  
                              📌 **Length:** ${length} words  
                              
                              🔹 **Your Goal:**  
                              - Provide a **highly structured, crystal-clear, and concise explanation**  
                              - Use **formulas, diagrams, real-life analogies, and step-by-step breakdowns**  
                              - Make the content **easily understandable and memorable**  
                              
                              ---
                              
                              ## 📝 **Structure:**  
                              
                              ### 1️⃣ **Problem Definition:**  
                              ➡️ Provide a **clear explanation** of the problem or topic.  
                              
                              ### 2️⃣ **Core Concepts:**  
                              📌 Break down the **fundamental principles** behind this topic.
                              📌 For math/science problems: identify the key formulas and concepts needed.
                              
                              ### 3️⃣ **Step-by-Step Solution:**  
                              🧠 Provide a **methodical approach** to understanding or solving the problem.
                              ✅ For math: Show each calculation step clearly.
                              ✅ For physics/chemistry: Explain the reasoning behind each step.
                              ✅ For theoretical topics: Present logical progression of ideas.
                              
                              ### 4️⃣ **Common Questions & Mistakes:**  
                              📖 Address potential confusion points:  
                              
                              **Question 1:** [Anticipate a common question]  
                              **Answer:** [Provide a clear explanation]  
                              
                              **Question 2:** [Another common question]  
                              **Answer:** [Clear explanation]  

                              **Common Mistake:** [Identify a typical error students make]  
                              **Correction:** [How to avoid or fix it]  
                              
                              ### 5️⃣ **Key Formulas & Visual Aids:**  
                              📊 Include **essential formulas, equations, or conceptual diagrams** as needed.
                              
                              ### 6️⃣ **Real-World Application:**  
                              🌍 Briefly explain how this concept applies in practical scenarios.
                              
                              ---
                              
                              ## ⚡ **Important Guidelines:**  
                              ✅ Use **clear, simple language** avoiding unnecessary jargon  
                              ✅ Employ **visual organization** with bullet points and structured formatting  
                              ✅ For math/science: ensure all variables are clearly defined  
                              ✅ Include **memory aids or shortcuts** where appropriate  
                              
                              📌 **Your output should help the student fully grasp the concept and know exactly how to approach similar problems!** 🎯  
                              `
                            }
                        ]
                    }
                ],
                // Add safety settings to the API request
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        // Check if response contains any content
        if (!geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return res.status(400).json({ 
                error: "AI response was filtered due to safety concerns or content policy violation."
            });
        }
        
        // Check if AI response is safe
        const aiResponse = geminiResponse.data.candidates[0].content.parts[0].text;
        const responseCheck = isContentSafe(aiResponse);
        if (!responseCheck.isSafe) {
            return res.status(403).json({ 
                error: "AI generated content was filtered due to safety concerns.",
                detectedPatterns: responseCheck.detectedPatterns
            });
        }

        //console.log("✅ Gemini AI Response:", geminiResponse.data);
        return res.json({ summary: aiResponse });
    } catch (error) {
        console.error("❌ AI Summarization Error:", error.message);
        
        // Check if error is related to safety/moderation
        if (error.response && error.response.data && 
            (error.response.data.error?.includes("safety") || 
             error.response.data.error?.includes("content policy"))) {
            return res.status(403).json({ 
                error: "AI request was blocked due to content policy violation."
            });
        }
        
        return res.status(500).json({ error: "AI Summarization failed. Try again later." });
    }
};

// ✅ Ensure Proper Export
module.exports = { summarizeWithAI };
