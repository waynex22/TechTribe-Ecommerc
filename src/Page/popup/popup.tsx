import React from 'react';
const Popup = ({ children, onHandlePopup }: { children: React.ReactNode, onHandlePopup: () => void; }) => {
    
    return (
        <>
            <div className=" fixed top-0 left-0 h-screen w-screen z-10">
                <div onClick={() => { onHandlePopup() }} className="fixed top-0 left-0 h-screen w-screen bg-black opacity-35">
                </div>
                <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3">
                    {children}
                </div>
            </div>
        </>
    )
}
export default Popup