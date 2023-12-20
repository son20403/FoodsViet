import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {
    Typography,
} from "@material-tailwind/react";
import {
    NewspaperIcon,
    Square3Stack3DIcon,
    UserIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import StatisticsCard from '../../layout/adminLayout/chart/statistics-card';
import StatisticsChart from '../../layout/adminLayout/chart/statistics-chart';
import TopCustomerInteract from '../../layout/adminLayout/chart/TopCustomerInteract';
import { statisticalCategoriesRequest, statisticalCustomersRequest, statisticalFeedbacksRequest, statisticalPostsRequest } from '../../sagas/admin/adminSlice';
const HomeAdmin = () => {
    const { statistical_customers, statistical_feedbacks, statistical_posts,
        statistical_categories, posts, categories, customers } =
        useSelector((state) => state.admin);
    const { feedback } = useSelector((state) => state.feedback)
    const statisticalByDayCustomer = statistical_customers?.statisticalByMonth
    const statisticalByDayFeedback = statistical_feedbacks?.statisticalByMonth
    const statisticalByDayPost = statistical_posts?.statisticalByMonth
    const statisticalByDayCategory = statistical_categories?.statisticalByMonth
    const totalPosts = posts?.length || 0
    const totalCategories = categories?.length || 0
    const totalFeedbacks = feedback?.length || 0
    const totalCustomers = customers?.length || 0
    let dayByCustomer = []
    let dataByCustomer = []
    let dayByFeedback = []
    let dataByFeedback = []
    let dayByPost = []
    let dataByPost = []
    let dayByCategory = []
    let dataByCategory = []
    const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
    pushData(statisticalByDayCustomer, dayByCustomer, dataByCustomer)
    pushData(statisticalByDayFeedback, dayByFeedback, dataByFeedback)
    pushData(statisticalByDayPost, dayByPost, dataByPost)
    pushData(statisticalByDayCategory, dayByCategory, dataByCategory)
    function pushData(statiscal, day, data) {
        statiscal?.map((item) => {
            day.push(item?._id.slice(5))
        })
        statiscal?.map((item) => {
            data.push(item?.count)
        })
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(statisticalCustomersRequest({ model: 'customer' }))
        dispatch(statisticalFeedbacksRequest({ model: 'feedback' }))
        dispatch(statisticalPostsRequest({ model: 'post' }))
        dispatch(statisticalCategoriesRequest({ model: 'category' }))
    }, []);
    const feedbackChart = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Phản hồi",
                data: dataByFeedback,
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
                categories: months,
            },
        },
    };
    const customerChart = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Người dùng",
                data: dataByCustomer,
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
                categories: months,
            },
        },
    };
    const postChart = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Bài viết",
                data: dataByPost,
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
                categories: months,
            },
        },
    };
    const categoryChart = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Danh mục",
                data: dataByCategory,
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
                categories: months,
            },
        },
    };
    const statisticsChartsData = [
        {
            color: "blue",
            title: "Thống kê bài viết",
            chart: postChart,
        },
        {
            color: "pink",
            title: "Thống kê người dùng",
            chart: customerChart,
        },
        {
            color: "green",
            title: "Thống kê danh mục",
            chart: categoryChart,
        },
        {
            color: "orange",
            title: "Thống kê phản hồi",
            chart: feedbackChart,
        },
    ];
    const statisticsCardsData = [
        {
            color: "blue",
            icon: NewspaperIcon,
            title: "Bài viết",
            value: totalPosts,
        },
        {
            color: "pink",
            icon: UserIcon,
            title: "Người dùng",
            value: totalCustomers,
        },
        {
            color: "green",
            icon: Square3Stack3DIcon,
            title: "Danh mục",
            value: totalCategories,
        },
        {
            color: "orange",
            icon: ChatBubbleLeftRightIcon,
            title: "Phản hồi",
            value: totalFeedbacks,
        },
    ];
    return (
        <div className="mt-12">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {statisticsCardsData.map(({ icon, title, ...rest }) => (
                    <StatisticsCard
                        key={title}
                        {...rest}
                        title={title}
                        icon={React.createElement(icon, {
                            className: "w-6 h-6 text-white",
                        })}
                    />
                ))}
            </div>
            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 ">
                {statisticsChartsData.map((props) => (
                    <StatisticsChart
                        key={props.title}
                        {...props}
                    />
                ))}
            </div>
            <TopCustomerInteract></TopCustomerInteract>
        </div>
    );
};

export default HomeAdmin;

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
            show: true,
        },
        axisBorder: {
            show: true,
        },
        labels: {
            style: {
                colors: "#fff",
                fontSize: "12px",
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

