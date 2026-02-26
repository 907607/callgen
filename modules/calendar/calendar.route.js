import { Router } from "express";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "./calendar.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(protect); // Secure all calendar routes

/**
 * @swagger
 * tags:
 *   name: Calendar
 *   description: Calendar events and deadline scheduling
 */

/**
 * @swagger
 * /calendar:
 *   post:
 *     summary: Create a deadline-driven calendar task
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, dueAt]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Dentist Appointment"
 *               description:
 *                 type: string
 *               dueAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-10-15T10:00:00.000Z"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post("/", createTask);

/**
 * @swagger
 * /calendar:
 *   get:
 *     summary: Retrieve all assigned calendar tasks
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of mapped calendar tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", getTasks);

/**
 * @swagger
 * /calendar/{id}:
 *   get:
 *     summary: Retrieve a single calendar task
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task specific metadata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get("/:id", getTaskById);

/**
 * @swagger
 * /calendar/{id}:
 *   put:
 *     summary: Modify an existing calendar task
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *               dueAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task updated state
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.put("/:id", updateTask);

/**
 * @swagger
 * /calendar/{id}:
 *   delete:
 *     summary: Remove a scheduled calendar task
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete("/:id", deleteTask);

export default router;
