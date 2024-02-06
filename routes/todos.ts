import { Router } from "express";
import { Todo } from "../models/todo";

const todos: Todo[] = [];

const router = Router();

router.get("/api/todos", (req, res, next) => {
	res.status(200).json({ todos });
});

router.post("/api/todos", (req, res, next) => {
	const todo: Todo = { id: new Date().toISOString(), text: req.body.text };
	todos.push(todo);
	res.status(201).json({ todo });
});

export default router;
