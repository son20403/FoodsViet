import React from 'react';
import { Select as SelectCustom, Option } from "@material-tailwind/react";
import { useController } from 'react-hook-form';

const Select = ({ name, control, data = [], value = '' }) => {
    const { field } = useController({ name, control, defaultValue: value });
    if (data && data.length > 0) {
        return (
            <SelectCustom variant="standard" label="Danh mục" {...field}>
                {data?.length > 0 && data.map((item) => (
                    <Option key={item?._id} value={item?._id}>{item?.title}</Option>
                ))}
            </SelectCustom>
        );
    } if (!data && data.length < 1) {
        return (<SelectCustom variant="standard" label="Danh mục"  {...field}>
            <Option>Loading....</Option>
        </SelectCustom>)
    }
};

export default Select;