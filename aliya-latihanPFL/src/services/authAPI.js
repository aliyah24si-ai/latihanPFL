import { supabase } from "./supabaseClient";

export const authAPI = {
  /**
   * Login dengan email + password via Supabase Auth
   */
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Register akun baru via Supabase Auth, lalu simpan profil ke tabel profiles
   */
  async register(fullName, email, password) {
    // 1. Buat akun di Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);

    // 2. Simpan data profil ke tabel profiles
    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: userId, full_name: fullName, email, role: "user" }]);
      if (profileError) throw new Error(profileError.message);
    }

    return data;
  },

  /**
   * Logout
   */
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  /**
   * Ambil session aktif
   */
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
};
