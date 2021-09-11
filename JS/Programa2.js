document.addEventListener('DOMContentLoaded', function(){
    const btnCalcular = document.getElementById("btnCalcular");
    const btnLimpiar = document.getElementById("btnBorrar");
    const alerta = document.getElementById('alerta');
    const mensaje = document.getElementById('mensaje');
    const mens = document.getElementById('mens');
    const tabla = document.getElementById('table'); //tabla general
    const contenido = document.getElementById('cont'); //contenido de la tabla
    const numero = document.getElementById('inicio');
    const funci = document.getElementById('funcion');
    const result = document.getElementById('resul');
    const tabulacion = document.getElementById('tabulacion');

    function borrar(){
        if(numero.value ===  '' && funci.value ===  ''){
            mens.classList.remove('d-none');
            alerta.classList.add('d-none');
            mensaje.classList.add('d-none');
            mens.innerText = 'No hay datos que borrar';
            return;
        }
        //location.reload(); esta funcion recarga la pagina
        contenido.innerHTML = "";
        document.getElementById("inicio").value = '';
        document.getElementById("funcion").value = '';
        result.classList.add('d-none');
        alerta.classList.add('d-none');
        mens.classList.add('d-none');
        mensaje.classList.remove('d-none');
        mensaje.innerText = 'Datos Borrados';      
    }

    function calcular(){
        if(numero.value === '' || funci.value === ''){
            alerta.classList.remove('d-none');
            mensaje.classList.add('d-none');
            mens.classList.add('d-none');
            alerta.innerText = 'Debe ingresar los datos';
            return;
        }
        alerta.classList.add('d-none');
        mensaje.classList.add('d-none');
        mens.classList.add('d-none');
        alerta.classList.add('d-none');
        mens.classList.add('d-none');
        const row = tabla.insertRow();

        var funcion = document.getElementById('funcion').value;//leemos la funcion escrita por el usuario
        var inicio = Number(document.getElementById('inicio').value);
        var xa = 0, fxa = 0, xb = 0, fxb = 0, xr = 0, fxr = 0;
        var sustitucion = inicio , continuar = 0;
        var tabulacion1 = '', tomar = '';
        var error = 0;
        var cont = 0;
        var fxrA = 0;
        var fxrN = 0;
        var a = "";
        var sus = 0;

        function f(x){
            //utilizamos eval para leer la expresion del string ingresado
            return eval(funcion);
        }

        cont += 1;
        xa = sustitucion;
        fxa = f(xa); //Obtenemos el valor para poder calcular las tabulaciones
        tabulacion.classList.remove('d-none');

        //Calculamos y mostramos las tabulaciones
        if(fxa <= 0){
            do{ 
                xa = sustitucion;
                fxa = f(xa);
                tabulacion1 += "f("+sustitucion+")"+" "+funcion+"= "+fxa+"<br>";
                sustitucion += 1;
            }while(fxa <= 0);
            sus = sustitucion - 2;
            continuar = sustitucion -1; 
        }else if(fxa > 0){
            do{ 
                xa = sustitucion;
                fxa = f(xa);
                tabulacion1 += "f("+sustitucion+")"+" "+funcion+"= "+fxa+"<br>";
                console.log("f("+sustitucion+")"+" "+funcion+"= "+fxa+"\n");
                sustitucion -= 1;
            }while(fxa >= 0);
            sus = sustitucion + 1;
            continuar = sustitucion + 2;
        }

        xa = sus;      
        fxa = f(xa);          
        xb = continuar;                   
        fxb = f(xb);                    
        xr = (xa + xb)/2;                    
        fxr = f(xr);
        fxrA = fxr;
        tomar = 'valor a tomar: '+xa;
        console.log("<br>"+"<br>"+'Valor a tomar: '+xa);
        a ='<tr id="resultado">' 
                    +'<th scope="row">'+cont+'</th>'
                    +'<td>'+xa+'</td>'
                    +'<td>'+fxa+'</td>'
                    +'<td>'+xb+'</td>'
                    +'<td>'+fxb+'</td>'
                    +'<td>'+xr+'</td>'
                    +'<td>'+fxr+'</td>'
                    +'<td>'+"-----"+'</td>'
                +'</tr>';
        document.getElementById('cont').innerHTML = a;
        do{         
            cont += 1;
            if(fxr < 0){
                xa = xr;                
                fxa = f(xa);          
                xb = xb;                   
                fxb = f(xb);                    
                xr = (xa + xb)/2;                    
                fxr = f(xr);
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
                fxa = f(xa);                   
                xb = xr;                   
                fxb = f(xb);                   
                xr = (xa + xb)/2;                   
                fxr = f(xr);                   
                fxrN = fxr;
                error = fxrN - fxrA;
                if (error < 0){
                    error *= -1;
                } else if(error > 0){
                    error *= 1;
                }
                fxrA = fxrN;
            }
            
            a +='<tr id="resultado">' 
                    +'<th scope="row">'+cont+'</th>'
                    +'<td >'+xa+'</td>'
                    +'<td>'+fxa+'</td>'
                    +'<td>'+xb+'</td>'
                    +'<td>'+fxb+'</td>'
                    +'<td>'+xr+'</td>'
                    +'<td>'+fxr+'</td>'
                    +'<td>'+error+'</td>'
                +'</tr>';
            }while(error > 0.001); 

            document.getElementById('cont').innerHTML = a;
            document.getElementById('tabulacion').innerHTML = tabulacion1 + tomar;
            result.classList.remove('d-none');
            result.innerText = 'La raiz es = '+xr+'\n Con un error de: '+error;       
    } 
        
    btnCalcular.onclick = calcular;
    btnLimpiar.onclick = borrar;
});