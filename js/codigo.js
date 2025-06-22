let sistema = new Sistema();

ocultarNav();
ocultarTodasLasPaginas();
mostrarLogin();
sistema.PrecargarDatosUsuarios();
sistema.PrecargarDestinos();
sistema.PrecargarReservas();

document.querySelector("#btnLogin").addEventListener("click", login);
document
  .querySelector("#btnMostrarRegistro")
  .addEventListener("click", mostrarRegistro);
document
  .querySelector("#btnRegistrar")
  .addEventListener("click", registrarCliente);
document
  .querySelector("#btnLoginRegistro")
  .addEventListener("click", volverLogin);
document
  .querySelector("#btnCrearDestino")
  .addEventListener("click", crearDestinos);

function registrarCliente() {
  document.querySelector("#pResultadosRegistro").innerHTML = "";
  let nombre = document.querySelector("#txtNombre").value;
  let apellido = document.querySelector("#txtApellido").value;
  let nombreCliente = document.querySelector("#txtNombreUsuario").value;
  let password = document.querySelector("#txtPassword").value;
  let tarjetaCredito = document.querySelector("#txtTarjetaCredito").value;
  let cvc = document.querySelector("#txtCvc").value;
  let nombreUsuarioInsensitive = nombreCliente.toLowerCase();
  let resultadoRegistrarCliente = sistema.RegistrarCliente(
    nombre,
    apellido,
    nombreUsuarioInsensitive,
    password,
    tarjetaCredito,
    cvc
  );
  if (resultadoRegistrarCliente === null) {
    document.querySelector("#pResultadosRegistro").innerHTML =
      "Usuario Registrado.";
    limpiarInputs();
  } else {
    for (let i = 0; i < resultadoRegistrarCliente.length; i++) {
      let error = resultadoRegistrarCliente[i];
      document.querySelector(
        "#pResultadosRegistro"
      ).innerHTML += `<b>*</b> ${error} <br>`;
    }
  }
}

function login() {
  let nombreCliente = document.querySelector("#txtUsuarioLogin").value;
  let password = document.querySelector("#txtPasswordLogin").value;
  let nombreUsuarioInsensitive = nombreCliente.toLowerCase();
  let usuarioLogueado = sistema.login(nombreUsuarioInsensitive, password);

  if (usuarioLogueado === null) {
    document.querySelector("#txtUsuarioLogin").value = "";
    document.querySelector("#txtPasswordLogin").value = "";
    if (!sistema.usuarioLogueado.esAdmin) {
      mostrarNavUsuario();
      mostrarDestinos();
    } else {
      mostrarDestinos();
      mostrarNavAdmin();
    }
  } else {
    document.querySelector("#pResultadosLogin").innerHTML = usuarioLogueado;
    document.querySelector("#txtUsuarioLogin").value = "";
    document.querySelector("#txtPasswordLogin").value = "";
  }
  cargarTablaDeDestinos();
}

function cargarTablaDeDestinos() {
  let destinosDisponibles = sistema.MostrarDestinosDisponibles();
  let saldo = sistema.obtenerSaldoCliente();
  let millas = sistema.obtenerMillasCliente();
  let cuerpoTabla = "";

  for (let i = 0; i < destinosDisponibles.length; i++) {
    let destino = destinosDisponibles[i];
    let precioFinal = 0;
    let precioOferta = "";
    if (destino.oferta) {
      precioFinal = destino.precio * sistema.DESCUENTO_OFERTA;
      precioOferta = "EN OFERTA!";
    } else {
      precioFinal = destino.precio;
      precioOferta = "NO";
    }
    let row = `
        <tr>
        <td><img src="${destino.url}"/></td>
        <td>${destino.nombre}</td>
        <td>${destino.descripcion}</td>
        <td>$${precioFinal}</td>
        <td>${precioOferta}</td>
        <td><input type="text" placeholder="Ingrese la cantidad" id="cantidad-personas-${destino.idDestino}" /></td>
        <td><select id="select-medio-pago-${destino.idDestino}">
        <option value="0">...</option>
        <option value="false">Pagar con dinero</option>
        <option value="true">Pagar con millas</option>
        </select>
        <td><input type="button" value="Reservar" class="btnReservarDestinos" data-id-destino="${destino.idDestino}"/></td> 
        </tr>
        `;
    cuerpoTabla += row;
  }
  document.querySelector(
    "#pClienteSaldoInicio"
  ).innerHTML = `<b>* Saldo:</b> $${saldo}`;
  document.querySelector(
    "#pClienteMillasInicio"
  ).innerHTML = `<b>* Millas:</b> ${millas}`;
  document.querySelector("#tbodyDestinos").innerHTML = cuerpoTabla;
  bindearBotonesReservar();
}

