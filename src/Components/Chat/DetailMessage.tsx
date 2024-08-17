import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ItemDetailMess from "./ItemDetailMessage";
import UseIntersectionObserver from "./useIntersectionObserver";
import requestApi from "src/helper/api";

interface Props {
    message: any;
    shopSelected?: any;
}
const DetailMessage: React.FC<Props> = ({ message, shopSelected }) => {
    const dispatch = useDispatch();
    const messageEndRef = useRef<HTMLDivElement>(null);
    const messageStartRef = useRef<HTMLDivElement>(null);
    const [skip, setSkip] = useState(2);
    const [moreMessage, setMoreMessage] = useState({} as any);
    const [loadMoreMess, setLoadMoreMess] = useState(false);
    const [endChat, setEndChat] = useState(false);
    const [newMessageAdded, setNewMessageAdded] = useState(false);

    useEffect(() => {
        if (newMessageAdded && messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
            setNewMessageAdded(false); // Reset after scrolling
        }
    }, [message.messenger, newMessageAdded]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({});
        }
    }, []);

    const isVisible = UseIntersectionObserver(messageStartRef, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    });
    useEffect(() => {
        if (isVisible && !loadMoreMess && !endChat) {
            setLoadMoreMess(true);
            callApiMess();
        }
    }, [endChat, message, isVisible, loadMoreMess, moreMessage, skip]);

    const callApiMess = () => {
        requestApi(
            `room-chat/detail/${message?._id}?skip=${skip}`,
            "GET",
            {},
            "application/json"
        ).then((data) => {
            setLoadMoreMess(false);
            setSkip(skip + 1);
            const newMess = data.data;

            if (newMess.messenger.length === 0) {
                setEndChat(true);
            }

            if (moreMessage && Object.keys(moreMessage).length > 0) {
                setMoreMessage({
                    ...newMess,
                    messenger: [
                        ...newMess.messenger,
                        ...moreMessage.messenger,
                    ],
                });
            } else {
                setMoreMessage(newMess);
            }
        });
    };

    // Watch for new messages
    useEffect(() => {
        if (message.messenger.length > 0) {
            setNewMessageAdded(true);
        }
    }, [message.messenger]);

    return (
        <>
            {message && (
                <div className="flex flex-col h-full">
                    <div className="bg-gray-100 p-2 flex-1 overflow-auto flex flex-col gap-2 text-sm">
                        <div ref={messageStartRef}>
                            {loadMoreMess && (
                                <div role="status" className=" flex justify-center">
                                    <svg
                                        aria-hidden="true"
                                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )}
                        </div>
                        {moreMessage && moreMessage.messenger && (
                            <ItemDetailMess
                                message={moreMessage}
                                shop={shopSelected}
                            />
                        )}

                        {message && (
                            <ItemDetailMess
                                message={message}
                                shop={shopSelected}
                            />
                        )}

                        <div ref={messageEndRef} className="ml-auto">
                            {message?.id_lastMess?.id_customer === shopSelected.shopId &&
                                !message.id_lastMess.isWatched && (
                                    <svg
                                        className="size-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        id="double-check"
                                    >
                                        <path
                                            fill="url(#paint0_linear_1233_4362)"
                                            fillRule="evenodd"
                                            d="M22.7071 7.70709C23.0976 7.31656 23.0976 6.68339 22.7071 6.29288C22.3166 5.90236 21.6834 5.90238 21.2929 6.29291L12.0003 15.5859L11.207 14.7928C10.8164 14.4023 10.1833 14.4024 9.79279 14.793C9.40232 15.1836 9.40242 15.8167 9.793 16.2072L11.2934 17.7072C11.684 18.0976 12.3171 18.0976 12.7076 17.7071L22.7071 7.70709ZM16.7071 7.70711C17.0976 7.31658 17.0976 6.68342 16.7071 6.29289C16.3166 5.90237 15.6834 5.90237 15.2929 6.29289L6 15.5858L2.70711 12.2929C2.31658 11.9024 1.68342 11.9024 1.29289 12.2929C0.902369 12.6834 0.902369 13.3166 1.29289 13.7071L5.29289 17.7071C5.68342 18.0976 6.31658 18.0976 6.70711 17.7071L16.7071 7.70711Z"
                                            clipRule="evenodd"
                                        ></path>
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_1233_4362"
                                                x1="1.64645"
                                                x2="23.5927"
                                                y1="5.82133"
                                                y2="7.48797"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop
                                                    stopColor="#4D89F5"
                                                    stopOpacity="0.7"
                                                ></stop>
                                                <stop
                                                    offset="1"
                                                    stopColor="#4D89F5"
                                                ></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default DetailMessage;
