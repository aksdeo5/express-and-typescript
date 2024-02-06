import { Router } from "express";
import { Todo } from "../models/todo";

let todos: Todo[] = [];

const router = Router();

router.get("/api/todos", (req, res, next) => {
	res.status(200).json(todos);
});

router.post("/api/todos", (req, res, next) => {
	const todo: Todo = {
		id: new Date().toISOString().replace(/[.:]/g, "-"),
		text: req.body.text,
	};
	todos.push(todo);
	res.status(201).json(todo);
});

router.delete("/api/todos/:id", (req, res, next) => {
	const id = req.params.id;
	const updatedTodos = todos.filter((todo) => todo.id !== id);
	if (updatedTodos.length === todos.length) return res.status(404).json(null);
	todos = updatedTodos;
	res.status(204).json(null);
});

router.put("/api/todos", (req, res, next) => {
	const updatedTodo = req.body;
	const updatedTodos = todos.filter((todo) => todo.id !== updatedTodo.id);
	if (updatedTodos.length === todos.length) return res.status(404).json(null);
	todos = updatedTodos;
	todos.push(updatedTodo);
	res.status(200).json(updatedTodo);
});

export default router;
