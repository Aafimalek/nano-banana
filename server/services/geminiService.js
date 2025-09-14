const { GoogleGenAI, Modality, Type } = require("@google/genai");

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Utility to introduce a delay to respect API rate limits
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Utility function to convert a buffer to a base64 string
const bufferToBase64 = (buffer, mimeType) => {
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
};

const generatePromptForTextBackground = (backgroundPrompt) => {
    return `**CREATIVE DIRECTOR'S BRIEF: E-COMMERCE PRODUCT MOCKUP**
  **PROJECT:** High-End Advertising Campaign
  **GOAL:** Create a single, breathtaking, photorealistic product mockup that tells a story and evokes a powerful brand emotion. The final image must be indistinguishable from a professional photograph shot on high-end equipment.

  **THE SCENE (YOUR VIRTUAL SET):**
  Your task is to build a world around this core concept: **"${backgroundPrompt}"**. Don't just create a background; craft an atmosphere. Consider the time of day, the quality of light (e.g., "warm morning light streaming through a window," "dramatic, moody studio lighting"), and the textures that will complement the product. The scene should feel aspirational and premium.

  **THE HERO (THE PRODUCT):**
  The user will provide a product image. Your mission is to integrate this product into your scene so flawlessly that it feels like it truly belongs there. This is not about pasting an image; it's about making the product the undeniable star of the story you're telling.

  **ART DIRECTION (NON-NEGOTIABLE MANDATES):**
  1.  **Cinematic Lighting:** Light is your primary storytelling tool. The product must be sculpted by the light of the scene. Replicate how light wraps around objects, creates soft shadows, and reflects off surfaces. The lighting must be believable and emotionally resonant.
  2.  **Physical Grounding:** The product must feel tangible. This is achieved through perfect contact shadows where it touches a surface and realistic cast shadows that respect the scene's light sources.
  3.  **Lens & Perspective:** Simulate a professional camera and lens. The product's perspective must perfectly match the scene. Use a shallow depth of field (bokeh) to draw the viewer's eye and make the product pop.
  4.  **Cohesive Color Story:** The entire image must have a unified, professional color grade. The product's colors should harmonize with the scene's palette. Ensure consistent white balance.

  **FINAL DELIVERABLE:** A single, magazine-quality photograph that doesn't just show a product, but sells a lifestyle. Zero AI artifacts. Pure realism.`;
};

const generatePromptForImageBackground = () => {
    return `**CREATIVE DIRECTOR'S BRIEF: PHOTOREALISTIC COMPOSITE**
  **PROJECT:** Seamless Visual Integration for Advertising
  **GOAL:** Flawlessly composite a provided subject image into a provided background image. The result must be a single, cohesive photograph that is completely believable and undetectable as a composite.

  **THE CHALLENGE:**
  You are given two images. Your task is to make the subject from the first image look as if it was originally photographed in the exact environment and under the precise lighting conditions of the second image.

  **ART DIRECTION (NON-NEGOTIABLE MANDATES):**
  1.  **Light & Shadow Harmony:** This is paramount. Forensically analyze the lighting in the background image. The subject must be re-lit to match this analysis perfectly. This includes replicating the direction, color, and softness of all light sources, and wrapping the ambient light around the subject's edges.
  2.  **Shadows as Proof:** The shadows the subject casts must be indistinguishable from other shadows in the scene. Pay obsessive attention to contact shadows to ground the object, and ensure cast shadows have the correct perspective and softness.
  3.  **Unified Perspective & Lens:** The subject must be scaled, rotated, and warped to perfectly match the perspective and any lens distortion present in the background image.
  4.  **Atmospheric Integration:** The subject must sit naturally within the scene's depth. If the background has haze, fog, or a shallow depth of field, apply a corresponding effect to the subject.
  5.  **Color & Grain Matching:** The final step is to unify the entire image. Match the black levels, white balance, and color saturation. If the background has film grain or digital noise, you must replicate it perfectly on the subject.

  **FINAL DELIVERABLE:** A single, high-resolution photograph that withstands professional scrutiny. The composite must feel completely real.`;
};

