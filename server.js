const http = require('http');
const port = 4000;

// importo la Clase ProductManager
const ProductManger = require('./ProductManager.js');

// Creo la instancia de la clase
const manager = new ProductManger();

// convierto en async a esta función porque sino no funciona
const server = http.createServer(async (request, response) => {
    const url = request.url;

    // con esto podemos buscar el id que se mande por url
    const array = url.split("/");
    const controller = array[1] ? array[1] : null;
    const id = array[2] ? parseInt(array[2]) : null;
    console.log(controller, id);

    if (url === "/"){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Bienvenido al ejercicio 5');

    } else if (url === "/products"){
        // primero guardo en una const todos los prodcutos para despupés convertirlo en una cadena JSON
        const products = await manager.getProducts();
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(JSON.stringify(products));

    } else if (controller === "products" && id){
        // busco el producto por id
        const product = await manager.getProductById(id);
        if (product) {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end(JSON.stringify(product));
        } else {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('El producto seleccionado no existe')
        }

    } else {
        // enviamos los encabezados de error si ninguna de las rutas coincide
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Error 404 | Recurso no encontrado')
    }

});

server.listen(port, ()=>{
    console.log("Servidor en el puerto", port)
});

// con http://127.0.0.1:4000/ entro