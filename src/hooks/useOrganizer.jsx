import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import useAuth from "./useAuth";

const useOrganizer = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: organizer, isPending } = useQuery({
    queryKey: ["organizer", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/organizer/${user?.email}`);
      return res.data?.organizer;
    },
  });

  return [organizer, isPending];
};

export default useOrganizer;