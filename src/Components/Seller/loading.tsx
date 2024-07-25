import { createContext, useState } from "react";

export const LoaderContex = createContext({} as {isLoader: boolean, setLoader: React.Dispatch<React.SetStateAction<boolean>>})

const LoaderProvider = ({ children }: {children : React.ReactNode} ) => {
    const [isLoader, setLoader] = useState(false)
    return (
        <LoaderContex.Provider value={{isLoader, setLoader}}>
            {children}
        </LoaderContex.Provider>
    )
}
export default LoaderProvider