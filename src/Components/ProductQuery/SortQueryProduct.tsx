import React, { useState } from 'react';

interface Props {
    handleSort: (sort: { priceMinMax?: [number, number], sortOrder?: string }) => void;
}

const SortQueryProduct: React.FC<Props> = ({ handleSort }) => {
    const [minPrice, setMinPrice] = useState<number | string>('');
    const [maxPrice, setMaxPrice] = useState<number | string>('');

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(e.target.value);
    };


    const handleApplySort = () => {
        if (minPrice !== '' && maxPrice !== '') {
            handleSort({ priceMinMax: [Number(minPrice), Number(maxPrice)] });
        }
    };

    return (
        <div className="p-4 bg-white rounded-xl mt-4">
            <div className="flex flex-wrap items-center justify-end gap-4">
                {/* <div className="w-full">
                    <p className='text-gray-500 text-sm'>Lọc theo giá</p>
                    <div className="flex gap-2 items-center w-1/4">
                        <input
                            type="number"
                            placeholder="Từ"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            className="border rounded px-2 py-1 w-full"
                        />
                        <input
                            type="number"
                            placeholder="Đến"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            className="border rounded px-2 py-1 w-full"
                        />


                        <div
                            onClick={handleApplySort}
                            className="bg-blue-500 text-white font-light py-2 cursor-pointer px-4 text-sm rounded"
                        >
                            Tìm
                        </div>
                    </div>
                </div> */}

                <div className="flex items-center gap-2 mt-4">
                    <span className="font-bold text-sm">Sắp xếp</span>
                    <select
                        className="border rounded-xl px-2 py-1 border-gray-400 text-sm"
                        onChange={(e) => handleSort({ sortOrder: e.target.value })}                   >
                        <option value='asc'>Giá cao đến thấp</option>
                        <option value='desc'>Giá thấp đến cao</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SortQueryProduct;
