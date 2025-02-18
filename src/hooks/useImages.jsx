import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { useAxiosSecure } from "./useAxiosSecure";

const useImages = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: aiImages = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["aiImages", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/ai-images/${user?.email}`);
      return response.data;
    },
  });
  return [aiImages, isPending, refetch];
};

export default useImages;
