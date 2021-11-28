export default class Borrar{
    
    constructor(){
        this.btnBorrar = document.getElementById('btnBorrar');
    }

    onclick(){
        this.btnBorrar.onclick = () => {
            location.reload();
        }
    }

}