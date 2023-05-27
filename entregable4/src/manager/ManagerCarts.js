import fs from "fs";

export class CartManager {
    constructor(path) {
        this.path = path;
      }


      addCart= async(cart)=>{
        const carts= await this.getCarts();
        if (carts.length === 0) {
          cart.id = 1;
        } else {
          cart.id = carts[carts.length - 1].id + 1;
        }
        carts.push(cart);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(carts, null, "\t")
        );
        return "Carrito creado";
      }

      getCarts = async () => {
        if (fs.existsSync(this.path)) {
          const data = await fs.promises.readFile(this.path, "utf-8");
          const carts = JSON.parse(data);
          return carts;
        } else {
          return [];
        }
      };
    
      getCartById = async (id) => {
        const carts = await this.getCarts();
        const cart = carts.find((element) => {
          return element.id === parseInt(id);
        });
        return cart;
      };

      updateCart = async (cid, pid) => {
        const carts= await this.getCarts()
        const cart=await this.getCartById(parseInt(cid))
        if (!cart) {
          return ;
        }
        const product=cart.products.findIndex((p)=>p.id===parseInt(pid))
        if(product==-1){
          cart.products.push({id:parseInt(pid), quantity:1})
        }else{
          cart.products[product].quantity=cart.products[product].quantity+1
        }
        const cartIndex = carts.findIndex((p) => p.id == parseInt(cid));
        carts[cartIndex] = { ...carts[cartIndex], ...cart };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(carts, null, "\t")
        );
        return ({response:"Carrito actualizado correctamente", code:200})
      }; 
    
}