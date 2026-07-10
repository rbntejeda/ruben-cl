# palworld-dashboard

Dashboard en Angular para vigilar un servidor de Palworld con una estética de operación ligera, pensado para recibir snapshots por websocket y pub/sub.

## Qué hace

- Muestra CPU, memoria, jugadores, latencia y disponibilidad.
- Actualiza el estado cada 5 segundos.
- Incluye la arquitectura recomendada para `collector -> pub/sub -> websocket -> UI`.
- Está preparado para publicarse detrás de Nginx Proxy Manager.

## Stack

- Angular 20
- SCSS
- Angular Material
- Vitest

## Desarrollo local

```bash
npm install
npm start
```

Luego abre `http://localhost:4200`.

## Pruebas

```bash
npm test
```

## Build

```bash
npm run build
```

## Despliegue

El repositorio mantiene el flujo de GitHub Actions para build y despliegue estático. Si lo vas a poner detrás de un proxy:

- expón el frontend por HTTP/HTTPS
- deja pasar websocket en la ruta del backend
- mantén Redis y el collector en red privada

## Ruta recomendada para evolucionarlo

1. Agregar un backend pequeño con `ws` y `redis`.
2. Publicar snapshots por Redis Pub/Sub.
3. Leer el estado del juego, del host y del contenedor cada 5 segundos.
4. Servir la UI detrás de Nginx Proxy Manager.
