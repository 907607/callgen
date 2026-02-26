import { Router } from "express";
import { getMe, updateMe, deleteMe } from "./users.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(protect); // All user routes require authentication

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and identity management
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retrieve current logged-in user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get("/me", getMe);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update current user profile details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               age:
 *                 type: integer
 *                 example: 28
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put("/me", updateMe);

/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: Delete current user account and all associated data
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.delete("/me", deleteMe);

export default router;
