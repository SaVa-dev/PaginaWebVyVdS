import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3306,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

connection.connect((err) => {
    if (err) throw err;
    console.log("Se ha conectado exitosamente a la base de datos!")
})

export function loginUser(username, password, callback) {
    const query = `SELECT * FROM Usuarios WHERE username = ? AND password = ?`
    connection.query(
        query,
        [username, password],
        (err, results) => {
            if (err) return callback(err, null)
            callback(null, results)
        }
    )
}

export function getTablesByUser(username, callback) {
    const query = `
    SELECT p.nombre, p.descripcion, p.cantidad, p.precio, u.
    FROM Usuarios u
    INNER JOIN Productos p 
    ON p.usuarios_id = u.usuarios_id
    WHERE u.username = ?
    `
    connection.query(
        query,
        [username],
        (err, results) => {
            if (err) return callback(err, null)
            callback(null, results)
        }
    )
}