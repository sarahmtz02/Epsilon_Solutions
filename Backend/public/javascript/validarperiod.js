function validate() {
    inicio=document.getElementById('FechaInicio').value;
    fin=document.getElementById('FechaFin').value;
    if(fin<inicial) 
    document.getElementById('FechaFin').title= 'Esta fecha debe ser mayor a fecha incial.';
    }