# ruben.cl

Sitio personal de **Ruben Eduardo Tejeda Roa**, construido con Angular para publicar en `ruben.cl`.

## Stack

- Angular standalone components
- SCSS
- GitHub Actions para build y despliegue

## Desarrollo local

```bash
npm install
npm start
```

Luego abre `http://localhost:4200`.

## Build

```bash
npm run build
```

El resultado queda en `dist/ruben-cl/browser`.

## Despliegue

El workflow `.github/workflows/deploy.yml` compila el sitio y deja listo el artefacto.

Para desplegar a tu servidor por SSH, configura estos secrets en GitHub:

- `SSH_HOST`
- `SSH_USER`
- `SSH_KEY`
- `SSH_PORT` opcional, usa `22` si no existe
- `DEPLOY_PATH`, por ejemplo `/var/www/ruben.cl`

> Nota de seguridad: no se incluyen RUT, fecha de nacimiento ni domicilio en el sitio porque el repositorio será público.
