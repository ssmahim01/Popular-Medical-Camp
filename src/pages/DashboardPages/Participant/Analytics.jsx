import useAuth from "../../../hooks/useAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: analyticsData = [], isLoading } = useQuery({
    queryKey: ["analyticsData", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/analytics/${user?.email}`);
      return response.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="py-6">
      <h2 className="md:text-4xl text-2xl font-extrabold mb-8">
        <span className="text-gray-800">Welcome back, </span>
        <span className="text-violet-600">{user?.displayName}</span>
      </h2>

      {analyticsData.length === 0 ? (
        <p className="text-rose-600 text-2xl font-bold text-center lg:pt-16 pt-6">
          No registered camps found
        </p>
      ) : (
        <>          
          <div className="lg:block hidden">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="campFees" fill="#82ca9d" name="Camp Fees" />
              <Bar
                dataKey="age"
                fill="#8884d8"
                name="Age"
              />
              <Bar
                dataKey="participantCount"
                fill="#ffc658"
                name="Participants"
              />
            </BarChart>
          </ResponsiveContainer>
          </div>
          
         <div className="lg:hidden block">
         <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="campFees" fill="#82ca9d" name="Camp Fees" />
              <Bar
                dataKey="age"
                fill="#8884d8"
                name="Age"
              />
              <Bar
                dataKey="participantCount"
                fill="#ffc658"
                name="Participants"
              />
            </BarChart>
          </ResponsiveContainer>
         </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
