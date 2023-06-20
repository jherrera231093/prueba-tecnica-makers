const url='http://127.0.0.1:3000/api/usuarios'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalFondosdeInversionColectiva = new bootstrap.Modal(document.getElementById('modalFondosdeInversionColectiva'))
const formFondosdeInversiónColectiva = document.querySelector('form')
const nombresApellidos = document.getElementById('nombresApellidos')
const dniCe = document.getElementById('dniCe')
const numeroCuenta = document.getElementById('numeroCuenta')
const monto = document.getElementById('monto')
let opcion = ''

btnCrear.addEventListener('click', () => {
    nombresApellidos.value = ''
    dniCe.value = ''
    numeroCuenta.value = ''
    monto.value = ''
    modalFondosdeInversionColectiva.show()
    opcion = 'crear'
})

const mostrar = (cuentas) => {
    cuentas.forEach(cuenta => {
        resultados += `
        <tr>
            <td>${cuenta.id}</td>
            <td>${cuenta.nombresApellidos}</td>
            <td>${cuenta.dniCe}</td>
            <td>${cuenta.numeroCuenta}</td>
            <td>${cuenta.monto}</td>
            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
        <tr>
    `
    })
    contenedor.innerHTML = resultados;
}

fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .then(error => console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}        

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(url+id, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
    },
    function(){
        alertify.error('Cancel')
    })
})


let idForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const descripcionForm = fila.children[1].innerHTML
    const precioForm = fila.children[2].innerHTML
    const stockForm = fila.children[3].innerHTML
    descripcion.value =  descripcionForm
    precio.value =  precioForm
    stock.value =  stockForm
    opcion = 'editar'
    modalArticulo.show()
     
})

//Procedimiento para Crear y Editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear') {
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombresApellidos:nombresApellidos.value,
                dniCe:dniCe.value,
                numeroCuenta:numeroCuenta.value,
                monto:monto.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoUsuario = []
            nuevoUsuario.push(data)
            mostrar(nuevoUsuario)
        })
    }
    if(opcion=='editar'){    
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombresApellidos:nombresApellidos.value,
                dniCe:dniCe.value,
                numeroCuenta:numeroCuenta.value,
                monto:monto.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalArticulo.hide()
})