function bindearBotonesReservar() {
  let botonesReserva = document.querySelectorAll(".btnReservarDestinos");
  for (let i = 0; i < botonesReserva.length; i++) {
    botonesReserva[i].addEventListener("click", reservarDestino);
  }
}

function reservarDestino() {
  let idDestino = this.getAttribute("data-id-destino");
  let cantidadDePersonas = Number(
    document.querySelector("#cantidad-personas-" + idDestino).value
  );
  let esConMillas = document.querySelector(
    "#select-medio-pago-" + idDestino
  ).value;
  if (sistema.ReservarDestino(idDestino, cantidadDePersonas, esConMillas)) {
  }
}

function cargarTablaDeDestinosOferta() {
  let destinosDisponibles = sistema.MostrarDestinosDisponibles();
  let saldo = sistema.obtenerSaldoCliente();
  let millas = sistema.obtenerMillasCliente();
  let cuerpoTabla = "";
  for (let i = 0; i < destinosDisponibles.length; i++) {
    let destino = destinosDisponibles[i];
    let precio = 0;
    let precioOferta = "";
    if (destino.oferta) {
      precio = destino.precio * sistema.DESCUENTO_OFERTA;
      precioOferta = "EN OFERTA!";
      let row = `
        <tr>
        <td><img src="${destino.url}"/></td>
        <td>${destino.nombre}</td>
        <td>${destino.descripcion}</td>
        <td>$${precio}</td>
        <td>${precioOferta}</td>
        <td><input type="text" placeholder="Ingrese la cantidad" id="cantidad-personas-${destino.idDestinos}" /></td>
        <td><select class="slcMedioDePago">
        <option value="1">...</option>
        <option value="2">Pagar con dinero</option>
        <option value="3">Pagar con millas</option>
        </select>
        <td><input type="button" value="Reservar" class="btnReservarDestinos" data-id-destino="${destino.idDestinos}"/></td> 
        </tr>
        `;
      cuerpoTabla += row;
    }
  }
  document.querySelector(
    "#pClienteSaldoOferta"
  ).innerHTML = `<b>* Saldo:</b> $${saldo}`;
  document.querySelector(
    "#pClienteMillasOferta"
  ).innerHTML = `<b>* Millas:</b> ${millas}`;
  document.querySelector("#tbodyOfertas").innerHTML = cuerpoTabla;
}

function cargarTablaHistorialDeReservas() {
  let destinosReservados = sistema.reservas;
  let cuerpoTabla = "";
  let cuerpoTablaAprobada = "";
  let cuerpoTablaCancelada = "";
  let cuerpoTablaPendiente = "";
  let estado = "";
  let montoTotal = 0;

  for (let i = 0; i < destinosReservados.length; i++) {
    let reserva = destinosReservados[i];
    precioTotal = reserva.precio * reserva.cantidadDePersonas;

    if (reserva.cliente.nombre === sistema.usuarioLogueado.nombre) {
      if (
        reserva.estadoReservaUsuario &&
        reserva.estadoReservaAdmin === "aprobado"
      ) {
        estado = "Aprobada";
        montoTotal += reserva.precio * reserva.cantidadDePersonas;
        let row = `
      <tr>
      <td>${reserva.destino.nombre}</td>
      <td>${reserva.cantidadDePersonas}</td>
      <td>${reserva.precio * reserva.cantidadDePersonas}</td>
      <td>${estado}</td>
      </tr>
      `;
        cuerpoTablaAprobada += row;
      } else if (
        !reserva.estadoReservaUsuario ||
        reserva.estadoReservaAdmin === "cancelado"
      ) {
        estado = "Cancelada";
        let row = `
      <tr>
      <td>${reserva.destino.nombre}</td>
      <td>${reserva.cantidadDePersonas}</td>
      <td>${reserva.precio * reserva.cantidadDePersonas}</td>
      <td>${estado}</td>
      </tr>
      `;
        cuerpoTablaCancelada += row;
      } else if (reserva.estadoReservaUsuario) {
        estado = "Pendiente";
        let row = `
        <tr>
        <td>${reserva.destino.nombre}</td>
        <td>${reserva.cantidadDePersonas}</td>
        <td>${precioTotal.toFixed(2)}</td>
        <td>${estado}</td>
        <td> <input type="button"  class="btnCancelar" value="Cancelar"  data-id-reserva-cancelar="${
          reserva.destino.idDestino
        }" /> </td>
        </tr>
        `;
        cuerpoTablaPendiente += row;
      }

      let row = `
    <tr>
    <td>${reserva.destino.nombre}</td>
    <td>${reserva.cantidadDePersonas}</td>
    <td>${reserva.precio * reserva.cantidadDePersonas}</td>
    <td>${estado}</td>
    </tr>
    `;
      cuerpoTabla += row;
    }
  }
  document.querySelector("#tbodyHistorialDeReservasPendientes").innerHTML =
    cuerpoTablaPendiente;
  document.querySelector("#tbodyHistorialDeReservas").innerHTML = cuerpoTabla;
  bindearCancelarReservaCliente();
}

