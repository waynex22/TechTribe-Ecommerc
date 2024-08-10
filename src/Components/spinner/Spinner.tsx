import CircleLoader from './Circle Loader.gif'
interface Props {
    loading: boolean
}
const Spinner: React.FC<Props> = ({ loading }) => {
    return (
        <>
         {loading && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-20 flex items-center justify-center z-50">
            <img src={CircleLoader} alt="" className='w-[100px]' />
        </div>
         )}
        </>
    )
}
export default Spinner;