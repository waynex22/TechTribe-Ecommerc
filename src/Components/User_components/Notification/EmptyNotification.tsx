const EmptyNotification: React.FC = () => {
    return (
        <>
        <div className="flex flex-col items-center justify-center p-4">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-notification-10681478-8593294.png" className="w-[300px] h-[300px]" alt="" />
                <p>Chưa có thông báo nào</p>
        </div>
        </>
    )
}

export default EmptyNotification;