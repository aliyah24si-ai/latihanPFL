import { supabase } from "./supabaseClient";

export const promosAPI = {
  async fetchAll() {
    const { data, error } = await supabase
      .from("promos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("promos")
      .insert([payload])
      .select();
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("promos")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from("promos")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
  },
};
