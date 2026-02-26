import { Router } from "express";
import { saveToken, getTokens, removeToken } from "./notifications.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(protect); // Secure all notification routes

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: FCM Push Token registration and device tracking
 */

/**
 * @swagger
 * /notifications/tokens:
 *   post:
 *     summary: Register a new device push token
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token:
 *                 type: string
 *                 description: "The unique FCM token generated from the client device"
 *                 example: "eXunG_dFk...R8A2B8"
 *     responses:
 *       201:
 *         description: Push token registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token saved"
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post("/tokens", saveToken);

/**
 * @swagger
 * /notifications/tokens:
 *   get:
 *     summary: Retrieve all active push tokens for the user
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Array of registered device tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   token:
 *                     type: string
 *                   userId:
 *                     type: string
 *                     format: uuid
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/tokens", getTokens);

/**
 * @swagger
 * /notifications/tokens/{id}:
 *   delete:
 *     summary: Unregister a specific push token
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token removed"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete("/tokens/:id", removeToken);

export default router;
