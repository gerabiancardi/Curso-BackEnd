const socket = io();
const productsContainer = document.getElementById("products-table-body");
socket.on("products", (products) => {
const allProductsElements = products
    .map(
      (product) => `
        <tr>
            <td> ${product.title} </td>
            <td> ${product.description} </td>
            <td> ${product.price} </td>
        </tr>
    `
    )
    productsContainer.innerHTML=allProductsElements
});
