const http = require('http');
const app = require('./server');
const cors = require('cors');

// Puerto donde se ejecuta el servidor
// Si existe en .env usa ese, si no usa 3000
const port = process.env.PORT || 3000;

// Host del servidor
// localhost = solo tu PC
// 0.0.0.0 = todas las interfaces de red (requiere IP real en CORS si usas otros dispositivos)
const host = '0.0.0.0';

/*
  CONFIGURACIÓN CORS

  Permite definir qué dominios pueden acceder a la API desde el navegador.
*/
app.use(cors({
  // Orígenes permitidos
  origin: [
    
    'http://localhost',
    'http://127.0.0.1'
  ],

  // Permite cookies o tokens
  credentials: true,

  // Métodos HTTP permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

  // Headers permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

/*
  Manejo de preflight (OPTIONS)
  El navegador lo usa antes de peticiones CORS
*/
app.options('*', cors());

// Guarda el puerto dentro de Express
app.set('port', port);

/*
  Creación del servidor HTTP usando Express
*/
const server = http.createServer(app);

/*
  Inicia el servidor y empieza a escuchar peticiones
*/
server.listen(port, host, () => {
  console.log(`Servidor corriendo en http://${host}:${port}`);
});

/*
  RESUMEN:

  - Configura servidor Node + Express
  - Aplica CORS para permitir frontend
  - Define puerto y host
  - Inicia API backend
*/

/*
  NOTA:

  Si quieres acceder desde otro dispositivo (celular/PC):
  - Debes usar la IP real del equipo en host
  - Y agregar esa IP en CORS
*/