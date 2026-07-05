import { supabase } from "./supabaseClient";

export const ordersAPI = {
  async fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },

  async createOrder(payload) {
    const clean = Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== undefined)
    );
    const { error } = await supabase.from("orders").insert([clean]);
    if (error) throw new Error(error.message);
  },

  async updateStatus(id, status) {
    const { error } = await supabase
      .from("orders").update({ status }).eq("id", id);
    if (error) throw new Error(error.message);
  },

  async updatePaymentStatus(id, payment_status) {
    const { error } = await supabase
      .from("orders").update({ payment_status }).eq("id", id);
    if (error) throw new Error(error.message);
  },

  async deleteOrder(id) {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
