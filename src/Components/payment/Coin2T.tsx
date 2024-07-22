import { useState } from "react";

const Coin2T: React.FC = () => {
    const [isToggled, setIsToggled] = useState(false);
    const toggleButton = () => {
        setIsToggled(prevState => !prevState);
    };
    return (
        <>
            <div className="bg-white rounded-lg p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                        <img src="https://salt.tikicdn.com/ts/upload/2e/d0/67/6ea978a46f650dcd267445000840659a.png" className="w-6" alt="" />
                        <div>
                            <p className="text-gray-900 font-nomal text-sm">Sử dụng số coin tích điểm</p>
                            <p className="text-[12px] text-gray-400">Bạn đang sỡ hữu 5600 coin</p>
                        </div>
                    </div>
                    <div
                        onClick={toggleButton}
                        className={`${isToggled ? 'bg-green-400' : 'bg-gray-300'
                            } relative w-11 h-6 rounded-full cursor-pointer transition-colors duration-300`}
                    >
                        <div
                            className={`${isToggled ? 'translate-x-6' : 'translate-x-1'
                                } absolute top-[2px] left-[-2px] bg-white w-5 h-5 rounded-full transition-transform duration-300`}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Coin2T;