function bindearCancelarReservaCliente() {
  let cancelar = document.querySelectorAll(".btnCancelar");
  for (let i = 0; i < cancelar.length; i++) {
    cancelar[i].addEventListener("click", cancelarReservaCliente);
  }
}

function cancelarReservaCliente() {
  let idDestinoCancelar = this.getAttribute("data-id-reserva-cancelar");
  sistema.CancelarReserva(idDestinoCancelar);
  cargarTablaHistorialDeReservas();
  cargarDestinosParaAprobar();
}

function cargarDestinosParaAprobar() {
  let destinosReservados = sistema.reservas;
  let cuerpoTablaPendiente = "";
  let cuerpoTablaAprobadas = "";
  let cuerpoTablaCanceladas = "";
  let precioTotal = 0;

  for (let i = 0; i < destinosReservados.length; i++) {
    let reserva = destinosReservados[i];
    precioTotal = reserva.precio * reserva.cantidadDePersonas;

    if (reserva.estadoReservaAdmin === "aprobado") {
      let row = `
        <tr>
          <td>${reserva.destino.nombre}</td>
          <td>${precioTotal.toFixed(2)}</td>
          <td>${reserva.estadoReservaAdmin}</td>
          <td>${reserva.cantidadDePersonas}</td>
          <td>${reserva.destino.cupos}</td>
        </tr>`;
      cuerpoTablaAprobadas += row;
    } else if (reserva.estadoReservaAdmin === "activo") {
      let row = `
                <tr>
                 <td>${reserva.destino.nombre}</td>
          <td>${precioTotal.toFixed(2)}</td>
          <td>${reserva.estadoReservaAdmin}</td>
          <td>${reserva.cantidadDePersonas}</td>
          <td>${reserva.destino.cupos}</td>
                  <td><input type="button" class="btnAprobar" value="Procesar reserva" data-precio="${precioTotal}" data-cantidad="${
        reserva.cantidadDePersonas
      }" data-id-destino-aprobar="${reserva.destino.idDestino}" /></td>
                </tr>
                `;
      cuerpoTablaPendiente += row;
    } else if (reserva.estadoReservaAdmin === "cancelado") {
      let row = `
        <tr>
          <td>${reserva.destino.nombre}</td>
          <td>${precioTotal.toFixed(2)}</td>
          <td>${reserva.estadoReservaAdmin}</td>
          <td>${reserva.cantidadDePersonas}</td>
          <td>${reserva.destino.cupos}</td>
        </tr>`;
      cuerpoTablaCanceladas += row;
    }
  }
  document.querySelector("#tbodyReservasPendientes").innerHTML =
    cuerpoTablaPendiente;
  document.querySelector("#tbodyReservasAprobadas").innerHTML =
    cuerpoTablaAprobadas;
  document.querySelector("#tbodyReservasCanceladas").innerHTML =
    cuerpoTablaCanceladas;
  bindearBotonesAprobar();
  sistema.CargarReservasCanceladas();
}

function bindearBotonesAprobar() {
  let aprobar = document.querySelectorAll(".btnAprobar");
  for (let i = 0; i < aprobar.length; i++) {
    aprobar[i].addEventListener("click", aprobarReserva);
  }
}

