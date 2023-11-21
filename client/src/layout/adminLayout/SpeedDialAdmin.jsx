import React from 'react';
import { useSelector } from "react-redux";
import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
} from "@material-tailwind/react";
import {
    ArchiveBoxXMarkIcon,
    ArrowUpTrayIcon,
    ClockIcon,
    PencilSquareIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { icon } from '../../ADMIN/routes';
const SpeedDialAdmin = ({ handleUpdateStatus = () => { }, handleEdit = () => { }, detail = {}, idEntity = '' }) => {
    const { infoAdmin } = useSelector((state) => state.admin);
    return (
        <>
            <div className="py-5 w-full flex items-center justify-end pr-5 sticky bottom-0">
                <div className="flex gap-5 items-center">
                    <SpeedDial>
                        <SpeedDialHandler>
                            <IconButton
                                size="lg"
                                className="rounded-full border-white border"
                            >
                                <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                            </IconButton>
                        </SpeedDialHandler>
                        <SpeedDialContent
                            className="rounded-full border  border-blue-gray-50 bg-white 
                                shadow-xl shadow-black/10"
                        >
                            <SpeedDialAction
                                onClick={() => handleUpdateStatus("destroy")}
                                className={`bg-red-500 text-white ${detail?.status === "destroy" ? "hidden" : ""
                                    }`}
                            >
                                <ArchiveBoxXMarkIcon {...icon} />
                            </SpeedDialAction>
                            <SpeedDialAction
                                onClick={() => handleUpdateStatus("pending")}
                                className={`bg-yellow-500 text-black ${detail?.status === "pending" ? "hidden" : ""
                                    }`}
                            >
                                <ClockIcon {...icon} />
                            </SpeedDialAction>
                            <SpeedDialAction
                                onClick={() => handleUpdateStatus("approved")}
                                className={`bg-green-500 text-white ${detail?.status === "approved" ? "hidden" : ""
                                    }`}
                            >
                                <ArrowUpTrayIcon {...icon} />
                            </SpeedDialAction>
                            {idEntity === infoAdmin?._id && <SpeedDialAction
                                className="bg-primary text-white"
                                onClick={handleEdit}
                            >
                                <PencilSquareIcon {...icon} />
                            </SpeedDialAction>}
                        </SpeedDialContent>
                    </SpeedDial>
                </div>
            </div>
        </>
    );
};

export default SpeedDialAdmin;