const generateAssetPromptFromText = (mascotDescription, assetType) => {
    return `**CREATIVE DIRECTOR'S BRIEF: BRAND MASCOT ASSET SUITE**
  **PROJECT:** Launch Campaign for a New Brand Mascot
  **GOAL:** Generate a set of visually consistent, high-energy, and emotionally engaging marketing assets featuring a new brand mascot. Consistency is the most important metric of success.

  **THE CHARACTER (CANONICAL DESIGN):**
  Your first task is to establish the mascot's definitive look based on this description: **"${mascotDescription}"**. This first generation creates the **unbreakable master design**. Pay attention to its core shapes, personality, and color palette.

  **THE CAMPAIGN ASSETS (CONSISTENCY MANDATE):**
  For each subsequent asset, you must re-render the **exact same character** from the master design with **100% fidelity**. Do not alter its design. Only its pose, expression, and the scene will change.

  **SCENE DIRECTIVE for '${assetType}':**
  Create a dynamic, vibrant scene that is perfectly suited for a **'${assetType}'**. The scene must tell a micro-story and make the mascot the hero.
  *   **Mood & Emotion:** The scene should be joyful, energetic, and aspirational. It should make the viewer feel positive about the brand.
  *   **Art Style:** A clean, premium 3D render style, like a still from a modern animated film. The quality must be world-class.
  *   **Composition:** Use professional composition rules to make the mascot the clear focal point. Leave some smartly designed negative space for potential marketing copy.

  **FINAL DELIVERABLE:** A suite of campaign-ready marketing assets featuring a charismatic and visually consistent brand mascot.`;
};

const generateAssetPromptFromImage = (assetType) => {
    return `**CREATIVE DIRECTOR'S BRIEF: PRODUCT-CENTRIC MARKETING VISUAL**
  **PROJECT:** High-Impact Digital Advertisement
  **GOAL:** Create a compelling, professional marketing asset that places a hero product at the center of a brand narrative.

  **THE HERO (THE PRODUCT):**
  The user has provided a product image. This product is the star of the show.

  **THE SCENE (THE STORY):**
  Your task is to generate a new, photorealistic background scene that is tailor-made for a **"${assetType}"**. This scene isn't just a backdrop; it's an environment that elevates the product and tells a story about the lifestyle it represents.

  **ART DIRECTION (NON-NEGOTIABLE MANDATES):**
  1.  **Seamless Integration:** Flawlessly composite the product into the scene you create. The integration must be undetectable.
  2.  **Narrative Lighting:** The lighting you create for the scene must be dramatic and intentional. It should highlight the product's best features and create a specific mood (e.g., luxurious, adventurous, serene).
  3.  **Photorealism is Paramount:** Create realistic reflections on the product and perfect shadows (both soft cast shadows and precise contact shadows) that are dictated by the scene's new environment.
  4.  **Strategic Composition:** The product must be the undeniable focal point. Use professional composition techniques (leading lines, depth of field, rule of thirds) to guide the viewer's eye directly to it.

  **FINAL DELIVERABLE:** A single, stunning advertisement image. **Output ONLY the generated image.**`;
};

const generateTextImagePrompt = (text, fontStyle, placement, colorScheme) => {
    return `**CREATIVE DIRECTOR'S BRIEF: HIGH-FASHION GRAPHIC COMPOSITE**
  **PROJECT:** Magazine Cover / Premium Social Media Graphic
  **GOAL:** Create a visually striking, professional graphic by placing text *behind* the primary subject of an image. The final result should look like a high-end design from a top creative agency.

  **THE ELEMENTS:**
  1.  **Image:** The user has provided an image with a clear subject.
  2.  **Text:** "${text}"
  3.  **Style Guide:** Font: "${fontStyle}", Placement: "${placement}", Colors: "${colorScheme}"

  **EXECUTION MANDATES:**
  1.  **Perfect Subject Isolation:** Your first step is to perform a flawless, high-fidelity mask of the primary subject. Edge quality must be perfect.
  2.  **Artistic Text Rendering:** Render the text according to the style guide, but with an artistic eye. The text is a design element, not just an overlay. It should have presence and style.
  3.  **Seamless Compositing:** The core task is to composite the layers correctly: [Background] -> [Text Layer] -> [Isolated Subject]. This creates the sophisticated "text behind" effect.
  4.  **Aesthetic Integration:** The text must feel like it's part of the original scene. This means it should be affected by the scene's lighting and atmosphere. It should integrate, not just sit on top.

  **FINAL DELIVERABLE:** A single, high-resolution JPEG image that is ready for publication. Output ONLY the final image.`;
};

const generateDiagramPrompt = (topic) => {
    return `Create a clean, labeled educational diagram about "${topic}". The visual style must be clear line art with a soft, limited color palette, suitable for a modern science textbook. All labels must be in a clean, legible sans-serif font, placed clearly with pointer lines. Each key part must have a concise explanation. The layout should be uncluttered and professional. If it is a process, use arrows to show flow. The final output must be a single, self-explanatory image.`;
};

