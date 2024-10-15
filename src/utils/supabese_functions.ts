import { supabase } from "./supabese";

export const getAllTodos = async () => {
    const todos = await supabase.from("todo").select("*");
    return todos.data;
};

export const addTodo = async (title:string) => {
    await supabase.from("todo").insert({ title: title })
};

export const completedTodo = async (completed:boolean) => {
    await supabase.from("todo").insert({ completed: completed })
};

export const deleteTodo = async (id: number) =>{
    await supabase.from("todo").delete().eq("id", id)
};