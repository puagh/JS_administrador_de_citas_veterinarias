/**
 * Constante que selecciona el formulario de registro de citas.
 * @constant appointmentForm 
 */
const appointmentForm = document.querySelector('#nueva-cita');
/**
 * Constante que selecciona la entrada de mascota en el formulario.
 * @constant petInput 
 */
const petInput = document.querySelector('#mascota');
/**
 * Constante que selecciona la entrada de propietario de la mascota en el formulario.
 * @constant petOwnerInput 
 */
const petOwnerInput = document.querySelector('#propietario');
/**
 * Constante que selecciona la entrada del teléfono del propietario de la mascota en el formulario.
 * @constant phoneInput 
 */
const phoneInput = document.querySelector('#telefono');
/**
 * Constante que selecciona la entrada de la fecha de la cita en el formulario.
 * @constant dateInput 
 */
const dateInput = document.querySelector('#fecha');
/**
 * Constante que selecciona la entrada de la hora de la cita en el formulario.
 * @constant hoursInput 
 */
 const hoursInput = document.querySelector('#hora');
/**
 * Constante que selecciona la entrada de los síntomas de la mascota en el formulario.
 * @constant symptomsInput 
 */
const symptomsInput = document.querySelector('#sintomas');
/**
 * Constante que selecciona el contenedor de las citas registradas.
 * @constant appointmentContainer 
 */
const appointmentContainer = document.querySelector('#citas');

/**
 * Variable booleana que advierte si se está en modo edición o de crear nueva cita para el método de addAppointment
 * @var editMode 
 */
let editMode;


class Appointment{
    constructor(){
        this.appointments = [];
    }

    /**
     * Método de la clase Appointment que agrega las citas al arreglo appointments
     * @method addAppointment
     * @param {Object} appointment Objeto con la información de citas
     */
    addAppointment(appointment){
        this.appointments = [...this.appointments, appointment];
    }

    /**
     * Método de la clase Appointment encargado de eliminar la cita filtrándola del arreglo appointments
     * @method deleteAppointment
     * @param {Number} idAppointment Id de la cita que se desea eliminar 
     */
    deleteAppointment(idAppointment){
        this.appointments = this.appointments.filter( appointment => appointment.id !== idAppointment);
    }

    /**
     * Método de la clase Appointment que se encarga de actualizar la cita deseada mediante el id
     * @method editAppointment
     * @param {Object} updatedAppointment Id de la cita que se va a actualizar
     */
    editAppointment(updatedAppointment){
        this.appointments = this.appointments.map(appointment => appointment.id === updatedAppointment.id ? updatedAppointment : appointment);
    }


}

class UI{

    /**
     * Función que se encarga de mostrar en la interfaz de usuario un mensaje en pantalla sobre algún evento 
     * @function showAlert
     * @param {String} message Mensaje de alerta, para mostrar al usuario si ocurre algo 
     * @param {String} typeOfMessage Tipo de mensaje puede ser error o no existir
     */
    showAlert(message, typeOfMessage){
        //Crear el elemento DIV
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Validando el tipo de error
        if(typeOfMessage){
            divMessage.classList.add('alert-danger');
        } else{
            divMessage.classList.add('alert-success');
        }

        //Mensaje del elemento
        divMessage.textContent = message;

        //Agregando al DOM
        document.querySelector('#contenido').insertBefore(divMessage, document.querySelector('.agregar-cita'));

        //Quitar alerta al pasar 2 segundos
        setTimeout(() => {
            divMessage.remove();
        }, 2000);
    }

    /**
     * Muestra el HTML de las citas en la pantala
     * @function showAppointments 
     * @param {Object} appointments 
     */
    showAppointments({appointments}){

        this.clearHTML();

        appointments.forEach(appointment => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = appointment;
            const divAppointment = document.createElement('div');
            divAppointment.classList.add('cita', 'p-3');
            divAppointment.dataset.id = id;

                        //Creando elementos HTML de la cita 

            //Nombre de la mascota
            const petElement = document.createElement('h2');
            petElement.classList.add('cart-title', 'font-weight-bolder');
            petElement.textContent = mascota;

            //Propietario
            const ownerElement = document.createElement('p');
            ownerElement.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            //Teléfono
            const phoneElement = document.createElement('p');
            phoneElement.innerHTML = `
                <span class="font-weight-bolder">Teléfono: </span> ${telefono}
            `;

            //Fecha
            const dateElement = document.createElement('p');
            dateElement.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            //Hora
            const timeElement = document.createElement('p');
            timeElement.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            //Síntomas
            const symptomsElement = document.createElement('p');
            symptomsElement.innerHTML = `
                <span class="font-weight-bolder">Síntomas: </span> ${sintomas}
            `;

            //Botón eliminar cita
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
            btnDelete.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`;

            btnDelete.onclick = () => deleteAppointmentFnc(id);

            //Botón editar cita
            const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn', 'btn-info', 'mr-2');
            btnEdit.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>`;
            btnEdit.onclick = () => editAppointmentFnc(appointment);

            //Agregar Elementos a divAppointment
            divAppointment.appendChild(petElement);
            divAppointment.appendChild(ownerElement);
            divAppointment.appendChild(phoneElement);
            divAppointment.appendChild(dateElement);
            divAppointment.appendChild(timeElement);
            divAppointment.appendChild(symptomsElement);
            divAppointment.appendChild(btnDelete);
            divAppointment.appendChild(btnEdit);

            //Agregar citas al HTML
            appointmentContainer.appendChild(divAppointment);
        });
    }

    clearHTML(){
        while(appointmentContainer.firstChild){
           appointmentContainer.removeChild(appointmentContainer.firstChild);
        }
    }
}

