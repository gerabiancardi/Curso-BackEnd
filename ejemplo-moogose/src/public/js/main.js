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
            <td> <img height="72px" width="72px" src=${product.thumbnail} /> </td>

        </tr>
    `
    )
    .join(" ");

  productsContainer.innerHTML = allProductsElements;
});
