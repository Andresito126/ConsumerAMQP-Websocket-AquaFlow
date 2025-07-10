import { io, Socket } from "socket.io-client";
import { CONFIG } from "../../config";
import { PayloadSensorReadings } from "../models/Payload_SensorReadings";
import { Notifications } from "../models/Notifications";
import { OneSensorReading } from "../models/OneSensorReadings";

let socket: Socket;

export const initSocketClient = () => {
    socket = io(CONFIG.websocketUrl, {
        transports: ['websocket'],
        reconnection: true,
    });

    socket.on('connect', () => {
        console.log("Conectado al servidor websocket:", socket.id);
    });

    socket.on('disconnect', () => {
        console.log("Desconectando cliente");
    });
}

export const sendSensorReadings = (sensorReadings: PayloadSensorReadings) => {
    if (socket && socket.connected){
        let userID = sensorReadings.idUser;
        console.log(sensorReadings);
        socket.emit('new_many_sensor_readings', {userID, sensorReadings});
    } else {
        console.log("Sin conexión al Websocket");
    }
}

export const sendOneSensorReading = (sensorReading: OneSensorReading) => {
    if (socket && socket.connected){
        let userID = sensorReading.idUser;
        let measurement = {
            id: sensorReading.id,
            value: sensorReading.value,
            date: sensorReading.date,
            sensor_id: sensorReading.sensor_id,
        }
        socket.emit('new_one_sensor_reading', {userID, measurement});
    } else {
        console.log("Sin conexión al Websocket");
    }
}

export const sendNotification = (notification: Notifications) => {
    if (socket && socket.connected){
        let userID = notification.user_id;
        socket.emit('new_notification', { userID, notification });
    } else {
        console.log("Sin conexión al Websocket");
    }
}