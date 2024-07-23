
export const getMinMaxPriceInArr = (arr: any) => {
    const listPrice = arr?.map((item: any) => item.price)
    const min = Math.min(...listPrice)
    const max = Math.max(...listPrice)
    return { min, max }
}