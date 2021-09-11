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
        var x0 = 0, fx0 = 0, gx0 = 0, pendiente = 0;
        var sustitucion = inicio;
        var tabulacion1 = '', tomar = '';
        var error = 0, cont = 0;
        var gx0A = 0, gx0N = 0;
        var a = "";
        var resultados = new Array();
        var x2 = 0, x1 = 0, y1 = 0, y2 = 0;

        function f(x){
            //utilizamos eval para leer la expresion del string ingresado
            return eval(funcion);
        }
        //metodo para calcular la recurrencia 
        function g(fx0, pendiente, x0){
            return (fx0 - (pendiente*x0))/-pendiente;
        }

        cont += 1;
        x0 = sustitucion;
        fx0 = f(x0)

        if(fx0 <= 0){
            do{ 
                x0 = sustitucion;
                fx0 = f(x0);
                resultados.push(fx0);
                sustitucion += 1;
            }while(fx0 <= 0);
            y2 = resultados[resultados.length - 1];
            y1 = resultados[resultados.length - 2];
            x1 = sustitucion - 1;
            x2 = sustitucion - 2;
        }else if(fx0 > 0){
            do{ 
                x0 = sustitucion;
                fx0 = f(x0);
                resultados.push(fx0);
                sustitucion -= 1;
            }while(fx0 >= 0);
            y2 = resultados[resultados.length - 2];
            y1 = resultados[resultados.length - 1];
            x1 = sustitucion + 2;
            x2 = sustitucion + 1;
        }

        pendiente = (y2 - y1)/(x1 - x2);
        x0 = (x2 + x1)/2;      
        fx0 = f(x0);          
        gx0 = g(fx0, pendiente, x0);                                      
        gx0A = gx0;
        
        a ='<tr id="resultado">' 
                    +'<th scope="row">'+cont+'</th>'
                    +'<td>'+x0+'</td>'
                    +'<td>'+fx0+'</td>'
                    +'<td>'+gx0+'</td>'
                    +'<td>'+"-----"+'</td>'
                +'</tr>';
        document.getElementById('cont').innerHTML = a;
        do{         
            cont += 1;
  
            x0 = gx0;                
            fx0 = f(x0);          
            gx0 = g(fx0, pendiente, x0);                                       
            gx0N = gx0;
            error = gx0N - gx0A;
            if (error < 0){
                error *= -1;
            } else if(error > 0){
                error *= 1;
            }
            gx0A = gx0N;    
            
            a +='<tr id="resultado">' 
                    +'<th scope="row">'+cont+'</th>'
                    +'<td>'+x0+'</td>'
                    +'<td>'+fx0+'</td>'
                    +'<td>'+gx0+'</td>'
                    +'<td>'+error+'</td>'
                +'</tr>';
            }while(error > 0.001); 

            document.getElementById('cont').innerHTML = a;
            result.classList.remove('d-none');
            result.innerText = 'La raiz es = '+gx0+'\n Con un error de: '+error;       
    } 
        
    btnCalcular.onclick = calcular;
    btnLimpiar.onclick = borrar;
});