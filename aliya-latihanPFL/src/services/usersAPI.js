import { supabase } from "./supabaseClient";

export const usersAPI = {
  /**
   * Ambil semua data profiles
   */
  async fetchUsers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Tambah user baru (insert profil saja, tanpa membuat akun Auth)
   * Digunakan dari halaman admin untuk tambah data manual
   */
  async createUser(payload) {
    const { data, error } = await supabase
      .from("profiles")
      .insert([payload])
      .select();
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Update data profil berdasarkan id
   */
  async updateUser(id, payload) {
    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Hapus profil berdasarkan id
   */
  async deleteUser(id) {
    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
  },
};
