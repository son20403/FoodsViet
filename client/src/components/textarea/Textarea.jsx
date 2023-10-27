import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build';
import React, { useEffect, useRef } from 'react';
import { useController } from 'react-hook-form';
import { Typography } from '../typography';
import { uploadPlugin } from './plugin';
import './style.css'
const Textarea = ({ name, control, value = '', errors }) => {
    const { field } = useController({ name, control, defaultValue: value, rules: { required: true } });

    const isErr = !!errors?.[name]
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            const editorElement = editorRef.current.querySelector(".ck.ck-editor");
            if (isErr) {
                editorElement?.classList.add('isErr');
            } else {
                editorElement?.classList.remove('isErr');
            }
        }
    }, [isErr]);
    return (
        <div ref={editorRef} className='textarea_custom'>
            <CKEditor
                config={{
                    placeholder: 'Nhập nội dung...',
                    extraPlugins: [uploadPlugin],
                }}
                {...field}
                editor={Editor}
                data={field.value}
                onBlur={field.onBlur}
                onFocus={() => { }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    field.onChange(data);
                }}
            />
            {isErr ? (
                <Typography error={errors?.[name]} className={' text-xs text-[#E74C3C]'}>
                    {errors?.[name]?.message}</Typography>
            ) : null}
        </div>
    );
};

export default Textarea;