import { supabase } from "./supabaseClient";

export const menusAPI = {
  async fetchMenus() {
    const { data, error } = await supabase
      .from("menus")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },

  async createMenu(payload) {
    const { data, error } = await supabase
      .from("menus")
      .insert([payload])
      .select();
    if (error) throw new Error(error.message);
    return data;
  },

  async updateMenu(id, payload) {
    const { data, error } = await supabase
      .from("menus")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteMenu(id) {
    const { error } = await supabase
      .from("menus")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
  },
};
