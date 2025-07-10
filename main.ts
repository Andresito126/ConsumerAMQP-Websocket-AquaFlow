import { startRabbitConsumer } from "./src/RabbitMQ/Consumer";
import { initSocketClient } from "./src/Socket.io/SocketClient";

initSocketClient();
startRabbitConsumer();