import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "./useAxiosPublic";
import { useState } from "react";

const useCamps = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const axiosPublic = useAxiosPublic();

    const {data: camps = [], refetch, isPending} = useQuery({
        queryKey: ["camps", search, currentPage, itemsPerPage],
        queryFn: async() => {
            const res = await axiosPublic.get(`/camps?search=${search}&page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        }
    })
    return [camps, refetch, isPending, search, setSearch, currentPage, setCurrentPage, itemsPerPage];
};

export default useCamps;