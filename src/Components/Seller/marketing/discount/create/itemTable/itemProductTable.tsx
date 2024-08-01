import React, { useEffect, useState } from 'react';
import { typeProduct } from '../../../../../../utils/types/product';
import { RiDeleteBinLine } from 'react-icons/ri';
import ItemProductPriceTable from './itemProductPriceTable';
import { typeCreaeteDiscount } from '../../../../../../utils/types/discount';
import { typeFlashSaleDetail } from '../../../../../../utils/types/flashSale';

type ItemProductTableProps = {
  product: typeProduct;
  listCreate: (typeCreaeteDiscount | typeFlashSaleDetail)[];
  handleDeleteProduct: (id: string) => void;
  onHandleListIdProduct: (status: boolean, id_product: string) => void;
  listIdProduct: string[];
  onHandleListCreate: (idPrice: string, key: string, value: string | number | boolean) => void;
  isSubmitForm: boolean;
};

const ItemProductTable: React.FC<ItemProductTableProps> = ({
  product,
  listCreate,
  handleDeleteProduct,
  onHandleListIdProduct,
  listIdProduct,
  onHandleListCreate,
  isSubmitForm,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const check = listIdProduct.includes(product._id);
    setChecked(check);
  }, [listIdProduct, product._id]);

  const findItemCreate = (id: string) => {
    return listCreate.find(
      (res): res is typeCreaeteDiscount | typeFlashSaleDetail => res.id_productPrice === id
    );
  };

  return (
    <div key={product._id} className="rounded border text-sm">
      <div className="rounded-t py-2 px-4 bg-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-2 flex items-center">
              <input
                checked={checked}
                type="checkbox"
                onChange={(e) => onHandleListIdProduct(e.target.checked, product._id)}
              />
            </div>
            <div>
              <img src={product.thumbnails[0]} className="w-10" alt="" />
            </div>
            <div className="w-[200px] relative group">
              <p className="truncate cursor-pointer">{product.name}</p>
              <div className="group-hover:block hidden absolute bg-gray-800 bg-opacity-75 text-white p-2 rounded-xl bottom-full left-0">
                {product.name}
              </div>
            </div>
          </div>
          <div className="text-xl w-10 text-center">
            <p onClick={() => handleDeleteProduct(product._id)} className="cursor-pointer">
              <RiDeleteBinLine />
            </p>
          </div>
        </div>
      </div>
      <div className="py-2 flex flex-col gap-2">
        {product.product_price.map((itemPrice) => {
          const itemCreate = findItemCreate(itemPrice._id);
          if (itemCreate)
            return (
              <ItemProductPriceTable
                isSubmitForm={isSubmitForm}
                key={itemPrice._id}
                itemCreate={itemCreate}
                productPrice={itemPrice}
                onHandleListCreate={onHandleListCreate}
              />
            );
          return null;
        })}
      </div>
    </div>
  );
};

export default ItemProductTable;
