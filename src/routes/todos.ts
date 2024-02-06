import { Router } from "express";
import { Todo } from "../models/todo";

type TodosRequestBody = { text: string };

let todos: Todo[] = [];

const router = Router();

router.get("/api/todos", (req, res, next) => {
	res.status(200).json(todos);
});

router.post("/api/todos", (req, res, next) => {
	const body = req.body as TodosRequestBody;
	const todo: Todo = {
		id: new Date().toISOString().replace(/[.:]/g, "-"),
		text: body.text,
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

router.put("/api/todos/:id", (req, res, next) => {
	const body = req.body as TodosRequestBody;
	const id = req.params.id;
	const targetTodoIndex = todos.findIndex((todo) => todo.id === id);
	if (targetTodoIndex === -1) return res.status(404).json(null);
	const targetTodo = todos[targetTodoIndex];
	targetTodo.text = body.text;
	res.status(200).json(targetTodo);
});

export default router;
