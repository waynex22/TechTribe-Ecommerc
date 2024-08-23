/* eslint-disable react-hooks/exhaustive-deps */
import AddnameVariation from "./addnameVariation"
import { detail_variation, typeFormCreateProduct, typeProduct, typeProductPrice, typeSpecifications, TypeVariation } from '../../../../../utils/types/product';
import { useEffect, useState } from "react";
import DetailVariation from "./detailVariation";
import { FormErrorsProduct } from "../../../../../utils/validatetor/createproduct";

const VariationsProduct = ({ formAddProduct, handleFormAddproduct, product, errForm, onHandleVaritaion }: {
    formAddProduct: typeFormCreateProduct
    handleFormAddproduct: (
        key: string,
        value: string | typeSpecifications[] | TypeVariation | typeProductPrice[]
    ) => void
    product?: typeProduct
    errForm: FormErrorsProduct
    onHandleVaritaion: (value: TypeVariation) => void
}) => {
    const [variation, setVariation] = useState<TypeVariation>({});
    const [productPrice, setProductPrice] = useState<typeProductPrice[]>([])

    useEffect(() => {
        if (product) {
            const newVariation: TypeVariation = { 'Màu sắc': [], 'Size': [] };
            if (product.variation_color && product.variation_color.length > 0) {
                newVariation['Màu sắc'] = product.variation_color.map(item => {
                    return {
                        name: item.value,
                        _id: item._id,
                        thumbnail: item.thumbnail
                    };
                })
            }
            if (product.variation_size && product.variation_size.length > 0) {
                newVariation['Size'] = product.variation_size.map(item => {
                    return {
                        name: item.value,
                        _id: item._id,
                    };
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
        handleFormAddproduct('productPrice', productPrice)
    }, [productPrice])

    useEffect(() => {
        onHandleVaritaion(variation);
        const sizeDifferences = formAddProduct.variation && variation && formAddProduct.variation['Size'] && variation['Size']
            ? getDifferences(formAddProduct.variation['Size'], variation['Size'])
            : [];

        const colorDifferences = formAddProduct.variation && variation && formAddProduct.variation["Màu sắc"] && variation["Màu sắc"]
            ? getDifferences(formAddProduct.variation["Màu sắc"], variation["Màu sắc"])
            : [];

        if (formAddProduct.productPrice) {
            // eslint-disable-next-line array-callback-return
            const newPrice = productPrice.map((item) => {
                if (colorDifferences.length > 0 && colorDifferences[0] && item.name_color === colorDifferences[0].name) {
                    if (colorDifferences[1])
                        return {
                            ...item,
                            name_color: colorDifferences[1].name
                        };
                } else if (sizeDifferences.length > 0 && sizeDifferences[0] && item.name_size === sizeDifferences[0].name) {
                    if (sizeDifferences[1])
                        return {
                            ...item,
                            name_size: sizeDifferences[1].name
                        };
                } else {
                    return item;
                }
            });

            const checkPrice = newPrice.filter((item): item is typeProductPrice => item !== undefined);
            setProductPrice(checkPrice);
        }
    }, [variation]);

    const getDifferences = (
        variation: detail_variation[],
        newVariation: detail_variation[]
    ) => {
        const names1 = variation.map(item => item.name);
        const names2 = newVariation.map(item => item.name);

        const newValue = newVariation.filter(item => !names1.includes(item.name));
        const oldValue = variation.filter(item => !names2.includes(item.name));
        if (newValue.length > 0 || oldValue.length > 0) {
            return [oldValue[0], newValue[0]]
        }
        return [];
    };

    return (
        <div id='DetailInformation' className='px-4 py-8 bg-white rounded-md shadow text-left'>
            <h3 className=' font-semibold text-lg px-5'>Phân loại sản phẩm</h3>
            <div className=' py-2 flex flex-col gap-6 pt-4 px-12 text-sm font-normal'>
                {product ?
                    <AddnameVariation
                        product={product}
                        errForm={errForm}
                        formAddProduct={formAddProduct}
                        setVariation={setVariation}
                        setProductPrice={setProductPrice}
                    />
                    :
                    <AddnameVariation
                        errForm={errForm}
                        formAddProduct={formAddProduct}
                        setVariation={setVariation}
                        setProductPrice={setProductPrice}
                    />
                }
            </div>
            <div className=' py-2 flex flex-col gap-6 pt-4 px-12 text-sm font-normal'>
                {formAddProduct.variation && Object.keys(formAddProduct.variation).length > 0 &&
                    <DetailVariation
                        errForm={errForm}
                        product={product}
                        variation={formAddProduct.variation}
                        productPrice={formAddProduct.productPrice}
                        setProductPrice={setProductPrice} 
                        />
                }
            </div>
        </div>
    )
}

export default VariationsProduct