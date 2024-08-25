interface Props {
    handleSetRate: (tab: number) => void;
    tab: number;
    product: any
}
const TabFilterReview: React.FC<Props> = ({ handleSetRate, tab, product }) => {

  return (
      <div className="border bg-primary/20 backdrop-blur-sm p-4 border-primary/40 border-dashed my-2 rounded-lg">
        <div className="flex items-center justify-between gap-4">
            <div className="w-[20%]">
                <div className="flex items-end gap-1 text-primary/50">
                    <h3 className="text-2xl">{product?.rating}</h3>
                    <p>trên</p>
                    <p>5</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => {
                    const rating = product?.rating || 0;
                    const isHalfStar = rating - index > 0 && rating - index < 1;

                    return (
                      <svg
                        key={index}
                        stroke="currentColor"
                        fill={index < Math.floor(rating) ? "#579CEA" : isHalfStar ? "url(#half)" : "#E4E8EE"}
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {isHalfStar && (
                          <defs>
                            <linearGradient id="half">
                              <stop offset="50%" stopColor="#579CEA" />
                              <stop offset="50%" stopColor="#E4E8EE" />
                            </linearGradient>
                          </defs>
                        )}
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                      </svg>
                    );
                  })}
                </div>
            </div>
            <div className="w-[80%]">
                <div className="flex items-center gap-2">
                    <button onClick={() => handleSetRate(0)} className={`border border-primary/40 px-4 py-2 rounded-md text-[14px] text-primary ${tab === 0 ? 'bg-primary/40 text-white' : 'bg-white text-primary'}`}>Tất cả</button>
                    <button onClick={() => handleSetRate(5)} className={`border border-primary/40 px-4 py-2 rounded-md text-[14px] text-primary ${tab === 5 ? 'bg-primary/40 text-white' : 'bg-white text-primary'}`}>5 sao</button>
                    <button onClick={() => handleSetRate(4)} className={`border border-primary/40 px-4 py-2 rounded-md text-[14px] text-primary ${tab === 4 ? 'bg-primary/40 text-white' : 'bg-white text-primary'}`}>4 sao</button>
                    <button onClick={() => handleSetRate(3)} className={`border border-primary/40 px-4 py-2 rounded-md text-[14px] text-primary ${tab === 3 ? 'bg-primary/40 text-white' : 'bg-white text-primary'}`}>3 sao</button>
                    <button onClick={() => handleSetRate(2)} className={`border border-primary/40 px-4 py-2 rounded-md text-[14px] text-primary ${tab === 2 ? 'bg-primary/40 text-white' : 'bg-white text-primary'}`}>2 sao</button>
                    <button onClick={() => handleSetRate(1)} className={`border border-primary/40 px-4 py-2 rounded-md text-[14px] text-primary ${tab === 1 ? 'bg-primary/40 text-white' : 'bg-white text-primary'}`}>1 sao</button>
                </div>
            </div>
        </div>
      </div>
  );
};
export default TabFilterReview;