function aprobarReserva() {
  let idDestinoAprobar = this.getAttribute("data-id-destino-aprobar");
  let cantidadDePersonas = this.getAttribute("data-cantidad");
  let precio = this.getAttribute("data-precio");

  sistema.AprobarReserva(idDestinoAprobar, cantidadDePersonas, precio);
  cargarTablaDeDestinos();
  cargarDestinosParaAprobar();
}

function crearDestinos() {
  document.querySelector("#pResultadoCrearDestino").innerHTML = "";
  let nombreDestino = document.querySelector("#txtNombreDestino").value;
  let precio = document.querySelector("#txtPrecioDestino").value;
  let descripcion = document.querySelector("#txtDescripcionDestino").value;
  let url = document.querySelector("#txtUrlDestino").value;
  let cantidadCupos = document.querySelector("#txtCantidadCupos").value;
  let resultadoCrearDestino = sistema.CrearDestino(
    nombreDestino,
    precio,
    descripcion,
    url,
    cantidadCupos
  );
  if (resultadoCrearDestino === null) {
    document.querySelector("#pResultadoCrearDestino").innerHTML =
      "Destino Creado.";
    cargarTablaDeDestinos();
    limpiarInputs();
  } else {
    for (let i = 0; i < resultadoCrearDestino.length; i++) {
      let error = resultadoCrearDestino[i];
      document.querySelector("#pResultadoCrearDestino").innerHTML +=
        "<b> * </b>" + error + "<br>";
    }
  }
}

function cargarTablaAdministrarDestinos() {
  let destinos = sistema.destinos;
  let cuerpoTabla = "";
  let oferta = "";

  for (let i = 0; i < destinos.length; i++) {
    let destino = destinos[i];

    if (!destino.oferta) {
      oferta = `<input type="checkbox" class="checkOferta" data-check="${destino.idDestino}" />`;
    } else {
      oferta = `<input type="checkbox" class="checkOferta" data-check="${destino.idDestino}" checked />`;
    }
    let row = `
        <tr>
        <td><img src="${destino.url}"/></td>
        <td>${destino.nombre}</td>
        <td>${destino.descripcion}</td>
        <td>$${destino.precio}</td>
        <td>${oferta}</td>
        <td>${destino.estado}</td>
        <td> <input type="button" value="Activar" class="btnEstadoActivo" data-estado="${destino.idDestino}"/>
            <input type="button" value="Pausar" class="btnEstadoPausar" data-estado="${destino.idDestino}"/> </td>
        <td><input type="text" value="${destino.cupos}" id="inpCupos-${destino.idDestino}" />
        <button class="btnCupos" data-cupos="${destino.idDestino}">Modificar</button></td>
        </tr>
        `;
    cuerpoTabla += row;
  }
  document.querySelector("#tbodyAdministrarDestinos").innerHTML = cuerpoTabla;
  botonesAdministrativos();
}

function botonesAdministrativos() {
  let activar = document.querySelectorAll(".btnEstadoActivo");
  let pausar = document.querySelectorAll(".btnEstadoPausar");
  let oferta = document.querySelectorAll(".checkOferta");
  let cupos = document.querySelectorAll(".btnCupos");
  for (let i = 0; i < cupos.length; i++) {
    cupos[i].addEventListener("click", asignarCupos);
  }
  for (let i = 0; i < oferta.length; i++) {
    oferta[i].addEventListener("click", asignarOferta);
  }
  for (let i = 0; i < activar.length; i++) {
    activar[i].addEventListener("click", estadoActivo);
  }
  for (let i = 0; i < pausar.length; i++) {
    pausar[i].addEventListener("click", estadoPausado);
  }
}

function estadoPausado() {
  let idEstado = this.getAttribute("data-estado");
  sistema.PausarEstado(idEstado);
  cargarTablaAdministrarDestinos();
  cargarTablaDeDestinos();
}

function estadoActivo() {
  let idEstado = this.getAttribute("data-estado");
  sistema.ActivarEstado(idEstado);
  cargarTablaAdministrarDestinos();
  cargarTablaDeDestinos();
}

