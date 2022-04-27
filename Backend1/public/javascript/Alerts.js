async function validate() {
    let fechainicio = document.getElementById("FechaInicio").value;
    let fechafin = document.getElementById("FechaFin").value;
    if(fechainicio > fechafin){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La fecha de inicio no puede ser mayor que la de fin',
          })
    }
}

async function good(){
    Swal.fire({
        icon: 'success',
        title: 'Los datos se han guardado con exitos',
        showConfirmButton: false,
        timer: 1500
      })            
}
