CREATE TABLE Usuarios ( 
    usuarios_id INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(16), 
    email VARCHAR(32), 
    contraseña VARCHAR(16), 
    admin BOOLEAN 
);


CREATE TABLE Productos (
    productos_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(32),
    descripción VARCHAR(255),
    cantidad SMALLINT,
    precio DECIMAL(10, 2),

    usuarios_id INT,

    FOREIGN KEY(usuarios_id) REFERENCES Usuarios(usuarios_id)
)