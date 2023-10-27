import { Link } from "react-router-dom"
import { Heading } from "../../components/heading"
import DataPost from "./DataPost"
import { useSelector } from "react-redux"
import FileIcon from "../../components/Icon/FileIcon"
import { useEffect } from "react"

const PostItem = ({ data = {}, isSingle }) => {
    const { comments } = useSelector((state) => state.comments);
    const { categories } = useSelector((state) => state.categories);
    const dataCategory = categories.filter((cate) => cate._id === data?.category)
    const commentByPosts = comments.filter((comment) => comment?.id_post === data?._id);

    useEffect(() => {
        const divElements = document.querySelectorAll('.content_post.post_item div');
        const pElements = document.querySelectorAll('.content_post.post_item p');
        divElements?.forEach(div => {
            if (div.textContent.trim() === '')
                div.style.display = 'none';
        });
        pElements?.forEach(p => {
            if (p.textContent.trim() === '')
                p.style.display = 'none';
        });
    }, []);
    return (
        <div className={`overflow-hidden col-span-2 flex flex-col md:flex-row group  h-full pb-0 gap-
            ${isSingle
                ? 'md:flex-col !col-span-1 gap-5'
                : 'md:even:flex-row-reverse'}
        `}>
            <Link to={`/detail/${data.slug}`}
                className={`w-full overflow-hidden h-full max-h-[350px]
                    ${isSingle
                        ? 'lg:max-w-full md:max-h-[190px] '
                        : ''}`}>
                <img src={data?.image} alt={data.title} className=' w-full h-full object-cover
                group-hover:scale-105 transition-all duration-500'/>
            </Link>
            <div className={` flex justify-center w-full md:h-full 
                ${isSingle
                    ? ''
                    : ' group-even:bg-blue-500 group-odd:bg-primary !bg-opacity-80 '} `}>

                <div className={`flex flex-col  w-full gap-y-3   
                    ${isSingle
                        ? 'flex-1 h-full lg:p-2 '
                        : 'justify-center items-center py-5 lg:px-5 md:px-4  '}`}>
                    <div className={`flex gap-x-2 text-primary font-medium 
                    ${isSingle
                            ? 'mb-auto'
                            : 'text-white '}`}><FileIcon />
                        <p className="text-[11px] uppercase lg:text-sm ">{dataCategory[0]?.title}</p>
                    </div>
                    <div className={`flex flex-col gap-y-2  lg:gap-y-5 ${isSingle ? 'h-full ' : ''}`}>
                        <Link className="" to={`/detail/${data.slug} `}>
                            <Heading className={`text-base leading-5 font-medium text-inherit 
                            ${isSingle
                                    ? 'text-primary'
                                    : 'lg:text-xl uppercase text-white text-center'}
                                    `}>
                                {data.title}
                            </Heading>
                        </Link>
                        <div className={`!bg-none ${isSingle
                            ? " line-clamp-4 lg:line-clamp-3 md:mt-auto"
                            : 'hidden'}`}>
                            <div dangerouslySetInnerHTML={{ __html: data?.content }}
                                className='content_post post_item !font-normal !text-gray-200 ' />
                        </div>
                    </div>
                    <DataPost className={isSingle ? 'mt-auto' : 'hidden'} timestamps={data?.timestamps}
                        comments={commentByPosts?.length}
                        likes={data?.likes}></DataPost>
                </div>
            </div>
        </div>
    )
}
export default PostItem