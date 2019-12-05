# Book_project
"Mini proyecto" donde implemento todo lo aprendido.

Ejs -> view engine,
Bootstrap -> design,
Node -> backend,
MongoDB -> bdd

Día a día actualizo este repositorio con cosas nuevas que voy implementando.

El proyecto "Book_Projects" consta de ser una página en donde, hay 3 funcionalidades principales:

1) SUBIR NUEVO LIBRO - Un lugar donde puedas subir un libro ( o varios ) con, un Título, un autor, una imagén (la cuál la buscarás dentro de tu computadora y cuando subas el libro al servidor, esta imagen se guarda automáticamente en el backend), y una descripción.
2) EDITAR UN LIBRO - Te permite editar un libro, previamente seleccionando cuál queres editar, y vas a poder editar cualquiera de sus propiedades.
3) ELIMINAR LIBRO - Elimina al libro del sistema completamente.

Plus - "Searching" - Lo llamé así, es sólo una sección de la página donde podes ver los libros a través de una navegación.

Cabe aclarar que todo esto está relacionado, los libros se almacenan en una colección llamada "book", y se van guardando como documentos, a través de node renderizo con ejs, y este a su vez utiliza bootstrap para el aspecto de la página.

A futuro planeo implementar muchas cosas más interesantes como JWT, algún simulador de pago, chat entre los usuarios y/o administradores.
