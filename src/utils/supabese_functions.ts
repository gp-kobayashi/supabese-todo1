import { supabase } from "./supabese";

export const getAllTodos = async () => {
    const todos = await supabase.from("todo").select("*").order('id', {ascending: true});
    return todos.data;
};

export const addTodo = async (title:string) => {
    const { data, error } = await supabase.from("todo").insert({ title: title }).select();
    if(error){
        throw new Error("データ追加のエラー");
    }
    return data[0].id;
};

export const isCompletedTodo = async (id: number, isCompleted:boolean) => {
    await supabase.from("todo").update({ isCompleted: isCompleted }).eq("id", id)
};

export const deleteTodo = async (id: number) =>{
    await supabase.from("todo").delete().eq("id", id)
};