import { ClipLoader } from "react-spinners";
interface Props {
    loading: boolean
}
const Spinner: React.FC<Props> = ({ loading }) => {
    return (
        <>
         {loading && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <ClipLoader color="#0A68FF" size={60} loading={loading} />
        </div>
         )}
        </>
    )
}
export default Spinner;