import { supabase } from "./supabase";
import { Todo } from "./interface";

export const getAllTodos = async (): Promise<Todo[] | null> => {
    const todos = await supabase.from("todo").select("*").order('id', {ascending: true});
    return todos.data;
};

export const addTodo = async (title:string):Promise<Todo> => {
    const { data, error } = await supabase.from("todo").insert({ title: title }).select();
    if(error){
        throw new Error("データ追加のエラー");
    }
    return data[0];
};

export const isCompletedTodo = async (id: number, isCompleted:boolean):Promise<Todo> => {
    const { data, error } = await supabase.from("todo").update({ isCompleted: isCompleted }).eq("id", id).select();
    if(error){
        throw new Error("完了・未完了のエラー");
    }
    return data[0];
};

export const deleteTodo = async (id: number):Promise<Todo> =>{
    const { data, error } = await supabase.from("todo").delete().eq("id", id).select()
    if(error){
        throw new Error("削除のエラー");
    }
    return data[0];
};