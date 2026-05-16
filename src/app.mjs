import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { setServers } from 'node:dns/promises';

setServers(["1.1.1.1", "8.8.8.8"]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS + layouts
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Archivos estáticos
app.use(express.static(join(__dirname, '../public')));

connectDB();

app.use('/', superHeroRoutes);

app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});