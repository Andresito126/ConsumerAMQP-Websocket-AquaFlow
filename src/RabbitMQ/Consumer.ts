import amqp from 'amqplib';
import { CONFIG } from '../../config';
import { sendSensorReadings } from '../Socket.io/SocketClient';
import { sendOneSensorReading } from '../Socket.io/SocketClient';
import { sendNotification } from '../Socket.io/SocketClient';
import { PayloadSensorReadings, PayloadSensorReadingsSchema } from '../models/Payload_SensorReadings';
import { SensorReadingsSchema } from '../models/SensorReadings';
import { NotificationsSchema } from '../models/Notifications';
import { OneSensorReadingsSchema } from '../models/OneSensorReadings';

export const startRabbitConsumer = async () => {
    try{
        const connection = await amqp.connect(CONFIG.rabbitMQUrl);
        const channel = await connection.createChannel();
        await channel.assertExchange(CONFIG.exchange, 'topic', { durable: false });
        const {queue} = await channel.assertQueue('', { exclusive: true });

        await channel.bindQueue(queue, CONFIG.exchange, CONFIG.topic + ".one_reading");
        await channel.bindQueue(queue, CONFIG.exchange, CONFIG.topic + ".many_readings");
        await channel.bindQueue(queue, CONFIG.exchange, CONFIG.topic + ".notification");

        console.log("Esperando mensajes del tópico:", CONFIG.topic);

        channel.consume(queue, (msg) => {
            if(msg?.content){
                const content = JSON.parse(msg.content.toString());
                const topicKey = msg.fields.routingKey;

                console.log("Mensaje recibido del tópico:", topicKey);

                try{
                    if(topicKey == CONFIG.topic + ".one_reading"){
                        sendOneSensorReading(OneSensorReadingsSchema.parse(content));
                    } else if(topicKey == CONFIG.topic + ".many_readings"){
                        sendSensorReadings(PayloadSensorReadingsSchema.parse(content));
                    } else if(topicKey == CONFIG.topic + ".notification"){
                        sendNotification(NotificationsSchema.parse(content));
                    } else {
                        console.log("No se encontró una cola conocida");
                    }
                }catch(error){
                    console.log("Error al formatear mensaje recibido:", error);
                    const payload = JSON.parse(msg.content.toString());
                }
            }
        });
    }catch(err){
        console.log("Error al conectar con RabbitMQ:", err)
    }
}