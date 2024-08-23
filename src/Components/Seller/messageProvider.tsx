import { createContext, useState } from "react";

export const MessageContex = createContext({} as {idShowRoomChat: string, setShowRoomChat: React.Dispatch<React.SetStateAction<string>>})

const MessageProvider = ({ children }: {children : React.ReactNode} ) => {
  const [idShowRoomChat, setShowRoomChat] = useState('')
  return (
      <MessageContex.Provider value={{idShowRoomChat, setShowRoomChat}}>
          {children}
      </MessageContex.Provider>
  )
}

export default MessageProvider