// importo la Clase ProductManager
const ProductManager = require('./ProductManager.js');

// Creo la instancia de la clase
const manager = new ProductManager()

const p3 = {
    id:3, 
    title: 'Teclado', 
    description: 'Teclado Mecanico', 
    price: 250000, 
    image: 'teclado.jpg', 
    stock: 30 
}

// Esta const la creo para que sea una const sin todos los atributos requeridos
const pError = {
    id:4, 
    title: 'Memoria RAM', 
    description: 'Mem RAM de 32gb (2x16gb)', 
    // price: 250000, 
    image: 'ram.jpg', 
    stock: 40 
}


// LA FORMA EN QUE HACEMOS QUE FUNCIONE ES HACIENDO UNA FUNCIÓN ASYNC DENTRO DE ejercicio4 PARA QUE FUNCIONE BIEN EL ASINCRONISMO

async function main() {
    console.log(await manager.getProducts()); // acá sin el producto agregado
    await manager.addProduct(p3);
    await manager.addProduct(p3);  // Intento agregar el mismo producto (debería fallar la validación)
    console.log(await manager.getProducts()); // acá con el producto agregado
    console.log(await manager.getProductById(1));
    await manager.addProduct(pError); // va a dar error
    
    

}

main();


/*
// Intento agregar el producto
manager.addProduct(p3);


// Intento agregar el mismo producto (debería fallar la validación)
manager.addProduct(p3);


// Obtener todos los productos
console.log(manager.getProducts());



// Intentar obtener un producto por ID

console.log(manager.getProductById(3)); // Debería devolver el producto
console.log(manager.getProductById(1)); // Debería devolver "Producto no encontrado"


const pError = {
    id:4, 
    title: 'Memoria RAM', 
    description: 'Mem RAM de 32gb (2x16gb)', 
    // price: 250000, 
    image: 'ram.jpg', 
    stock: 40 
}

// Intento agregar el producto que debería dar error por no tener todos los campos completados
manager.addProduct(pError);

*/