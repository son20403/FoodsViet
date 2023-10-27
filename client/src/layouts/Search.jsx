import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Heading } from '../components/heading';
import Overlay from './common/Overlay';
import { SearchIcon } from '../components/Icon';
import { Input } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import { Link } from 'react-router-dom';
import { searchPostsRequest } from '../sagas/posts/postsSlice';
import Loading from './loading/Loading';

const Search = ({ showSearch, handleShowSearch }) => {
    const dispatch = useDispatch()
    const { search_posts, loading } = useSelector((state) => state.posts)
    const [query, setQuery] = useState('');
    const handleOnChange = _.debounce((e) => {
        setQuery(e.target.value)
    }, 1000)
    useEffect(() => {
        dispatch(searchPostsRequest({ query }))
    }, [query]);

    return (
        <>
            <Overlay show={showSearch} onClick={handleShowSearch}></Overlay>
            <div className={`flex-1 absolute bg-white-cream bg-opacity-90 flex w-full justify-center gap-5 
            transition-all backdrop-blur text-black
                left-0 flex-col px-5 py-5 text-sm z-[12] shadow-soft border-t border-primary bad
                ${showSearch ? 'top-0' : 'invisible -top-[500px]'}`}
            >
                <div className='absolute top-2 right-2 text-2xl text-primary cursor-pointer' onClick={handleShowSearch}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className='page-content'>
                    <Input variant="standard" label={'Nhập nội dung tìm kiếm'} onChange={handleOnChange}
                        icon={<SearchIcon />}></Input>
                    <div className='flex flex-col  overflow-y-auto max-h-full'>
                        {loading && <Loading />}
                        {!loading && search_posts?.length > 0 ? search_posts?.slice(0, 5).map((item) => (
                            <SearchItem key={item._id} data={item}></SearchItem>
                        )) : <span className='text-center my-4'>Không có dữ liệu</span>}
                    </div>
                    {search_posts?.length > 5 && (
                        <div className=' flex w-full justify-center'>
                            <Link to={`/posts?query=${query}`} className='text-xs text-primary px-2 py-1 border 
                            max-w-[200px] border-primary'>Xem thêm</Link>
                        </div>
                    )}
                    <div>Kết quả tìm kiếm: ({search_posts?.length})
                    </div>
                </div>
            </div>
        </>
    );
};
const SearchItem = ({ data }) => {
    return (
        <Link to={`/detail/${data?.slug}`} className='flex gap-3 items-center border-b py-5 last:border-b-0'>
            <div className=' w-14 h-14 overflow-hidden rounded-md'>
                <img src={data?.image} alt=""
                    className='w-full h-full object-cover' />
            </div>
            <div className='flex-1'>
                <Heading className='text-xs md:text-sm'>
                    {data?.title}</Heading>
            </div>
        </Link>
    )
}

export default Search;