import React from 'react'
import { TypeVariation } from '../../../../../utils/types/product'

const DetailVariation = ({ variation }: { variation: TypeVariation }) => {
    console.log(variation);

    return (
        <div className=' flex gap-4'>
            <div className=' w-32 text-right pt-1'>
                <p> Danh sách phân loại hàng</p>
            </div>
            <div className="relative overflow-x-auto flex-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {Object.keys(variation).map((key, index) => (
                                <th scope="col" key={index} className="px-6 py-3 border border-gray-200">
                                    {key}
                                </th>
                            ))}

                            <th scope="col" className="px-6 py-3 border border-gray-200">
                                Giá
                            </th>
                            <th scope="col" className="px-6 py-3 border border-gray-200">
                                Kho hàng

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(variation).map((key, index) => (
                            variation[key].map((item) => (
                                <tr className="bg-white dark:bg-gray-800">
                                    <td className="px-6 py-4 border border-gray-200 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                    </td>
                                    <td className="px-6 py-4 border border-gray-200">
                                    </td>
                                    <td className="px-6 py-4 border border-gray-200">
                                        Laptop
                                    </td>
                                    <td className="px-6 py-4 border border-gray-200">
                                        $2999
                                    </td>
                                </tr>
                            ))

                        ))}

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default DetailVariation