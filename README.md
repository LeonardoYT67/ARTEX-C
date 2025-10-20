ArteX Company — Vercel + Cloudinary Ready
----------------------------------------

Contenido:
- public/             -> frontend (index, servicios, portafolio, contacto)
- api/list.js         -> Serverless function: lista imágenes de Cloudinary (requiere API_KEY/SECRET)
- README.md           -> este archivo

Instrucciones rápidas:

1) Crear cuenta en Cloudinary (https://cloudinary.com) y anotar:
   - CLOUD_NAME
   - API Key
   - API Secret

2) Crear un unsigned upload preset (o usa signed uploads and create a /api/sign endpoint).
   - Dashboard > Settings > Upload > Upload presets > Add upload preset
   - Set 'Unsigned' to ON and name it, por ejemplo: 'unsigned_preset_1'

3) En Vercel:
   - Crear nuevo proyecto y conectar con tu repo (o subir ZIP).
   - En Settings > Environment Variables añade:
     - CLOUDINARY_CLOUD_NAME  = tu Cloud name
     - CLOUDINARY_API_KEY     = tu API Key
     - CLOUDINARY_API_SECRET  = tu API Secret
     - CLOUDINARY_UPLOAD_PRESET = el nombre del upload preset (si usas unsigned)

4) Deploy en Vercel.
   - Las funciones serverless están en /api.
   - La ruta para listar imágenes es: /api/list

Cómo funciona:
- El formulario de subida en /portafolio.html hace un POST directo a Cloudinary (unsigned).
- Para mostrar la galería, la página consulta /api/list que usa las credenciales (API Key/Secret) para llamar al admin API de Cloudinary y devolver la lista de imágenes.

Notas de seguridad:
- Nunca expongas tu API Secret en el frontend. Debe quedar en las variables de entorno de Vercel.
