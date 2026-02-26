import { asyncHandler } from "../../utils/asyncHandler.js";
import * as todosService from "./todos.service.js";

export const createTodo = asyncHandler(async (req, res) => {
    const todo = await todosService.createTodo(req.user.id, req.body);
    res.status(201).json({ success: true, data: todo });
});

export const getTodos = asyncHandler(async (req, res) => {
    const todos = await todosService.getTodos(req.user.id);
    res.json({ success: true, data: todos });
});

export const getTodoById = asyncHandler(async (req, res) => {
    const todo = await todosService.getTodoById(req.user.id, req.params.id);
    res.json({ success: true, data: todo });
});

export const updateTodo = asyncHandler(async (req, res) => {
    const todo = await todosService.updateTodo(req.user.id, req.params.id, req.body);
    res.json({ success: true, data: todo });
});

export const deleteTodo = asyncHandler(async (req, res) => {
    await todosService.deleteTodo(req.user.id, req.params.id);
    res.json({ success: true, message: "Todo deleted successfully" });
});
