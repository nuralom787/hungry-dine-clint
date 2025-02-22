import { useContext } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaTruck, FaUsers, FaWallet } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    // Colors For Charts.
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


    // Load Admin Statistic Data.
    const { data: statistics, refetch, isPending } = useQuery({
        queryKey: ["statistics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/statistic");
            return res.data;
        }
    });


    // Load Admin Graph-Statistic Data.
    const { data: order_stats, refetch: refetch2, isPending: isPending2 } = useQuery({
        queryKey: ["graph-statistics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/graph-statistics");
            return res.data;
        }
    });



    // ----------------- For Bar Chart ----------------------\\

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y} C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height} Z`;
    };

    // -------------------------------------------------------\\




    // ----------------- For Pai Chart ------------------------\\

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const paiChartData = order_stats?.map(data => {
        return { name: data.category, value: data.totalRevenue }
    })

    // ---------------------------------------------------------\\



    return (
        <section className="min-h-screen px-2 md:px-10 mt-4 md:mt-0 rounded-t-xl md:rounded-none bg-gray-300 dark:bg-base-300">
            <section className="max-h-screen overflow-y-auto">
                <h1 className='font-bold font-Cinzel my-10 text-xl text-[#151515] dark:text-white'>Hi! Welcome Back, <span className='uppercase font-Inter text-[#D1A054]'>{user?.displayName}</span></h1>
                {isPending ?
                    <div className="bg-base-200 p-2 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-32 w-full"></div>
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex justify-start items-center gap-4 py-8 px-4 rounded-xl bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] font-Inter font-bold text-white">
                            <FaWallet className="text-6xl" />
                            <div>
                                <h1 className="text-2xl">{statistics?.revenue.toFixed(2)}</h1>
                                <p className="text-lg font-light">Revenue</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-4 py-8 px-4 rounded-xl bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] font-Inter font-bold text-white">
                            <FaUsers className="text-6xl" />
                            <div>
                                <h1 className="text-2xl">{statistics?.users}</h1>
                                <p className="text-lg font-light">Users</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-4 py-8 px-4 rounded-xl bg-gradient-to-r from-[#FE4880] to-[#FECDE9] font-Inter font-bold text-white">
                            <MdFastfood className="text-6xl" />
                            <div>
                                <h1 className="text-2xl">{statistics?.menus}</h1>
                                <p className="text-lg font-light">Menus</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-4 py-8 px-4 rounded-xl bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] font-Inter font-bold text-white">
                            <FaTruck className="text-6xl" />
                            <div>
                                <h1 className="text-2xl">{statistics?.orders}</h1>
                                <p className="text-lg font-light">Orders</p>
                            </div>
                        </div>
                    </div>
                }
                <div className="divider before:bg-[#151515] dark:before:bg-white after:bg-[#151515] dark:after:bg-white"></div>
                {isPending2 ?
                    <div className="bg-base-200 p-2 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="skeleton h-96 w-full"></div>
                        <div className="skeleton h-96 w-full"></div>
                    </div>
                    :
                    <div className="flex flex-col lg:flex-row items-baseline mb-16">
                        <div className="w-full lg:w-1/2 h-[400px] mx-auto">
                            <ResponsiveContainer>
                                <BarChart
                                    data={order_stats}
                                    margin={{
                                        top: 20,
                                        right: 10,
                                        left: -15,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 2" />
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Bar dataKey="quantity" fill="red" shape={<TriangleBar />} label={{ position: 'top' }}>
                                        {order_stats?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                        ))}
                                    </Bar>
                                    <Tooltip />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full lg:w-1/2 h-[400px] mx-auto">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={paiChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {paiChartData?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        ))}
                                    </Pie>
                                    <Legend></Legend>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                }
            </section>
        </section>
    );
};

export default AdminHome;