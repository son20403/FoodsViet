import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function DiaLog({ open = false, handleOpen = () => { }, onClick = () => { }, header = '', title = '', ...props }) {
    return (
        <>
            <Dialog open={open} handler={handleOpen} className="pt-14">
                <div className="flex items-center justify-center">
                    <DialogHeader>{header}</DialogHeader>
                </div>
                <DialogBody>
                    <div className="flex items-center justify-center">
                        {title}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Hủy</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={onClick}>
                        <span>Chấp nhận</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}