# ruben.cl

Sitio personal de **Ruben Eduardo Tejeda Roa**, construido con Angular para publicar en `ruben.cl`.

## Stack

- Angular standalone components, zoneless y con signals
- Angular Material y SCSS
- Prerender estático (SSG) con `@angular/ssr`: el HTML publicado ya incluye todo el contenido
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

El resultado queda en `dist/ruben-cl/browser` como sitio estático prerenderizado
(`index.html` con el contenido completo). Después del build, `scripts/update-sitemap-lastmod.mjs`
actualiza la fecha `<lastmod>` de `sitemap.xml` con la fecha del build.

## Pruebas

```bash
npm test
```

Las pruebas unitarias usan Vitest con el builder oficial de Angular.

## CI/CD

- **Pull requests a `main`** (`.github/workflows/test.yml`): ejecuta solo los
  tests. El check `test` es obligatorio para poder hacer merge.
- **Push a `main`** (`.github/workflows/deploy.yml`): compila y despliega, sin
  volver a ejecutar los tests (ya pasaron en el pull request).

## Despliegue

El workflow `.github/workflows/deploy.yml` compila el sitio y lo despliega al hacer push a `main`.

Para desplegar a tu servidor por SSH, configura estos secrets en GitHub:

- `SSH_HOST`
- `SSH_USER`
- `SSH_KEY`
- `SSH_PORT` opcional, usa `22` si no existe
- `DEPLOY_PATH`, por ejemplo `/var/www/ruben.cl`

El despliegue falla explícitamente si falta cualquiera de los secrets requeridos.

> Nota de seguridad: no se incluyen RUT, fecha de nacimiento ni domicilio en el sitio porque el repositorio será público.
