import { supabase } from "./supabaseClient";

export const membersAPI = {
  /** Register member baru — buat akun Auth + insert ke tabel members */
  async register(fullName, email, phone, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);

    const userId = data.user?.id;
    if (userId) {
      const { error: memberError } = await supabase
        .from("members")
        .insert([{ id: userId, full_name: fullName, email, phone, loyalty: "Bronze", total_orders: 0 }]);
      if (memberError) throw new Error(memberError.message);
    }
    return data;
  },

  /** Login member */
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data;
  },

  /** Logout */
  async logout() {
    await supabase.auth.signOut();
  },

  /** Ambil profil member berdasarkan auth user id */
  async getProfile(userId) {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  /** Ambil semua orders milik member (berdasarkan email) */
  async getMyOrders(email) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("member_email", email)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },

  /** Update loyalty dan total_orders setelah order baru */
  async updateLoyalty(userId) {
    // Ambil jumlah order member ini
    const { data: member } = await supabase
      .from("members")
      .select("total_orders, email")
      .eq("id", userId)
      .single();

    if (!member) return;

    const newTotal = (member.total_orders || 0) + 1;
    const loyalty =
      newTotal >= 10 ? "Gold" :
      newTotal >= 5  ? "Silver" : "Bronze";

    await supabase
      .from("members")
      .update({ total_orders: newTotal, loyalty })
      .eq("id", userId);
  },
};
