import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "./useAxiosPublic";
import { useState } from "react";

const useCamps = () => {
    const [search, setSearch] = useState("");
    const axiosPublic = useAxiosPublic();

    const {data: camps = [], refetch, isPending} = useQuery({
        queryKey: ["camps", search],
        queryFn: async() => {
            const res = await axiosPublic.get(`/camps?search=${search}`);
            return res.data;
        }
    })
    return [camps, refetch, isPending, search, setSearch];
};

export default useCamps;