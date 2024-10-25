import { supabase } from "./supabase";

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
    const { data, error } = await supabase.from("todo").update({ isCompleted: isCompleted }).eq("id", id).select();
    if(error){
        throw new Error("完了・未完了のエラー");
    }
    return data[0];
};

export const deleteTodo = async (id: number) =>{
    const { data, error } = await supabase.from("todo").delete().eq("id", id).select()
    if(error){
        throw new Error("削除のエラー");
    }if(data == null){
        return null;
    }
    return data[0];
};