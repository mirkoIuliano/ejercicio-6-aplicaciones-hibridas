const chalk = require('chalk');
const express = require('express'); // importa el módulo Express.
const app = express(); // crea una instancia de una aplicación Express. Esto te permite definir rutas, middlewares y otras configuraciones para tu servidor.
const port = 3000; 

// importamos ProductManager
const ProductManager = require('./ProductManager.js');

// creo un objeto ProductManager
const manager = new ProductManager();

// console.log(chalk.blue('Ahora tengo colores'));
// console.log(chalk.bgGreen('Con fondo verde'));


// para crear rutas:
function home (request, response){
    // esto es para la ruta '/'
    response.send('Home')
    console.log("El cliente ingresó a la ruta raíz")
}

// acá estamos diciendo que cuando la ruta conincida se active la función home
app.get('/', home);

/* 
ANTES HICIMOS ASÍ
app.get('/', (request, response) => {
    // esto es para la ruta '/'
    response.send('Home')
    console.log("El cliente ingresó a la ruta raíz")
})
PERO EN CLASE 7 VIMOS QUE LA FORMA CORRECTA ES YA TENER CREADA LA FUNCIÓN
*/

// creo la función products que nos lleva a la página products
async function prodcucts (request, response) {
    try {
        // esto es para la '/products'
        response.json(await manager.getProducts())
        console.log("El cliente ingresó a la ruta Products")
    } catch (error) {
        console.error(error);
    }
}

// si la ruta coincide se activa la función products
app.get('/api/products', prodcucts)

/* 
// esto es un caso hipotético para mostrar que además de texto plano se pueden enviar otras cosas:
    app.get('/json', (request, response) => {
        const objeto = {
            nombre: 'Teclado mecánico',
            precio : 7000
        }
        response.json(objeto)
    })
*/


// esto es para crear una ruta con parámetros
async function productsId(request, response) {
    try {
        // con los ':' definimos los parámetros
        // console.log(request) ESTE CONSOLE.LOG ME SIRVE PARA VER QUE DENTRO DEL OBJETO REQUEST ESTÁ 'params' QUE ES DONDE ESTÁN LOS ID
        const id = parseInt(request.params.id);
        const productoId = await manager.getProductById(id);
        if (!productoId){
            return response.status(404).send('Prodcto no encontrado');
            // con el .status() definimos el estado de la respuesta. 404 significa 'Not found' y es por eso que lo uso acá
        }
        response.json(productoId);
        console.log(`El cliente ingresó a la ruta Products con el id ${id}`);
    } catch (error) {
        console.error(error);
        response.status(500).send( 'Ocurrió un error al obtener el producto');
    }
}
app.get('/api/products/:id', productsId);



// Método POST -> lo usamos para enviar datos
// esto lo debería hacer arriba de todo, pero lo hago acá para verlo más fácil:
app.use(express.json()); 

// esta nueva ruta sirve para AGREGAR un nuevo producto. Recibe los datos del producto en el cuerpo de la solicitud en fortmato JSON y los agrega al data.json usando el método addProduct() de ProductManager y devuelve el prodcuto agregado o un mensaje de error si la validación falla
app.post('/api/products', async (request, response) => {
    try {
    // la idea es que en la herramienta 'Postman', desde la url '127.0.0.1:3000/api/products', se envíe por POST un json. Ej: { "id" : 5, "title" : "placa de video", "description" : "3090 rtx", "price" : 550, "image" : "placa.jpg", "stock" : 2 }
    const newProduct = request.body; // con request.body obtenemos el contenido del request, osea el json entero
    console.log('Cliente en la ruta POST: /api/products');
    console.log(newProduct); // acá hacemos un console.log del contenido del pedido
    // IMPORTANTE: lo que el cliente nos está enviando es un json. Express por sí solo no puede procesar un json, no lo recibe. Para eso hacemos el app.use(express.json()). Sin esto el body va a aparecer como undefined 


    // ahora valido de que el json tenga todos los atributos correspondeintes antes de guardarlo en data.json
    
    // primero valido que todos los campos estén presentes y que no estén vacíos
    const { id, title, description, price, image, stock } = newProduct;
    if (!id || !title || !description || !price || !image || !stock) {
        return response.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        // uso return así termina la ejecución. Si no lo pongo va a seguir y va a agregar el producto igual
    }

    // después valido que el precio, stock e id sean números válidos
    if (isNaN(price) || isNaN(stock) || isNaN(id)) {
        return response.status(400).json({ mensaje: 'El ID, el precio y el stock deben ser números válidos' });
        // uso return así termina la ejecución. Si no lo pongo va a seguir y va a agregar el producto igual
    }
    
    // si está todo correcto entonces se agrega el prodcuto
    await manager.addProduct(newProduct);
    response.json({mensaje : 'Prodcuto nuevo agregado'}) // esto es el mensaje que se le va a enviar al cliente y que se imprime en la página (es como el response.send de antes). En este caso nos sirve para avisar que se guardó el json que mandó
    
    } catch (error) {
        console.error(error);
        response.status(500).send('Ocurrió un error al intentar agregar el producto');
    }
    
})




// El servidor se inicia con la llamada a app.listen()
app.listen(port, () => {
    console.log(chalk.green(`Servidor escuchando en el puerto ${port}`))
    /* 
    app.listen(port, callback) inicia el servidor en el puerto especificado (3000 en este caso). La función de callback se ejecuta cuando el servidor está en funcionamiento, y puedes usarla para imprimir un mensaje en la consola o realizar otras acciones.
    */
})

