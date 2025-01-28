## Client Gateway
El client-gateway va a ser el punto de comunicacion entre el cliente y el servidor NATS

## Dev

1. Clonar repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `.env.template`
4. Tener levantado los microservicios que se van a consumir
5. Levantar el proyecto con `npm run start:dev`

## NATS
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats