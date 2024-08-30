const chalk = require('chalk');
const express = require('express'); // importa el módulo Express.
const app = express(); // crea una instancia de una aplicación Express. Esto te permite definir rutas, middlewares y otras configuraciones para tu servidor.
const port = 3000; 

console.log(chalk.blue('Ahora tengo colores'));
console.log(chalk.bgGreen('Con fondo verde'));


// para crear rutas:
app.get('/', (request, response) => {
    // esto es para la ruta '/'
    response.send('Home')
    console.log("El cliente ingresó a la ruta raíz")
})

app.get('/products', (request, response) => {
    // esto es para la '/products'
    response.send('Products')
    console.log("El cliente ingresó a la ruta Products")
})

// esto es un caso hipotético para mostrar que además de texto plano se pueden enviar otras cosas:
app.get('/json', (request, response) => {
    const objeto = {
        nombre: 'Teclado mecánico',
        precio : 7000
    }
    response.json(objeto)
})


// esto es para crear una ruta con parámetros
app.get('/products/:id', (request, response) => {
    // con los ':' definimos los parámetros
    // console.log(request) ESTE CONSOLE.LOG ME SIRVE PARA VER QUE DENTRO DEL OBJETO REQUEST ESTÁ 'params' QUE ES DONDE ESTÁN LOS ID
    const id = request.params.id
    response.send(`Products con el id ${id}`)
    console.log(`El cliente ingresó a la ruta Products con el id ${id}`)
})



// El servidor se inicia con la llamada a app.listen()
app.listen(port, () => {
    console.log(chalk.green(`Servidor escuchando en el puerto ${port}`))
    /* 
    app.listen(port, callback) inicia el servidor en el puerto especificado (3000 en este caso). La función de callback se ejecuta cuando el servidor está en funcionamiento, y puedes usarla para imprimir un mensaje en la consola o realizar otras acciones.
    */
})