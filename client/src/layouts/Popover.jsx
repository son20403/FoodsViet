import {
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import { EllipsisIcon } from "../components/Icon";
import { useEffect, useState } from "react";

export function PopoverDrop({ children, x = 0 }) {
    const [xValue, setXValue] = useState(x);

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth <= 640) {
                setXValue(x);
            } else {
                setXValue(-80);
            }
        };
        window.addEventListener("resize", handleWindowResize);
        handleWindowResize();
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);
    return (
        <Popover
            animate={{
                mount: { scale: 1, x: 0 },
                unmount: { scale: 0, x: xValue },
            }}
            placement="right"
        >
            <PopoverHandler>
                <div className="cursor-pointe ">
                    <EllipsisIcon />
                </div>
            </PopoverHandler>
            <PopoverContent>
                {children}
            </PopoverContent>
        </Popover>
    );
}