import { FaUsers } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { IoAnalyticsSharp, IoCheckmarkDoneCircle } from "react-icons/io5";
import { TbCoinTakaFilled } from "react-icons/tb";

const OrganizerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: organizerStats = [] } = useQuery({
    queryKey: ["organizerStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/organizer-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registers-stats");
      return res.data;
    },
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <>
      <div className="bg-purple-600 lg:h-40 md:h-32 h-24 flex justify-center items-center">
        <h2 className="text-center lg:text-5xl text-white text-opacity-90 md:text-4xl text-2xl font-extrabold">
          Dashboard
        </h2>
      </div>
      <div className="w-11/12 md:my-10 my-8 mx-auto">
        <div className="stats md:stats-horizontal stats-vertical md:mx-0 lg:inline-flex block mx-auto shadow-sm">
          <div className="stat">
            <div className="stat-figure text-cyan-600">
              <IoCheckmarkDoneCircle className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Registered</div>
            <div className="stat-value text-cyan-600">
              {organizerStats?.registers}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure">
              <FaUsers className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value">{organizerStats?.users}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-purple-600">
              <TbCoinTakaFilled className="w-8 h-8" />
            </div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value text-purple-600">
              {organizerStats?.fees}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-cyan-600">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src={user?.photoURL} alt={user?.displayName} />
                </div>
              </div>
            </div>
            <div className="stat-value">{organizerStats?.camps}</div>
            <div className="stat-title">Total Camps</div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto">
        <h3 className="flex gap-2 md:text-4xl text-2xl text-gray-900 items-center font-bold mb-6">
          <span>Registered Camps Analytics</span>{" "}
          <IoAnalyticsSharp className="text-2xl" />
        </h3>
        {chartData.length === 0 ? (
          <p className="text-rose-600 text-2xl font-bold text-center lg:pt-16 pt-6">
            No Data found
          </p>
        ) : (
          <>
            <div className="lg:block hidden">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="campName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="campFees"
                    shape={<TriangleBar />}
                    label={{ position: "top" }}
                    fill="#0088FE"
                    name="Camp Fees"
                  />
                  <Bar
                    dataKey="participantCount"
                    fill="#8884d8"
                    name="Participants"
                    shape={<TriangleBar />}
                    label={{ position: "top" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="lg:hidden block">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="campName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="campFees"
                    shape={<TriangleBar />}
                    label={{ position: "top" }}
                    fill="#82ca9d"
                    name="Camp Fees"
                  />
                  <Bar
                    dataKey="participantCount"
                    fill="#ffc658"
                    shape={<TriangleBar />}
                    label={{ position: "top" }}
                    name="Participants"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrganizerHome;
