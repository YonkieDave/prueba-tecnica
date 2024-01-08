# Prueba Tecnica

- Se realizaron endpoints para el registro de usuarios y sesiones donde se guarda el tocken y el correo del usuario
- Para el uso de los servicios es necesario mandar en los header el "token" y el "email" del usuario con esos nombres.
- El nombre de la BD mongo se definio como prueba y adjunto vienen las colecciones que se utilizaron.


### ENDPOINTS

- AUTH
# Listado de usuarios
GET ---- localhost:3001/users
# registro de usuarios
POST --- localhost:3001/users
    body:
    {
        "email": "Diego@gmail.com",
        "pass": "1234"
    }
# Inicio de sesión
POST --- localhost:3001/login
    body:
    {
        "email": "Diego@gmail.com",
        "pass": "1234"
    }

- POINTS
# Lista de ubicaciones
GET ----- localhost:3001/points

- ORDERS

# Listado de ordenes
GET ----- localhost:3001/orders

# Creación de orden
POST ---- localhost:3001/orders
        body:
            {
                "tipo": "Terrestre",
                "descripcion":"Viaje por ciudad",
                "ruta":{
                    "salida": "Parador - Centro Recreativo Camioneros Río Negro",
                    "destino": "Cristo Redentor, Las Heras, Mendoza"
                },
                "estatus": "Creada",
                "camion": "647e7fd008f76ab0e20a6c9c"
            }

# Actualización de orden
PATCH --- localhost:3001/orders/:id
        body:
            {
                "tipo": "Terrestre",
                "descripcion":"Viaja por caminos estatales",
                "ruta":{
                    "salida": "Parador - Centro Recreativo Camioneros Río Negro",
                    "destino": "Cristo Redentor, Las Heras, Mendoza"
                },
                "estatus": "En Progreso",
                "camion": "647e7fd008f76ab0e20a6c9c"
            }            

# Eliminación de orden 
DELETE -- localhost:3001/orders/:id

# REPOSITORIO GIT 

https://github.com/YonkieDave/prueba-tecnica