/* eslint-disable react-hooks/exhaustive-deps */
import AddnameVariation from "./addnameVariation"
import { typeFormCreateProduct, typeProduct, typeProductPrice, typeSpecifications, TypeVariation } from '../../../../../utils/types/product';
import { useEffect, useState } from "react";
import DetailVariation from "./detailVariation";
import { FormErrorsProduct } from "../../../../../utils/validatetor/createproduct";

const VariationsProduct = ({ formAddProduct, handleFormAddproduct, product, errForm }: {
    formAddProduct: typeFormCreateProduct
    handleFormAddproduct: (
        key: string,
        value: string | typeSpecifications[] | TypeVariation | typeProductPrice[]
    ) => void
    product?: typeProduct
    errForm: FormErrorsProduct
}) => {
    const [variation, setVariation] = useState<TypeVariation>({});
    const [productPrice, setProductPrice] = useState<typeProductPrice[]>([])

    useEffect(() => {
        if (product) {
            const newVariation: TypeVariation = { 'Màu sắc': [], 'Size': [] };
            if (product.variation_color && product.variation_color.length > 0) {
                newVariation['Màu sắc'] = product.variation_color.map(item => {
                    return { name: item.value };
                })
            }
            if (product.variation_size && product.variation_size.length > 0) {
                newVariation['Size'] = product.variation_size.map(item => {
                    return { name: item.value };
                });
            }
            Object.keys(newVariation).forEach(key => {
                if (newVariation[key].length === 0) {
                    delete newVariation[key];
                }
            });
            setVariation(newVariation);
            handleFormAddproduct('variation', newVariation)
        }
    }, [product]);

    useEffect(() => {
        handleFormAddproduct('variation', variation)
    }, [variation])
    useEffect(() => {
        handleFormAddproduct('productPrice', productPrice)
    }, [productPrice])

    return (
        <div id='DetailInformation' className='px-4 py-8 bg-white rounded-md shadow text-left'>
            <h3 className=' font-semibold text-lg px-5'>Phân loại sản phẩm</h3>
            <div className=' py-2 flex flex-col gap-6 pt-4 px-12 text-sm font-normal'>
                <AddnameVariation errForm={errForm} variation={formAddProduct.variation} setVariation={setVariation} />
            </div>
            <div className=' py-2 flex flex-col gap-6 pt-4 px-12 text-sm font-normal'>
                {formAddProduct.variation && Object.keys(formAddProduct.variation).length > 0 &&
                    <DetailVariation
                        errForm={errForm}
                        product={product}
                        variation={formAddProduct.variation}
                        productPrice={formAddProduct.productPrice}
                        setProductPrice={setProductPrice} />
                }
            </div>
        </div>
    )
}

export default VariationsProduct