const generateStoryIllustrationPrompt = (characterDescription, pageText) => {
    return `**CREATIVE DIRECTOR'S BRIEF: CHILDREN'S STORYBOOK ILLUSTRATION**
  **PROJECT:** A page for a new, high-quality children's book.
  **GOAL:** Create a single, beautiful, and emotionally resonant illustration. Character consistency is the most important rule.

  **THE CHARACTER (CANONICAL & UNCHANGEABLE):**
  Your master reference for the main character is this: **"${characterDescription}"**.
  **NON-NEGOTIABLE MANDATE:** You must draw this character with the exact same design (face, clothes, colors, proportions) in every single illustration. Do not change the character; only change their pose and the scene around them.

  **THE SCENE (THIS PAGE'S STORY):**
  The story text for this specific page is: **"${pageText}"**.
  Your task is to illustrate this moment. The character should be the focus, clearly acting out the story and expressing the emotions described.

  **ARTISTIC STYLE:**
  A charming, whimsical digital watercolor style. The aesthetic must be warm, gentle, and professional, ready for publication. The composition should be clean with a clear focal point, and the background should support the story without being distracting.

  **FINAL DELIVERABLE:** A single, high-resolution, family-friendly illustration.`;
};

// Main service functions
const generateProductMockup = async (productImageBuffer, productMimeType, backgroundImageBuffer, backgroundMimeType, backgroundPrompt) => {
    try {
        const productBase64 = productImageBuffer.toString('base64');

        const parts = [
            {
                inlineData: {
                    data: productBase64,
                    mimeType: productMimeType,
                },
            },
        ];

        if (backgroundImageBuffer) {
            const backgroundBase64 = backgroundImageBuffer.toString('base64');
            parts.push({
                inlineData: {
                    data: backgroundBase64,
                    mimeType: backgroundMimeType,
                },
            });
        }

        const prompt = backgroundPrompt
            ? generatePromptForTextBackground(backgroundPrompt)
            : generatePromptForImageBackground();

        parts.push({ text: prompt });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const responseParts = response.candidates?.[0]?.content?.parts;
        if (!responseParts) {
            throw new Error("Invalid response from API: No content parts found.");
        }

        const imagePart = responseParts.find(part => part.inlineData);
        if (imagePart && imagePart.inlineData) {
            const base64ImageBytes = imagePart.inlineData.data;
            return `data:${imagePart.inlineData.mimeType};base64,${base64ImageBytes}`;
        }

        const textResponse = responseParts.find(p => p.text)?.text;
        if (textResponse) {
            throw new Error(`API returned text instead of an image: "${textResponse}"`);
        }

        throw new Error("API did not return an image. It may have refused the request.");
    } catch (error) {
        console.error("Error generating mockup:", error);
        if (error instanceof Error) {
            if (error.message.includes('SAFETY')) {
                throw new Error('The request was blocked due to safety policies. Please try a different image or prompt.');
            }
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred during image generation.");
    }
};

const generateBrandAsset = async (imageBuffer, mimeType, description, assetType) => {
    try {
        // CASE 1: Generate from a text description (Mascot)
        if (description) {
            const prompt = generateAssetPromptFromText(description, assetType);
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/png',
                    aspectRatio: '1:1',
                },
            });

            if (!response.generatedImages || response.generatedImages.length === 0) {
                throw new Error("API did not return an image for the mascot description.");
            }
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        }
        // CASE 2: Generate from a product image
        else if (imageBuffer) {
            const productBase64 = imageBuffer.toString('base64');
            const prompt = generateAssetPromptFromImage(assetType);

            const parts = [
                {
                    inlineData: {
                        data: productBase64,
                        mimeType: mimeType,
                    },
                },
                { text: prompt }
            ];

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: { parts },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });

            const responseParts = response.candidates?.[0]?.content?.parts;
            if (!responseParts) {
                throw new Error("Invalid response from API: No content parts found.");
            }

            const imagePart = responseParts.find(part => part.inlineData);
            if (imagePart && imagePart.inlineData) {
                const base64ImageBytes = imagePart.inlineData.data;
                return `data:${imagePart.inlineData.mimeType};base64,${base64ImageBytes}`;
            }

            const textResponse = responseParts.find(p => p.text)?.text;
            if (textResponse) {
                throw new Error(`API returned text instead of an image: "${textResponse}"`);
            }

            throw new Error("API did not return an image from the product input.");
        }

        throw new Error("Invalid input for asset generation.");

    } catch (error) {
        console.error("Error generating brand asset:", error);
        if (error instanceof Error) {
            if (error.message.includes('SAFETY')) {
                throw new Error('The request was blocked due to safety policies. Please try a different image or prompt.');
            }
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred during asset generation.");
    }
};

