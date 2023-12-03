import React from 'react';
import {
    Typography,
} from "@material-tailwind/react";
import {
    ClockIcon,
    BanknotesIcon,
    UserPlusIcon,
    UserIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";
import StatisticsCard from '../../layout/adminLayout/chart/statistics-card';
import StatisticsChart from '../../layout/adminLayout/chart/statistics-chart';
import TopCustomerInteract from '../../layout/adminLayout/chart/TopCustomerInteract';
const HomeAdmin = () => {
    return (
        <div className="mt-12">
            <TopCustomerInteract></TopCustomerInteract>
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
                    <StatisticsCard
                        key={title}
                        {...rest}
                        title={title}
                        icon={React.createElement(icon, {
                            className: "w-6 h-6 text-white",
                        })}
                        footer={
                            <Typography className="font-normal text-blue-gray-600">
                                <strong className={footer.color}>{footer.value}</strong>
                                &nbsp;{footer.label}
                            </Typography>
                        }
                    />
                ))}
            </div>
            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                {statisticsChartsData.map((props) => (
                    <StatisticsChart
                        key={props.title}
                        {...props}
                        footer={
                            <Typography
                                variant="small"
                                className="flex items-center font-normal text-blue-gray-600"
                            >
                                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                                &nbsp;{props.footer}
                            </Typography>
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeAdmin;

const statisticsCardsData = [
    {
        color: "blue",
        icon: BanknotesIcon,
        title: "Today's Money",
        value: "$53k",
        footer: {
            color: "text-green-500",
            value: "+55%",
            label: "than last week",
        },
    },
    {
        color: "pink",
        icon: UserIcon,
        title: "Today's Users",
        value: "2,300",
        footer: {
            color: "text-green-500",
            value: "+3%",
            label: "than last month",
        },
    },
    {
        color: "green",
        icon: UserPlusIcon,
        title: "New Clients",
        value: "3,462",
        footer: {
            color: "text-red-500",
            value: "-2%",
            label: "than yesterday",
        },
    },
    {
        color: "orange",
        icon: ChartBarIcon,
        title: "Sales",
        value: "$103,430",
        footer: {
            color: "text-green-500",
            value: "+5%",
            label: "than yesterday",
        },
    },
];

const chartsConfig = {
    chart: {
        toolbar: {
            show: false,
        },
    },
    title: {
        show: "",
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        labels: {
            style: {
                colors: "#fff",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: 300,
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: "#fff",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: 300,
            },
        },
    },
    grid: {
        show: true,
        borderColor: "#ffffff40",
        strokeDashArray: 5,
        xaxis: {
            lines: {
                show: true,
            },
        },
        padding: {
            top: 5,
            right: 20,
        },
    },
    fill: {
        opacity: 0.8,
    },
    tooltip: {
        theme: "dark",
    },
};


const websiteViewsChart = {
    type: "bar",
    height: 220,
    series: [
        {
            name: "Views",
            data: [50, 20, 10, 22, 50, 10, 40],
        },
    ],
    options: {
        ...chartsConfig,
        colors: "#fff",
        plotOptions: {
            bar: {
                columnWidth: "16%",
                borderRadius: 5,
            },
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: ["M", "T", "W", "T", "F", "S", "S"],
        },
    },
};

const dailySalesChart = {
    type: "line",
    height: 220,
    series: [
        {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
    ],
    options: {
        ...chartsConfig,
        colors: ["#fff"],
        stroke: {
            lineCap: "round",
        },
        markers: {
            size: 5,
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
    },
};

const completedTasksChart = {
    ...dailySalesChart,
    series: [
        {
            name: "Tasks",
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        },
    ],
};

export const statisticsChartsData = [
    {
        color: "blue",
        title: "Website View",
        description: "Last Campaign Performance",
        footer: "campaign sent 2 days ago",
        chart: websiteViewsChart,
    },
    {
        color: "pink",
        title: "Daily Sales",
        description: "15% increase in today sales",
        footer: "updated 4 min ago",
        chart: dailySalesChart,
    },
    {
        color: "green",
        title: "Completed Tasks",
        description: "Last Campaign Performance",
        footer: "just updated",
        chart: completedTasksChart,
    },
];