function asignarCupos() {
  let idCupos = this.getAttribute("data-cupos");
  let cupos = Number(document.querySelector("#inpCupos-" + idCupos).value);
  sistema.InteractuarConCupos(idCupos, cupos);
  cargarTablaAdministrarDestinos();
  cargarTablaDeDestinos();
}

function asignarOferta() {
  let idCheck = this.getAttribute("data-check");
  sistema.ModificarOferta(idCheck);
  cargarTablaAdministrarDestinos();
  cargarTablaDeDestinos();
}

function cargarInformeGanancias() {
  document.querySelector(
    "#pGananciaTotal"
  ).innerHTML = `GANANCIA TOTAL: $ ${sistema.total}`;
  let totalDestino = sistema.totalDestino;
  let cuerpoTabla = "";

  for (let i = 0; i < totalDestino.length; i++) {
    let resultado = totalDestino[i];
    let row = `
           <tr>
          <td>${resultado.destino}</td>
          <td>${resultado.cantidadDePersonas}</td>
          <td>$${resultado.totalGanancias}</td>
        </tr>
      `;
    cuerpoTabla += row;
  }
  document.querySelector("#tbodyGananciasDestinos").innerHTML = cuerpoTabla;
}

//Funciones para ocultar y mostrar elementos visuales.
function ocultarNav() {
  let paginas = document.querySelectorAll(".Solo-Logueado");
  for (let i = 0; i < paginas.length; i++) {
    paginas[i].style.display = "none";
  }
}

function mostrarNavUsuario() {
  let paginas = document.querySelectorAll(".boton-usuario");
  for (let i = 0; i < paginas.length; i++) {
    paginas[i].style.display = "block";
  }
  mostrarNavAmbos();
}

function mostrarNavAmbos() {
  let paginas = document.querySelectorAll(".boton-ambos");
  for (let i = 0; i < paginas.length; i++) {
    paginas[i].style.display = "block";
  }
}

function mostrarNavAdmin() {
  let paginas = document.querySelectorAll(".boton-admin");
  for (let i = 0; i < paginas.length; i++) {
    paginas[i].style.display = "block";
  }
  mostrarNavAmbos();
}

function ocultarTodasLasPaginas() {
  let paginas = document.querySelectorAll(".pagina");
  for (let i = 0; i < paginas.length; i++) {
    paginas[i].style.display = "none";
  }
}

function limpiarInputs() {
  let inputsRegistro = document.querySelectorAll(".input-registroCliente");
  for (let i = 0; i < inputsRegistro.length; i++) {
    inputsRegistro[i].value = "";
  }
}

function mostrarLogin() {
  ocultarTodasLasPaginas();
  document.querySelector("#divLogin").style.display = "block";
}

function mostrarRegistro() {
  ocultarTodasLasPaginas();
  document.querySelector("#divRegistroUsuario").style.display = "block";
}

function volverLogin() {
  ocultarTodasLasPaginas();
  document.querySelector("#divLogin").style.display = "block";
}

function logout() {
  sistema.logout();
  ocultarTodasLasPaginas();
  ocultarNav();
  document.querySelector("#divLogin").style.display = "block";
}

function mostrarDestinos() {
  ocultarTodasLasPaginas();
  document.querySelector("#divInicioTablaDestinos").style.display = "block";
}

function mostrarDestinosOfertas() {
  ocultarTodasLasPaginas();
  document.querySelector("#divDestinosEnOferta").style.display = "block";
  cargarTablaDeDestinosOferta();
}

function mostrarHistorialDeReservas() {
  ocultarTodasLasPaginas();
  document.querySelector("#divHistorialDeReservas").style.display = "block";
  cargarTablaHistorialDeReservas();
}

function mostrarAprobacionDeReservas() {
  ocultarTodasLasPaginas();
  document.querySelector("#divAprobacionDeReservas").style.display = "block";
  cargarDestinosParaAprobar();
  cargarTablaDeDestinos();
}

function mostrarCrearDestinos() {
  ocultarTodasLasPaginas();
  document.querySelector("#divCrearDestinos").style.display = "block";
}

function mostrarAdministrarDestinos() {
  ocultarTodasLasPaginas();
  document.querySelector("#divAdministrarDestinos").style.display = "block";
  cargarTablaAdministrarDestinos();
}

function mostrarGanancias() {
  ocultarTodasLasPaginas();
  document.querySelector("#divInformeGanancias").style.display = "block";
  cargarInformeGanancias();
}
