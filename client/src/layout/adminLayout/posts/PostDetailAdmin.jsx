import React from 'react';
import ModalBase from '../../modal/ModalBase';
import { Heading } from '../../../components/heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const PostDetailAdmin = ({ onClick, show, data, customers, categories }) => {
    return (
        <ModalBase onClose={onClick} visible={show} >
            <div className=' fixed top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2   page-content z-[100]  
            rounded-lg overflow-hidden '>
                <div className='zoom  bg-blue-gray-50 max-h-[650px] overflow-y-auto transition-all'>
                    <div className='absolute top-2 right-5 text-2xl text-primary cursor-pointer z-10' onClick={onClick}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className='w-full  py-32 
                    lg:py-44  bg-cover bg-center h-auto overflow-hidden relative  md:min-h-[300px] rounded-lg'
                        style={{ backgroundImage: `url(${data?.image})` }}>
                        <div className='absolute inset-0 bg-black bg-opacity-70'>
                            <div className='page-content px-5 mt-3 lg:px-10 flex flex-col h-full text-white flex-1
                            justify-center items-center' >
                                <Heading isHeading className='lg:text-3xl md:text-3xl text-2xl font-normal text-center md:text-start
                            lg:leading-normal leading-normal'>
                                    {data?.title}
                                </Heading>
                                <div className='text-white text-xs md:text-sm lg:text-base uppercase opacity-80  mt-10 flex '>
                                    <div
                                        className='px-2 border-r last:border-none'>{customers?.full_name}</div>
                                    <div className='px-2 border-r last:border-none'>{data?.date} </div>
                                    <div
                                        className='px-2 border-r last:border-none'>{categories?.title}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' w-full  p-1 md:p-5  '>
                        <div className=' bg-white md:p-5 p-1 rounded-lg'>
                            <div className='mb-10 w-full max-w-[800px] m-auto'>
                                <img src={data?.image} alt="" className='w-full max-h-[400px] object-cover
                                rounded-lg' />
                            </div>
                            <div className='text-xs leading-6 md:text-sm lg:text-base'>
                                <div dangerouslySetInnerHTML={{ __html: data?.content }}
                                    className='content_post !text-xs md' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalBase>
    );
};
export default PostDetailAdmin;