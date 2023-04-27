import ManagerUsuarios from './managers/ManagerUsers.js';

const manager = new ManagerUsuarios();

const env = async () =>{

    let user = {
        nombre: 'Juan',
        apellido: 'Bida',
        edad: 42,
        curso: 'Backend'
    };

    //let result = await manager.crearUsuario(user);
    //console.log(result);
    let user2 = {
        nombre: 'Lucas',
        apellido: 'Lopez',
        edad:18,
        curso: 'Backend'
    }
    let result = await manager.crearUsuario(user2);

    result = await manager.mostrarUsuarios()

    console.log(result);



}

env()