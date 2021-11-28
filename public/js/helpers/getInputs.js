import Alert from "./alert.js";

export default class GetInputs{
    
    constructor(){
        this.btnCalcular = document.getElementById('btnCalcular');
        this.expresion = document.getElementById('txtExpresion');
        this.inicialX = document.getElementById('txtInicialX');
        this.alert = new Alert('alerta');
    }

    onclick(callback){

        this.btnCalcular.onclick = () => {
            if(!this.expresion.value || !this.inicialX.value){
                this.alert.show('Debes de ingresar todos los datos');
                return;
            }

            this.alert.hide();         
            const valorX = Number(this.inicialX.value);
            if(isNaN(valorX)) {
                this.alert.show('El número a empezar debe ser un número');
            } else{
                this.alert.hide();  
                callback(this.expresion.value, valorX);
            }
        }
    }

}