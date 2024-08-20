import empty from './no-results-found.png'
const EmptyVoucher: React.FC = () => {
    return (
        <>
        <div className="flex flex-col items-center justify-center p-4">
            <img src={empty} alt=""  className='object-cover w-[200px] h-[200px]'/>
            <p>Không tìm thấy khuyến mãi nào</p>
        </div>
        </>
    )
}

export default EmptyVoucher;