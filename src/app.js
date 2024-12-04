const express = require('express');
const cors = require('cors'); // Importa cors
const http = require('http'); // Importa el módulo http
const { Server } = require('socket.io'); // Importa el servidor de Socket.IO
const userRoutes = require('./routes/userRoutes');
const userConversationRoutes = require('./routes/userConversationRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');


const app = express();
app.use(cors()); // Configura cors
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api',userConversationRoutes);
app.use('/api',conversationRoutes);
app.use('/api',messageRoutes);

// Crea un servidor HTTP y pasa `app` como argumento
const server = http.createServer(app);

// Configura Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Configura esto según tus necesidades
    methods: ["GET", "POST"]
  }
});

// Eventos de conexión de Socket.IO
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);
  socket.on('join-user', (userId) => {
    socket.join(userId); // Une el socket a una sala única para este usuario
    console.log(`Usuario ${userId} unido a su sala personal`);
  });

  // Únete a una conversación específica (room)
  socket.on('join', (conversationId) => {
    socket.join(conversationId);
    console.log(`Usuario unido a la conversación: ${conversationId}`);
  });

  // Escuchar evento de mensaje y reenviar a otros usuarios en la misma conversación
  socket.on('mensaje', (data) => {
    const { conversationId, remitenteId, receptorId, content, senderId ,userCreador } = data;

    console.log('**************on mensaje***************************++++')
    console.log("consversacion ID :: ", conversationId)
    console.log("remtenteId :: ", remitenteId)
    console.log("ReceptorId :: ", receptorId)
    console.log("content :: ", content)
    console.log("user creador ", userCreador)
    console.log('*******************************************************')
    // Enviar el mensaje a todos los usuarios en la conversación
    io.to(conversationId).emit('mensaje', {
      remitenteId,
      receptorId,
      content,
      senderId,
      userCreador,
      createdAt: new Date().toISOString()
    });

    // Notificar al receptor del nuevo mensaje si está conectado
    io.to(receptorId).emit('nuevo-mensaje', {
      remitenteId,
      conversationId,
      content
    });
  });

  // Detectar cuando un usuario se desconecta
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});