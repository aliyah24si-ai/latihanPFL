import { supabase } from "./supabaseClient";

export const feedbackAPI = {
  /** Submit feedback baru dari member */
  async submit(payload) {
    const { data, error } = await supabase
      .from("feedbacks")
      .insert([{ ...payload, status: "pending" }])
      .select();
    if (error) throw new Error(error.message);
    return data;
  },

  /** Ambil semua feedback yang sudah approved (untuk halaman guest) */
  async fetchApproved() {
    const { data, error } = await supabase
      .from("feedbacks")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },

  /** Ambil semua feedback (untuk admin) */
  async fetchAll() {
    const { data, error } = await supabase
      .from("feedbacks")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },

  /** Approve feedback */
  async approve(id) {
    const { error } = await supabase
      .from("feedbacks")
      .update({ status: "approved" })
      .eq("id", id);
    if (error) throw new Error(error.message);
  },

  /** Reject / hapus feedback */
  async reject(id) {
    const { error } = await supabase
      .from("feedbacks")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
  },
};
