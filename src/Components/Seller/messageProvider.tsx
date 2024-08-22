import { createContext, useState } from "react";

export const MessageContex = createContext({} as {isShowMessage: boolean, setShowMessage: React.Dispatch<React.SetStateAction<boolean>>})

const MessageProvider = ({ children }: {children : React.ReactNode} ) => {
  const [isShowMessage, setShowMessage] = useState(false)
  return (
      <MessageContex.Provider value={{isShowMessage, setShowMessage}}>
          {children}
      </MessageContex.Provider>
  )
}

export default MessageProvider