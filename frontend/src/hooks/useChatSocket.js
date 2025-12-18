import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  addChannel,
  addMessage,
  renameChannelSuccess,
} from "../features/chat/chatSlice"
import { initSocket } from "../socket"

export default function useChatSocket(token) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) return

    const socket = initSocket(token)

    const handleNewMessage = (msg) => dispatch(addMessage(msg))
    const handleNewChannel = (channel) => dispatch(addChannel(channel))
    const handleRenameChannel = (channel) =>
      dispatch(renameChannelSuccess(channel))

    socket.on("newMessage", handleNewMessage)
    socket.on("newChannel", handleNewChannel)
    socket.on("renameChannel", handleRenameChannel)

    return () => {
      socket.off("newMessage", handleNewMessage)
      socket.off("newChannel", handleNewChannel)
      socket.off("renameChannel", handleRenameChannel)
      socket.disconnect()
    }
  }, [dispatch, token])
}
