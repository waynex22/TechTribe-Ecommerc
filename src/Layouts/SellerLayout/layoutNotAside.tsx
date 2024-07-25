import { ToastContainer } from "react-toastify";
import HeaderSeller from "./headerSeller";

const LayouSellertNotAside: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
    return (
      <div className=' bg-gray-100 min-w-[1200px] min-h-screen '>
      <ToastContainer />
        <HeaderSeller />
          <main className=' pt-16 w-full'>
            <div className=' p-4'>
              {children}
            </div>
          </main>
      </div>
    );
  };

export default LayouSellertNotAside