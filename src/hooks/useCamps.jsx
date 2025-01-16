import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "./useAxiosPublic";

const useCamps = () => {
    const axiosPublic = useAxiosPublic();

    const {data: camps = [], refetch, isPending} = useQuery({
        queryKey: ["camps", search, sorted],
        queryFn: async() => {
            const res = await axiosPublic.get("/camps");
            return res.data;
        }
    })
    return [camps, refetch, isPending];
};

export default useCamps;