const generateTextImage = async (imageBuffer, mimeType, text, fontStyle, placement, colorScheme) => {
    try {
        const imageBase64 = imageBuffer.toString('base64');
        const prompt = generateTextImagePrompt(text, fontStyle, placement, colorScheme);

        const parts = [
            {
                inlineData: {
                    data: imageBase64,
                    mimeType: mimeType,
                },
            },
            { text: prompt }
        ];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const responseParts = response.candidates?.[0]?.content?.parts;
        if (!responseParts) {
            throw new Error("Invalid response from API: No content parts found.");
        }

        const imagePart = responseParts.find(part => part.inlineData);
        if (imagePart && imagePart.inlineData) {
            const base64ImageBytes = imagePart.inlineData.data;
            return `data:${imagePart.inlineData.mimeType};base64,${base64ImageBytes}`;
        }

        const textResponse = responseParts.find(p => p.text)?.text;
        if (textResponse) {
            throw new Error(`API returned text instead of an image: "${textResponse}"`);
        }

        throw new Error("API did not return an image. It may have refused the request.");
    } catch (error) {
        console.error("Error generating text image:", error);
        if (error instanceof Error) {
            if (error.message.includes('SAFETY')) {
                throw new Error('The request was blocked due to safety policies. Please try a different image or prompt.');
            }
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred during text image generation.");
    }
};

const generateEducationalDiagram = async (topic) => {
    try {
        const prompt = generateDiagramPrompt(topic);
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '4:3',
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("API did not return an image for the diagram topic.");
        }
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;

    } catch (error) {
        console.error("Error generating educational diagram:", error);
        if (error instanceof Error) {
            if (error.message.includes('SAFETY')) {
                throw new Error('The request was blocked due to safety policies. Please try a different topic.');
            }
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred during diagram generation.");
    }
};

// Recipe generation functions
const RECIPE_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        estimatedTime: { type: Type.STRING },
        ingredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        instructions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    step: { type: Type.INTEGER },
                    text: { type: Type.STRING },
                },
                required: ['step', 'text'],
            },
        },
    },
    required: ['title', 'estimatedTime', 'ingredients', 'instructions'],
};

const getRecipeFromAI = async (dishName, ingredientImageBuffer, ingredientMimeType) => {
    let prompt = `You are a creative chef. Generate a delicious recipe. The output must be in the specified JSON format.`;
    const parts = [];

    if (dishName) {
        prompt += ` The user wants to make: "${dishName}".`;
        parts.push({ text: prompt });
    } else if (ingredientImageBuffer) {
        prompt += ` The user has provided an image of their available ingredients. Create a suitable recipe using ONLY the ingredients you can identify in the image. Be realistic.`;
        const imageBase64 = ingredientImageBuffer.toString('base64');
        parts.push({ text: prompt });
        parts.push({
            inlineData: {
                data: imageBase64,
                mimeType: ingredientMimeType,
            },
        });
    } else {
        throw new Error("Either a dish name or an ingredient image is required.");
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: RECIPE_SCHEMA,
            },
        });

        const jsonStr = response.text.trim();
        const recipe = JSON.parse(jsonStr);
        // Initialize empty imageUrls
        recipe.instructions = recipe.instructions.map(inst => ({ ...inst, imageUrl: undefined }));
        recipe.finalImageUrl = undefined;
        return recipe;
    } catch (error) {
        console.error("Error parsing recipe JSON:", error);
        throw new Error("The AI failed to generate a valid recipe. Please try again.");
    }
};

const generateRecipeImage = async (prompt) => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("API did not return an image for the recipe step.");
        }
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    } catch (error) {
        console.error("Error generating recipe image:", error);
        if (error instanceof Error) {
            if (error.message.includes('SAFETY')) {
                throw new Error('An image for this step was blocked for safety reasons.');
            }
            if (error.message.includes('429') || error.message.toLowerCase().includes('quota')) {
                throw new Error('API rate limit exceeded. The process was stopped.');
            }
        }
        throw new Error('Failed to generate an image for a recipe step.');
    }
};

const generateStoryIllustration = async (characterDescription, pageText) => {
    try {
        const prompt = generateStoryIllustrationPrompt(characterDescription, pageText);
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '4:3',
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("API did not return an illustration for this page.");
        }
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;

    } catch (error) {
        console.error("Error generating story illustration:", error);
        if (error instanceof Error) {
            if (error.message.includes('SAFETY')) {
                throw new Error('The illustration was blocked due to safety policies. Please revise the character or page description.');
            }
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred during illustration generation.");
    }
};

module.exports = {
    generateProductMockup,
    generateBrandAsset,
    generateTextImage,
    generateEducationalDiagram,
    getRecipeFromAI,
    generateRecipeImage,
    generateStoryIllustration,
    delay
};
