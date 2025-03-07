import express from 'express';
import cors from 'cors';
import { loginUser } from './src/dbmanager.js';

const app = express();

app.use(cors());
app.use(express.json())

app.post('/login', (req, res) => {
    const nombre = req.body.username
    const contraseña = req.body.password
    const admin = req.body.admin

    if (!nombre || !contraseña) 
        return res.status(400)
                  .json({ message: 'Faltan datos', success: false })

    loginUser(nombre, contraseña, (err, results) => {
        if (err)
            return res.status(500)
                      .json({ message: 'Algo salió mal... ' + err, success: false })
        else if (results.length === 0)
            return res.status(401)
                      .json({ message: 'Usuario o contraseña incorrectos', success: false })

        res.status(200).json(
            { 
                message: 'Login exitoso!', 
                success: true, 
                username: nombre, 
                admin: admin 
            }
        )
    })
})

app.post('/getTable', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) 
        return res.status(400)
                  .json({ message: 'Faltan datos', success: false });

    getTablesByUser(username, password, (err, results) => {
        if (err)
            return res.status(500)
                      .json({ message: 'Algo salió mal... ' + err, success: false });
        else if (results.length === 0)
            return res.status(404)
                      .json({ message: 'No se encontraron datos para este usuario', success: false });

        res.status(200).json({
            message: 'Datos obtenidos correctamente',
            success: true,
            data: results
        });
    });
});

app.all('*', (req, res) => {
    res.status(404).send(
        '<h1>Página no encontrada...</h1>'
    )
})

app.listen(3000, () => {
    console.log('Server started at localhost:3000');
})