import Alert from "../helpers/alert.js";
import Borrar from "../helpers/borrar.js";
import GetInputs from "../helpers/getInputs.js";

export default class Newton{

    constructor(){
        let alert = new Alert('alerta')
        this.inputs = new GetInputs();
        this.borrar = new Borrar();
        this.table = document.getElementById('ContTable');
        this.inputs.onclick((expresion, inicialX) => {
            this.expresion = expresion;
            this.inicialX = inicialX;
            this.derivada = math.derivative(expresion, 'x').toString();
            try {
                this.calcular(); 
            } catch (error) {
                alert.show('Debes ingresar una función valida')
            }
        });
        this.borrar.onclick();

    }

    f(x){
        const scope = { x };
        return math.evaluate(this.expresion, scope);
    }

    f1(x){
        const scope = { x };
        return math.evaluate(this.derivada, scope);
    }
    
    g(x, fx0, f1x0){
        return x - (fx0 / f1x0);
    }

    calcular(){     
        let x0 = this.inicialX;
        let fx0 = this.f(x0);
        let f1x0 = this.f1(x0);
        let gx0 = this.g(x0, fx0, f1x0);
        let cont = 1, filas = '', error, gx0A = gx0, gx0N;

        filas += `<tr id="resultado">
                    <th scope="row">${cont}</th>
                    <td>${x0}</td>
                    <td>${fx0}</td>
                    <td>${f1x0}</td>
                    <td>${gx0}</td>
                    <td>-----</td>
                  </tr>`;
        do{         
            cont += 1;
            x0 = gx0;
            fx0 = this.f(x0);
            f1x0 = this.f1(x0);
            gx0 = this.g(x0, fx0, f1x0); 
            gx0N = gx0;
            error = gx0N - gx0A;
            if (error < 0){
                error *= -1;
            } else if(error > 0){
                error *= 1;
            }
            gx0A = gx0N; 
            
            filas += `<tr id="resultado">
                        <th scope="row">${cont}</th>
                        <td>${x0}</td>
                        <td>${fx0}</td>
                        <td>${f1x0}</td>
                        <td>${gx0}</td>
                        <td>${error}</td>
                      </tr>`;
            }while(error > 0.001); 

            const expresiones = new Alert('tabulacion');
            expresiones.show(`Función: <br>
                            ${this.expresion} <br>
                            Derivada de la función: <br>
                            ${this.derivada}`);
            this.table.innerHTML = filas;
            let resul = new Alert('resul');
            resul.show(`La raiz es = ${gx0} <br> Con un error de: ${error}`)
    }
}