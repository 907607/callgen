import { Router } from "express";
import { firebaseLogin } from "./auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Firebase phone authentication
 */

/**
 * @swagger
 * /auth/firebase-login:
 *   post:
 *     summary: Verify Firebase IdToken and securely login
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firebaseToken]
 *             properties:
 *               firebaseToken:
 *                 type: string
 *                 description: "IdToken retrieved from Firebase Auth frontend SDK"
 *     responses:
 *       200:
 *         description: Auth success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: "CallGenZ backend JWT for subsequent requests"
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5c..."
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Firebase Admin not initialized properly on server
 */
router.post("/firebase-login", firebaseLogin);

export default router;
