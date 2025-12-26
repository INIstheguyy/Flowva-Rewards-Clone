import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useNotifications() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async () => {
      console.log("🔍 Fetching notifications for user:", user?.id); // DEBUG

      if (!user?.id) {
        console.log("❌ No user ID"); // DEBUG
        return [];
      }

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      console.log("📬 Notifications data:", data); // DEBUG
      console.log("❌ Notifications error:", error); // DEBUG

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const markAsRead = useMutation({
    mutationFn: async (notificationId) => {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notificationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", user?.id]);
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", user?.id]);
    },
  });

  const deleteAll = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", user?.id]);
    },
  });

  const deleteOne = useMutation({
    mutationFn: async (notificationId) => {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", notificationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", user?.id]);
    },
  });

  const unreadCount = query.data?.filter((n) => !n.is_read).length || 0;

  return {
    notifications: query.data || [],
    isLoading: query.isLoading,
    unreadCount,
    markAsRead: markAsRead.mutate,
    markAllAsRead: markAllAsRead.mutate,
    deleteAll: deleteAll.mutate,
    deleteOne: deleteOne.mutate,
  };
}
