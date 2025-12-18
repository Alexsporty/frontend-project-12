// socket.js
import { io } from 'socket.io-client'

let socket = null

export const initSocket = (token) => {
  if (!socket) {
    socket = io({ auth: { token } })

    socket.on('connect', () => {
      console.log('Socket connected')
    })
  }

  return socket
}

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized')
  }
  return socket
}
