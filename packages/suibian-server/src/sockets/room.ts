import socketio from "socket.io";
import { createRoomQuery, joinRoomQuery } from "../queries/room";
import {
    httpStatus,
    joinRoomPayload,
    roomMessagePayload,
    suibianSocket
} from "@suibian/commons";
import { sendError } from "./messaging";
import { listSocketsRoom } from "./utils";
import sockets from ".";

export const joinRoom = async (
    socket: suibianSocket,
    socketio: socketio.Server,
    data: joinRoomPayload
) => {
    const { username, roomcode } = data;
    await joinRoomQuery(username, roomcode);

    //obtain a list of users in the room
    socket.join(data.roomcode, () =>
        socket.emit("joinRoom", listSocketsRoom(socketio, roomcode))
    );
};

export const broadcastRoom = (
    socketio: socketio.Server,
    data: roomMessagePayload
) => {
    //broadcast to all members in the room
    const { username, message, roomcode } = data;
    socketio.in(roomcode).emit("broadcastMessage", message);
};

export const createRoom = async (
    socket: suibianSocket
): Promise<string | void> => {
    const roomcode = await createRoomQuery();

    if (roomcode) {
        socket.join(roomcode, () => {
            socket.emit("createRoom", roomcode);
        });
        return roomcode;
    } else {
        sendError(
            socket,
            httpStatus.badRequest,
            "No more spare roomes left to join"
        );
    }
};

export const getRoomInfo = (
    socketio: socketio.Server,
    data: { roomcode: string }
) => {
    //TODO query database to extract room information
};

export const getRoomSockets = (
    socketio: socketio.Server,
    roomcode: string
): socketio.Room => {
    const room = socketio.sockets.adapter.rooms[roomcode];
    return room;
};

export const closeRoom = (
    socketio: socketio.Server,
    socket: suibianSocket,
    roomcode: string
) => {
    //TODO Remove room from the database
    const roomInfo = getRoomSockets(socketio, roomcode);
    if (!roomInfo) {
        sendError(
            socket,
            httpStatus.badRequest,
            "Room could not close because room code does not exist"
        );
        return;
    }
    const socketList = Object.keys(roomInfo["sockets"]);
    socketList.forEach(socketId => {
        const socket = socketio.sockets.connected[socketId];
        socket.leave(roomcode, () => {
            socketio.in(roomcode).emit("broadcastMessage", {
                username: "null",
                message: "room is closed",
                roomcode: roomcode
            });
        });
        console.log(`socket rooms ${socketio.sockets.adapter.rooms[roomcode]}`);
    });
};

export const startRoom = (io: socketio.Server, roomcode: string) => {
    //TODO Add in entries in the database & change room status
};
