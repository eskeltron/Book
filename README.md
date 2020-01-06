# Project of books

## Presentación

Hola! Este es mi primer proyecto, es un repositorio donde subo las prácticas de las tecnologías que voy aprendiendo.

El proyecto consta de ser una **página de libros**, en la cuál se pueda vender. Se divide básicamente en 2 tipos de vistas:

***Administrador***: Se encarga de subir, editar y eliminar libros.  
***Usuarios***: Sin ellos la página no tendría sentido, ellos son los que pueden comprar libros.  

### Tecnologías implementadas

**Ejs** -> Template engine.  
**Bootstrap**/**CSS** -> Design.  
**Node.Js** -> Backend.  
**MongoDB** -> DB.

Generalmente  actualizo este repositorio con las implementaciones realizadas.

## Funcionalidades del sitio web

Projects of Books es una página en donde, hay 4 vistas principales:

### Página de inicio

Página inicial del sitio web, aquí solamente se muestran los libros disponibles.

![Home](https://i.ibb.co/9bjw3t6/Home.jpg)

### Subir nuevo libro  

Un lugar donde puedas subir un libro (o varios)
Datos que posee un libro:  
    - Un Título  
    - Un autor  
    - Una imagén  
La imagén se buscará dentro de tu computadora y cuando subas el libro al servidor, esta imagen se guarda automáticamente del lado del servidor, y una descripción del libro.

### Editar un libro  

Te permite editar un libro, previamente seleccionando cuál editar, y vas a poder modificar cualquiera de sus propiedades. No es necesario que vuelvas a elegir una imagén, si no seleccionas nada quedará la misma que tenía antes.

![Edit](https://i.ibb.co/RNCSmY7/Edit-Book-2.jpg)

### Eliminar libro

Elimina al libro del sistema completamente.

![Delete book](https://i.ibb.co/Wf24tyJ/Delete-Edit.jpg)

### Navigation  

Es sólo una sección de la página donde podes ver los libros a través de una navegación de 3 en 3.

![Navigation](https://i.ibb.co/2n1zJZ1/Navigation.jpg)

Por último, lleva un sistema de Login el cuál al registrarse encripta la contraseña con **bcrypt** para luego almacenarla en la base de datos.

![Register](https://i.ibb.co/FYQGJrS/Register.jpg)

Al momento de logear, se utiliza **JWT** para la verificación, con una duración del token de 1 hora, **a través de Cookies**.

![Login](https://i.ibb.co/WHBB0XC/Login.jpg)

Profile y Cookie almacenada correctamente. También, el usuario "eskeltron" es administrador, por eso, él puede editar y subir nuevos libros. (Observar la barra de navegación).

![Profile](https://i.ibb.co/WfYmNY9/Profile.jpg)

## Como probarlo en tu computadora

Para probarlo en tu computadora es sencillo, solamente necesitas tener instalado los siguientes programas:

[Node.JS](https://nodejs.org/es/download/)  
[MongoDB](https://www.mongodb.com/download-center/community)

Una vez instalados, descargas el repositorio e inicias npm

```npm init -y```
Comenzará a instalar todas las dependencias. Una vez instaladas todas las dependencias, necesitamos poner en línea la base de datos, abrimos el mongo daemon

![MongoDaemon](https://i.ibb.co/0G7TCrS/MongoD.jpg)

Una vez ejecutado, quedará abierto en una ventana CMD. ¡Listo! La base de datos ya está corriendo. Por default, viene establecida en "localhost:27017" (Que es justo como está configurado la página).

¡Ahora sí!, no hace falta más nada. Solamente ir a la carpeta raíz del proyecto y ejecutar el siguiente comando con cmd ```npm run dev```
¡Listo! La página está escuchando peticiones a través de **localhost:5000**.

### IMPORTANTE

Por default, cuando creamos un nuevo usuario este será un usuario común, la única forma de convertir esa cuenta en administrador es ejecutando un cliente de MongoDB y cambiando la propiedad **admin** de la cuenta a **true**, suelo realizar este paso a través del **MongoDBCompassCommunity**.

(Programa que se instala automáticamente con MongoDB, es una interfaz gráfica que permite interactuar con tu base de datos muy intuitivamente sin comandos complejos).

![MongoDBCompassCommunity](https://i.ibb.co/56WXzrZ/Community.jpg)

Una vez dentro del programa, se conectan a su DB,
Books_Project -> users y ahí tienen una lista de los usuarios registrados, solamente hacen click en donde dice admin:**false**, lo cambian por **true** y listo.

![MongoDBCompassCommunity](https://i.ibb.co/LzxYvKm/Mongo-DBCompass.jpg)

¡Ahora sí!

Ya puedes experimentar con la página y todas sus funcionalidades. ¡Gracias por leer!

Te dejo mi [Linkedin](https://www.linkedin.com/in/nicolásgomez/) Para cualquier consulta.
