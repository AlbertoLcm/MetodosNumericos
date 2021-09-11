document.addEventListener('DOMContentLoaded', function(){
    const val1 = document.getElementById("valor1");
    const val2 = document.getElementById("valor2");
    const btnCalcular = document.getElementById("btnCalcular");
    const btnLimpiar = document.getElementById("btnBorrar");
    const alerta = document.getElementById('alerta');
    const mensaje = document.getElementById('mensaje');
    const mens = document.getElementById('mens');

    function limpiar(){
        if(val1.value ===  '' && val2.value === ''){
            mens.classList.remove('d-none');
            alerta.classList.add('d-none');
            mensaje.classList.add('d-none');
            mens.innerText = 'No hay datos que borrar';
            return;
        }else{
            document.getElementById("valor1").value = '';
            document.getElementById("valor2").value = '';
            document.getElementById("EA").value = '';
            document.getElementById("ER").value = '';
            document.getElementById("EP").value = '';
            alerta.classList.add('d-none');
            mens.classList.add('d-none');
            mensaje.classList.remove('d-none');
            mensaje.innerText = 'Datos Borrados';
        }
    }

    function calcular(){
        var num1 = Number(document.getElementById("valor1").value);
        var num2 = Number(document.getElementById("valor2").value);
        if(val1.value ===  '' || val2.value === ''){
            alerta.classList.remove('d-none');
            mensaje.classList.add('d-none');
            mens.classList.add('d-none');
            alerta.innerText = 'Debe ingresar los datos';
            return;
        }else{
            alerta.classList.add('d-none');
            mensaje.classList.add('d-none');
            mens.classList.add('d-none');
            var ea = num1-num2;
            if(ea <= -1){
                ea *= -1;
                document.getElementById("EA").value = ea;
            }else{
                document.getElementById("EA").value = ea;
            }
            var er = (ea/num1);
            document.getElementById("ER").value = er;

            var ep = (er)*100;
            document.getElementById("EP").value = ep+" %";
        }    
    }

    btnCalcular.onclick = calcular;
    btnLimpiar.onclick = limpiar;
});