import React, { useEffect, useState, useRef } from "react";
import useDebounc from "../../hooks/useDebounc";
import { useNavigate } from "react-router-dom";
import { useGetHistoryQuery, useSearchQueryMutation, useUpdateHistoryMutation } from "../../redux/rtkQuery/search";
import { useSelector } from "react-redux";

const Search: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const history = useNavigate();
  const { data: historySearch, refetch } = useGetHistoryQuery(user?.sub, { skip: !user?.sub });
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);
  const [searchApi] = useSearchQueryMutation();
  const [updateHistory] = useUpdateHistoryMutation();
  const debounce = useDebounc(searchQuery, 500);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const clear = () => {
    setSearchQuery("");
    setIsSearchFocused(false);
  };
  const handleChooseQuery = async (query: string) => {
    const checkIsHave = historySearch.find((item: any) => item.query == query);
    if(!user || checkIsHave ){
      history(`/query?q=${query}`);
      return;
    }
    const payload = {
      customerId: user?.sub,
      value: query
    }
    try {
      await updateHistory(payload).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
      history(`/query?q=${query}`);
    }
  }
  useEffect(() => {
    if (!debounce.trim()) {
      setResult([]);
      return;
    }
    const fetchData = async () => {
      const response = await searchApi(debounce).unwrap();
      setResult(response);
    }
    fetchData();
  }, [debounce]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClickOutside = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsSearchFocused(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  return (
    <div className="flex flex-col relative flex-start items-center">
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-white sr-only dark:text-white"
        >
          Search
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg w-[900px] ">
          <span className="pl-5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0a7.5 7.5 0 1 0-10.607-10.607 7.5 7.5 0 0 0 10.607 10.607z"
              />
            </svg>
          </span>
          <input
            type="search"
            id="default-search"
            ref={inputRef}
            name="search"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Hôm nay bạn muốn mua gì ?"
            className="rounded-lg ml-3 flex-grow text-[14px] font-light border-transparent focus:border-transparent focus:ring-0 "
            required
          />
          <div className="text-white flex absolute right-3 bottom-1 cursor-pointer font-medium rounded-lg text-sm px-4 py-2">
            <div className="w-[1px] bg-gray-300 py-3 mx-4"></div>
            <button className=" text-primary text-[14px]">Tìm kiếm</button>
          </div>
        </div>
      </form>
      {isSearchFocused && result.length === 0 && (
        <div className="fixed inset-0 bg-gray-800 top-[76px] bg-opacity-50 z-40"></div>
      )}
      {isSearchFocused && (
        <div className="absolute top-12 z-50 w-full bg-white rounded-lg shadow-lg flex flex-col overflow-hidden items-start justify-start">
          <span className="text-sm font-light-bold p-4">Siêu sale tháng 8</span>
          {result && result.map((item: any, index: number) => (
            <div key={index} onClick={() => handleChooseQuery(item.name)} className="w-full">
              <div className="h-9 p-4 w-full hover:bg-gray-100 cursor-pointer flex items-center justify-start gap-2">
                <img
                  src="https://salt.tikicdn.com/ts/upload/e8/aa/26/42a11360f906c4e769a0ff144d04bfe1.png"
                  className="text-gray-200 h-8 w-8"
                  alt=""
                />
                <span className="text-sm">{item.name}</span>
              </div>
            </div>
          ))}
          {historySearch && searchQuery === "" && historySearch.map((item: any, index: number) => (
            <div key={index} onClick={() => handleChooseQuery(item)} className="w-full">
            <div className="h-9 p-4 w-full hover:bg-gray-100 cursor-pointer flex items-center justify-start gap-2">
              <img
                src="https://salt.tikicdn.com/ts/upload/e8/aa/26/42a11360f906c4e769a0ff144d04bfe1.png"
                className="text-gray-200 h-8 w-8"
                alt=""
              />
              <span className="text-sm">{item}</span>
            </div>
          </div>
          ))}
          <div className="h-[1px] w-full bg-gray-300"></div>
          <div className="flex items-center justify-normal px-4 py-2 gap-2">
            <img src="	https://down-vn.img.susercontent.com/file/29218d6681841ae13f18a6be04f6a57b" className="object-cover h-8 w-8" alt="" />
            <span className="text-sm font-light-bold ">Danh mục nỗi bật</span>
          </div>
          <div className="p-4 flex items-center justify-center w-full">
            <div className="flex flex-col items-center justify-normal cursor-pointer hover:translate-y-[-2px] w-[25%] transform transition-all">
              <img src="https://down-vn.img.susercontent.com/file/24b194a695ea59d384768b7b471d563f_tn&quot" className="object-cover w-32 h-32 p-1 " alt="" />
              <span className="text-sm mt-2 font-light">Gia dụng</span>
            </div>
            <div className="flex flex-col items-center justify-normal cursor-pointer hover:translate-y-[-2px] w-[25%] transform transition-all">
              <img src="https://salt.tikicdn.com/ts/category/13/64/43/226301adcc7660ffcf44a61bb6df99b7.png" className="object-cover w-32 h-32 p-1 " alt="" />
              <span className="text-sm mt-2 font-light">Mẹ & bé</span>
            </div>
            <div className="flex flex-col items-center justify-normal cursor-pointer hover:translate-y-[-2px] w-[25%] transform transition-all">
              <img src="https://down-vn.img.susercontent.com/file/6cb7e633f8b63757463b676bd19a50e4_tn&quot" className="object-cover w-32 h-32 p-1 " alt="" />
              <span className="text-sm mt-2 font-light">Thể thao</span>
            </div>
            <div className="flex flex-col items-center justify-normal cursor-pointer hover:translate-y-[-2px] w-[25%] transform transition-all">
              <img src="https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d_tn&quot" className="object-cover w-32 h-32 p-1 " alt="" />
              <span className="text-sm mt-2 font-light">Máy Tính & laptop</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
