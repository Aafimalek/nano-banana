const express = require('express');
const multer = require('multer');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const geminiService = require('../services/geminiService');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

// Text Behind Image generation
router.post('/text-image', authenticate, upload.single('image'), async (req, res) => {
    try {
        const { text, fontStyle, placement, colorScheme } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Image file is required'
            });
        }

        if (!text || !fontStyle || !placement || !colorScheme) {
            return res.status(400).json({
                success: false,
                message: 'All text generation parameters are required'
            });
        }

        const result = await geminiService.generateTextImage(
            req.file.buffer,
            req.file.mimetype,
            text,
            fontStyle,
            placement,
            colorScheme
        );

        res.json({
            success: true,
            data: {
                imageDataUrl: result
            }
        });
    } catch (error) {
        console.error('Text image generation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate text image'
        });
    }
});

// Diagram generation
router.post('/diagram', authenticate, async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({
                success: false,
                message: 'Topic is required for diagram generation'
            });
        }

        const result = await geminiService.generateEducationalDiagram(topic);

        res.json({
            success: true,
            data: {
                imageDataUrl: result
            }
        });
    } catch (error) {
        console.error('Diagram generation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate diagram'
        });
    }
});

// Isometry generation
router.post('/isometry', authenticate, upload.single('image'), async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Image file is required for isometry generation'
            });
        }

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: 'Prompt is required for isometry generation'
            });
        }

        // For isometry, we'll use the brand asset generation with a specific prompt
        const result = await geminiService.generateBrandAsset(
            req.file.buffer,
            req.file.mimetype,
            null, // no description
            `isometric illustration: ${prompt}`
        );

        res.json({
            success: true,
            data: {
                imageDataUrl: result
            }
        });
    } catch (error) {
        console.error('Isometry generation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate isometry image'
        });
    }
});

// Replace Outfit generation
router.post('/outfit-replace', authenticate, upload.fields([
    { name: 'promptImage', maxCount: 1 },
    { name: 'outfitImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!req.files || !req.files.promptImage || !req.files.outfitImage) {
            return res.status(400).json({
                success: false,
                message: 'Both prompt image and outfit image are required'
            });
        }

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: 'Prompt is required for outfit replacement'
            });
        }

        // For outfit replacement, we'll use the product mockup generation
        const result = await geminiService.generateProductMockup(
            req.files.promptImage[0].buffer,
            req.files.promptImage[0].mimetype,
            req.files.outfitImage[0].buffer,
            req.files.outfitImage[0].mimetype,
            `Replace the outfit with: ${prompt}`
        );

        res.json({
            success: true,
            data: {
                imageDataUrl: result
            }
        });
    } catch (error) {
        console.error('Outfit replacement error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to replace outfit'
        });
    }
});

// Mockup generation (for backward compatibility)
router.post('/mockup', authenticate, upload.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const { backgroundPrompt } = req.body;

        if (!req.files || !req.files.productImage) {
            return res.status(400).json({
                success: false,
                message: 'Product image is required'
            });
        }

        const backgroundImage = req.files.backgroundImage ? req.files.backgroundImage[0] : null;

        const result = await geminiService.generateProductMockup(
            req.files.productImage[0].buffer,
            req.files.productImage[0].mimetype,
            backgroundImage ? backgroundImage.buffer : null,
            backgroundImage ? backgroundImage.mimetype : null,
            backgroundPrompt
        );

        res.json({
            success: true,
            data: {
                imageDataUrl: result
            }
        });
    } catch (error) {
        console.error('Mockup generation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate mockup'
        });
    }
});

// Brand asset generation (for backward compatibility)
router.post('/brand-asset', authenticate, upload.single('image'), async (req, res) => {
    try {
        const { description, assetType } = req.body;

        if (!description && !req.file) {
            return res.status(400).json({
                success: false,
                message: 'Either description or image is required'
            });
        }

        if (!assetType) {
            return res.status(400).json({
                success: false,
                message: 'Asset type is required'
            });
        }

        const result = await geminiService.generateBrandAsset(
            req.file ? req.file.buffer : null,
            req.file ? req.file.mimetype : null,
            description,
            assetType
        );

        res.json({
            success: true,
            data: {
                imageDataUrl: result
            }
        });
    } catch (error) {
        console.error('Brand asset generation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate brand asset'
        });
    }
});

// Story illustration generation
router.post('/story-illustration', authenticate, async (req, res) => {
    try {
        const { characterDescription, pageText } = req.body;

        if (!characterDescription || !pageText) {
            return res.status(400).json({
                success: false,
                message: 'Character description and page text are required'
            });
        }

        const result = await geminiService.generateStoryIllustration(
            characterDescription,
            pageText
        );

        res.json({
            success: true,
            data: {
                imageDataUrl: result
            }
        });
    } catch (error) {
        console.error('Story illustration generation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate story illustration'
        });
    }
});

module.exports = router;
