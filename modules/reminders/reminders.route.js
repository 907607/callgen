import { Router } from "express";
import { createReminder, getReminders, getReminderById, updateReminder, deleteReminder } from "./reminders.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(protect); // Secure all reminder routes

/**
 * @swagger
 * tags:
 *   name: Reminders
 *   description: Automated phone call reminders scheduling
 */

/**
 * @swagger
 * /reminders:
 *   post:
 *     summary: Schedule a new call reminder linked to a Todo
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [todoId, callTime]
 *             properties:
 *               todoId:
 *                 type: string
 *                 format: uuid
 *                 description: "ID of the Todo item to remind the user about"
 *               callTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-10-15T10:00:00.000Z"
 *     responses:
 *       201:
 *         description: Reminder scheduled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reminder'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post("/", createReminder);

/**
 * @swagger
 * /reminders:
 *   get:
 *     summary: Retrieve history and upcoming call reminders
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of reminder objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reminder'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", getReminders);

/**
 * @swagger
 * /reminders/{id}:
 *   get:
 *     summary: Get metadata of a specific reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reminder details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reminder'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get("/:id", getReminderById);

/**
 * @swagger
 * /reminders/{id}:
 *   put:
 *     summary: Update lifecycle state or time of a scheduled reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, CALLED, MISSED, COMPLETED]
 *                 description: "Current status of the reminder"
 *               callTime:
 *                 type: string
 *                 format: date-time
 *                 description: "New scheduled call time"
 *               retryCount:
 *                 type: integer
 *                 description: "Number of retries for the call"
 *     responses:
 *       200:
 *         description: Reminder updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reminder'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.put("/:id", updateReminder);

/**
 * @swagger
 * /reminders/{id}:
 *   delete:
 *     summary: Cancel a scheduled reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reminder cancelled and deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reminder deleted"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete("/:id", deleteReminder);

export default router;
