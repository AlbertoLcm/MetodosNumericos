import Alert from "../helpers/alert.js";
import Borrar from "../helpers/borrar.js";
import GetInputs from "../helpers/getInputs.js";

export default class Biseccion{

    constructor(){
        let alert = new Alert('alerta');
        this.inputs = new GetInputs();
        this.borrar = new Borrar()
        this.table = document.getElementById('ContTable');
        this.inputs.onclick((expresion, inicialX) => {
            this.expresion = expresion;
            this.inicialX = inicialX;
            try {
                this.tabular(); 
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
    
    tabular(){
        let xa = this.inicialX;
        let xb, sustitucion = xa;
        let fxa = this.f(xa);
        let tabulaciones = ``;
        let tabulacion = new Alert('tabulacion');
        
        if(fxa <= 0){
            do{ 
                xa = fxa;
                fxa = this.f(sustitucion);
                tabulaciones += `f(${sustitucion}) ${this.expresion} = ${fxa}<br>`;
                sustitucion += 1;
            }while(fxa <= 0);
            xa = sustitucion - 2;
            xb = sustitucion -1; 
        }else if(fxa > 0){
            do{ 
                xa = fxa;
                fxa = this.f(sustitucion);
                tabulaciones += `f(${sustitucion}) ${this.expresion} = ${fxa}<br>`;
                sustitucion -= 1;
            xa = sustitucion - 2;
            }while(fxa >= 0);
            xa = sustitucion + 1;
            xb = sustitucion +2; 
        }

        tabulacion.show(tabulaciones)
        this.calcular(xa, xb);
    }

    calcular(xa, xb){     
        let fxa = this.f(xa);                             
        let fxb = this.f(xb);                    
        let xr = (xa + xb)/2;                    
        let fxr = this.f(xr);
        let fxrA = fxr, fxrN, error, cont = 1;
        let filas = '';
        
        filas += `<tr id="resultado">
                    <th scope="row">${cont}</th>
                    <td>${xa}</td>
                    <td>${fxa}</td>
                    <td>${xb}</td>
                    <td>${fxb}</td>
                    <td>${xr}</td>
                    <td>${fxr}</td>
                    <td>------</td>
                  </tr>`;
        do{         
            cont += 1;
            if(fxr < 0){
                xa = xr;                
                fxa = this.f(xa);          
                xb = xb;                   
                fxb =this.f(xb);                    
                xr = (xa + xb)/2;                    
                fxr = this.f(xr);
                fxrN = fxr;
                error = fxrN - fxrA;
                if (error < 0){
                    error *= -1;
                } else if(error > 0){
                    error *= 1;
                }
                fxrA = fxrN;    
            }else if(fxr > 0){
                xa = xa;                
                fxa = this.f(xa);                   
                xb = xr;                   
                fxb = this.f(xb);                   
                xr = (xa + xb)/2;                   
                fxr = this.f(xr);                   
                fxrN = fxr;
                error = fxrN - fxrA;
                if (error < 0){
                    error *= -1;
                } else if(error > 0){
                    error *= 1;
                }
                fxrA = fxrN;
            }
            
            filas += `<tr id="resultado">
                        <th scope="row">${cont}</th>
                        <td>${xa}</td>
                        <td>${fxa}</td>
                        <td>${xb}</td>
                        <td>${fxb}</td>
                        <td>${xr}</td>
                        <td>${fxr}</td>
                        <td>${error}</td>
                      </tr>`;
            }while(error > 0.001); 
            this.table.innerHTML = filas;
            let resul = new Alert('resul');
            resul.show(`La raiz es = ${xr} <br> Con un error de: ${error}`)
    }
}