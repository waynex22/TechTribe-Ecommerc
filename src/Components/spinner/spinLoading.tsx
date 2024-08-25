import CircleLoader from './Loading.gif'
interface Props {
    loading: boolean
}
const SpinLoading: React.FC<Props> = ({ loading }) => {
    return (
        <>
         {loading && (
            <div className='px-4 py-1 bg-gray-200/10 backdrop-blur-2xl rounded-lg cursor-none flex items-center flex-col'>
            <img src={CircleLoader} alt="" className='w-[70px]' />
            <p className='text-xs text-gray-700 font-normal'>loading</p>
            </div>
         )}
        </>
    )
}
export default SpinLoading;