// Instanciamiento de las clases
const ui = new UI();
const manageAppointments = new Appointment();








/**
 * Encargada de ingresar información ingresada por el usuario al appointmentObj
 * @function appointmentData 
 * @param {Object} e Parámetro que se pasa por el evento asociado al elemento seleccionado
 */
 const appointmentData = function (e){
    appointmentObj[e.target.name] = e.target.value;
}

/**
 * Se encarga de reescribir los valores del objeto para que sean vacíos
 * @function resetObject
 * @returns {void}
 */
const resetObject = function(){
    appointmentObj.mascota = '';
    appointmentObj.propietario = '';
    appointmentObj.telefono = '';
    appointmentObj.fecha = '';
    appointmentObj.hora = '';
    appointmentObj.sintomas = '';
}



const newAppointment = function(e){
    e.preventDefault();
    
    //Extraer información del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = appointmentObj;
    
    //validar información del formulario
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas=== '' ){
        ui.showAlert('Todos los campos son obligatorios', 'error');
        return;
    }

    //Verificando modo creación o edición
    if(editMode){
        ui.showAlert('Editado correctamente');

        //Pasar el objeto de la cita a edición
        manageAppointments.editAppointment({...appointmentObj});

        //Cambiar el texto del botón crear cita
        appointmentForm.querySelector('button[type="submit"]').textContent = 'Crear cita';

        //Quitar modo edición
        editMode = false;

    } else{
        //Generar un ip único para poder modificar sus propiedades o eliminar cita
        appointmentObj.id = Date.now();

        //crear la cita
        manageAppointments.addAppointment({...appointmentObj});

        //Mensaje de cita agregada correctamnete
        ui.showAlert('Cita agregada correctamente');
    }

    
    //Limpiar el objeto
    resetObject();

    //LimpiarFormulario
    appointmentForm.reset();

    //mostrar HTML de las citas
    ui.showAppointments(manageAppointments);
}






/**
 * Función que se encarga de contener todos los eventListeners que se utilizan en la app
 * @function eventListeners 
 * @returns {void}
 */
const eventListeners = function () {
    //EventListenerds para las entradas de datos del usuario
    petInput.addEventListener('input', appointmentData);
    petOwnerInput.addEventListener('input', appointmentData);
    phoneInput.addEventListener('input', appointmentData);
    dateInput.addEventListener('input', appointmentData);
    hoursInput.addEventListener('input', appointmentData);
    symptomsInput.addEventListener('input', appointmentData);

    //EventListener para submit
    appointmentForm.addEventListener('submit', newAppointment);
}
eventListeners();

/**
 * Objeto que contiene la información de la cita a guardar
 * @constant appointmentObj 
 */
const appointmentObj = {
    mascota: '',
    propietario: '',
    telefono: '', 
    fecha: '',
    hora: '',
    sintomas: ''
}

/**
 * Función encargada de ejecutar las acciones para eliminar la cita deseada
 * @function deleteAppointmentFnc
 * @param {Number} idAppointment Id de la cita que se desea eliminar 
 */
const deleteAppointmentFnc = function(idAppointment){
    // Eliminar cita
    manageAppointments.deleteAppointment(idAppointment);
    //Mostrar mensaje
    ui.showAlert('La cita se eliminó correctamente');
    //refrescar las citas
    ui.showAppointments(manageAppointments);
}

/**
 * Función que se encarga del manejo del objeto para la edición de una cita
 * @function editAppointmentFnc
 * @param {Object} appointment Objeto que contiene la información de la cita para editar
 */
const editAppointmentFnc = function(appointment){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = appointment;

    //Llenar entradas
    petInput.value = mascota;
    petOwnerInput.value = propietario;
    phoneInput.value = telefono;
    dateInput.value = fecha;
    hoursInput.value = hora;
    symptomsInput.value = sintomas;

    //Llenar el objeto con la información

    appointmentObj.mascota = mascota;
    appointmentObj.propietario = propietario;
    appointmentObj.telefono = telefono;
    appointmentObj.fecha = fecha;
    appointmentObj.hora = hora;
    appointmentObj.sintomas = sintomas;
    appointmentObj.id = id;

    //Cambiar el texto del botón crear cita
    appointmentForm.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    //Activando modo edición
    editMode = true;
}














