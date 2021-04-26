import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const Todos: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
	const text = (req.body as { text: string }).text;
	const newTodo = new Todo(Math.random().toString(), text);

	Todos.push(newTodo);

	res.json({ message: "Created the Todo.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
	res.json({ todos: Todos });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
	const todoId = req.params.id;
	const updatedText = (req.body as { text: string }).text;
	const todoIndex = Todos.findIndex((todo) => todo.id === todoId);
	if (todoIndex < 0) throw new Error("Could not Find Todo");

	Todos[todoIndex] = new Todo(Todos[todoIndex].id, updatedText);

	res.json({ message: "Updated", updatedTodo: Todos[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
	const todoId = req.params.id;
	const todoIndex = Todos.findIndex((todo) => todo.id === todoId);
	if (todoIndex < 0) throw new Error("Could not Find Todo");

	Todos.splice(todoIndex, 1);

	res.json({ message: "Todo deleted" });
};
