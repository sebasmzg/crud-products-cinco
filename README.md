# CRUD de Productos con React y TypeScript

Este proyecto es una aplicación CRUD (Create, Read, Update, Delete) de productos desarrollada con Next.js y TypeScript. Los datos se manejan tanto en el `localStorage` del navegador como en un servidor `JSON Server`.

## Tecnologías Utilizadas

- **React**: Biblioteca para la construcción de interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipos estáticos.
- **JSON Server**: Herramienta para crear una API REST falsa rápidamente.
- **localStorage**: API web para almacenar datos en el navegador.

<p align="center">
    <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" alt="TypeScript" width="100" height="100" style="margin: 0 20px;"/>
    <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" alt="React" width="100" height="100" style="margin: 0 20px;"/>
    <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="Next.js" width="100" height="100" style="margin: 0 20px;"/>
</p>

## Instalación y Configuración

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/sebasmzg/crud-products-cinco.git
   cd crud-products-cinco.git

2. **Instalar Dependencias:**
    ```bash
    npm install
3. **Iniciar el Servidor JSON:**

    ```bash
    npm run server
Esto iniciará el servidor en http://localhost:3000.

4. **Iniciar la Aplicación:**

    ```bash
    npm run dev
    npm start
La aplicación estará disponible en http://localhost:3001, ambos comandos son validos.

## Uso

- **Agregar Productos:** Completa el formulario con el título, descripción, precio y URL de la imagen del producto y haz clic en "Add Product".
- **Eliminar Productos:** Haz clic en el botón "Delete" junto al producto que desees eliminar.
- **Persistencia de Datos:** Los productos se almacenan tanto en el localStorage como en el servidor JSON Server. Los datos se cargan automáticamente desde el localStorage al cargar la aplicación. Si no hay datos en el localStorage, se cargan desde el JSON Server.

## Contribuir

- Las contribuciones son bienvenidas. Si tienes alguna mejora o corrección, por favor abre un pull request o issue.

<p align="center">
    <img src="https://riwi.io/wp-content/uploads/2023/07/favicon.png" alt="TypeScript" width="100" height="100" style="margin: 0 20px;"/>
</p>

<p align="center">
    <strong>Riwi Be a Coder</strong>
</p>