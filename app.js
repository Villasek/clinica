let listaUsuarios = [];

const objUsuario = {
    id: '',
    rut: '',
    nombre:'',
    apellido:'',
    
}

let editando = false;

const formulario = document.querySelector('#formulario');
const rutImput = document.querySelector('#rut');
const nombreImput = document.querySelector('#nombre');
const apellidoImput = document.querySelector('#apellido');
const btnAgregar = document.querySelector('#btnAgregar')

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e){
    e.preventDefault();

    if(rutImput.value === '' || nombreImput.value === '' || apellidoImput.value === ''){
        alert('Todos los campos son obligatorios.');
        return
    }

    if(editando){
        editarUsuario();
        editando = false;
    }else{
        objUsuario.rut = rutImput.value;
        objUsuario.nombre = nombreImput.value;
        objUsuario.apellido = apellidoImput.value;

        agregarUsuario();
    }

}

function agregarUsuario(){
    listaUsuarios.push({...objUsuario});

    mostrarUsuarios();
    
    formulario.reset();

    limpiarObjeto();
}


function limpiarObjeto() {
    objUsuario.rut = '';
    objUsuario.nombre = '';
    objUsuario.apellido = '';
}

function mostrarUsuarios(){

    limpiarHTML();


    const divUsuarios = document.querySelector('.div-usuarios');

    listaUsuarios.forEach( usuario => {
        const {id, rut, nombre, apellido} = usuario;

        const parrafo =document.createElement('p');
        parrafo.textContent = `${rut} - ${nombre} - ${apellido} - `;
        parrafo.dataset.rut = rut;
    
    
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarUsuario(usuario);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);


        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminar.usuario(rut);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');
        
        divUsuarios.appendChild(parrafo);
        divUsuarios.appendChild(hr);


    });
}

function cargarUsuario(usuario){

    const{rut, nombre, apellido} = usuario;

    rutImput.value = rut;
    nombreImput.value = nombre;
    apellidoImput.value = apellido;


    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true
}

function editarUsuario(){

    objUsuario.rut = rutImput.value;
    objUsuario.nombre = nombreImput.value;
    objUsuario.apellido = apellidoImput.value;

    listaUsuarios.map( usuario => {
        
        if(usuario.rut === objUsuario.rut){
            usuario.rut = objUsuario.rut;
            usuario.nombre = objUsuario.nombre;
            usuario.apellido = objUsuario.apellido;

        }

    });

    limpiarHTML();

    mostrarUsuarios();

    formulario.reset();
    
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar'

    editando = false
}


function elimiarUsuario(rut){
    listaUsuarios = listaUsuarios.filter(usuario => usuario.rut !== rut );

    limpiarHTML();
    mostrarUsuarios()
}

function limpiarHTML(){
    const divUsuarios = document.querySelector('.div-usuarios')
    while (divUsuarios.firstChild){
        divUsuarios.removeChild(divUsuarios.firstChild);

    }

}
