import instance from "./http";

export const getTodos = (listId) => instance.get(`/lists/${listId}/todos`);

export const createTodoInList = (listId, body) => instance.post(`/lists/${listId}/todos`, body);

export const updateTodo = (id, body) => instance.patch(`/todos/${id}`, body);

export const deleteTodo = (id) => instance.delete(`/todos/${id}`);