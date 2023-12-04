import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Heading } from "../components/heading";
import Overlay from "./common/Overlay";
import { SearchIcon } from "../components/Icon";
import { Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Link, useLocation } from "react-router-dom";
import { searchPostsRequest } from "../sagas/posts/postsSlice";
import Loading from "./loading/Loading";
import { closeSearch } from "../sagas/global/globalSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { query } from "../axios-interceptor/query-api";

const SearchConversation = ({ onClick }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { customers, loading } = useSelector((state) => state.customers);
  const { infoAuth } = useSelector((state) => state.auth);
  const [filterCustomers, setFilterCustomers] = useState(null);
  const [showSearch, setShowSearch] = useState(true);
  const handleClose = () => {
    dispatch(closeSearch());
  };
  const [name, setName] = useState(null);
  const handleOnChange = _.debounce((e) => {
    setName(e.target.value);
  }, 1000);
  useEffect(() => {
    async function getData() {
      const res = await query().customers.getSearchCustomer({
        infoId: infoAuth?._id,
        query: name,
      });
      console.log("🚀 --> res --> res:", res);
      // const res = await axios.get(
      //   `http://localhost:8989/customer/search?key=${name}`
      // );
      if (res) {
        setFilterCustomers(res.data);
      }
    }
    getData();
  }, [name]);
  useEffect(() => {
    setName(null);
  }, [location.pathname]);
  return (
    <>
      <Overlay show={showSearch} onClick={onClick}></Overlay>
      <div
        className={`flex-1 absolute bg-white-cream bg-opacity-90 flex w-full justify-center gap-5 
            transition-all backdrop-blur text-black
                left-0 flex-col px-5 py-5 text-sm z-[12] shadow-soft border-t border-primary bad
                ${showSearch ? "top-0" : "invisible -top-[500px]"}`}
      >
        <div className="page-content">
          <Input
            variant="standard"
            label={"Nhập tên người dùng"}
            onChange={handleOnChange}
            icon={<SearchIcon />}
          ></Input>
          <div className="flex flex-col max-h-full overflow-y-auto">
            {/* {loading && <Loading />} */}
            {filterCustomers?.length > 0 ? (
              filterCustomers
                ?.slice(0, 5)
                .map((item) => (
                  <SearchItem
                    key={item._id}
                    data={item}
                    onClick={onClick}
                  ></SearchItem>
                ))
            ) : (
              <span className="my-4 text-center">Không có dữ liệu</span>
            )}
          </div>
          {filterCustomers?.length > 5 && (
            <div className="flex justify-center w-full ">
              <Link
                onClick={handleClose}
                to={`/posts?query=${query}`}
                className="text-xs text-primary px-2 py-1 border 
                            max-w-[200px] border-primary"
              >
                Xem thêm
              </Link>
            </div>
          )}
          <div>Kết quả tìm kiếm: ({filterCustomers?.length})</div>
        </div>
      </div>
    </>
  );
};
const SearchItem = ({ data, onClick }) => {
  return (
    <Link
      to={`/message/${data?._id}`}
      className="flex items-center gap-3 py-5 border-b last:border-b-0"
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-md w-14 h-14">
        <img src={data?.image} alt="" className="object-cover w-full h-full" />
      </div>
      <div className="flex-1">
        <Heading className="text-xs md:text-sm">{data?.full_name}</Heading>
      </div>
    </Link>
  );
};

export default SearchConversation;
