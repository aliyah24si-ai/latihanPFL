import { supabase } from "./supabaseClient";

export const ordersAPI = {
  /**
   * Ambil semua orders, urut dari terbaru
   */
  async fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Tambah order baru (dipanggil dari halaman Guest)
   */
  async createOrder(payload) {
    // Hapus field yang undefined/null agar tidak conflict
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, v]) => v !== undefined)
    );
    const { data, error } = await supabase
      .from("orders")
      .insert([cleanPayload]);
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Update status order (dipanggil dari halaman admin Orders)
   */
  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Hapus order
   */
  async deleteOrder(id) {
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
  },
};
