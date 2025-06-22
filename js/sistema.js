class Sistema {
  constructor() {
    this.administradores = [];
    this.clientes = [];
    this.destinos = [];
    this.reservas = [];
    this.usuarioLogueado = null;
    this.esAdmin = false;
    this.totalDestino = [];
    this.total = 0;
    this.DESCUENTO_OFERTA = 0.7;
  }

  PrecargarDestinos() {
    const DESTINOS_DATOS = [
      {
        nombre: "Tacuarembó",
        precio: 1500,
        descripcion: "Un lugar encantador en el corazón de Uruguay, perfecto para descubrir tradiciones y paisajes únicos.",
        url: "https://i.ibb.co/tsdzPvW/TACUAREMBO.jpg",
        cupos: 10,
        estado: "activo",
        oferta: true,
      },
      {
        nombre: "Punta del Este",
        precio: 3000,
        descripcion: "Destino exclusivo con hermosas playas, modernos edificios y una vibrante vida nocturna.",
        url: "https://i.ibb.co/7NbbxL2/PUNTA-DEL-ESTE.jpg",
        cupos: 5,
        estado: "activo",
        oferta: false,
      },
      {
        nombre: "Colonia del Sacramento",
        precio: 2000,
        descripcion: "Un viaje al pasado en esta pintoresca ciudad colonial declarada Patrimonio de la Humanidad.",
        url: "https://i.ibb.co/Tr51vrF/COLONIA-DEL-SACRAMENTO.jpg",
        cupos: 15,
        estado: "pausado",
        oferta: true,
      },
      {
        nombre: "Montevideo",
        precio: 2500,
        descripcion: "La capital uruguaya ofrece un rico legado histórico y cultural junto al Río de la Plata.",
        url: "https://i.ibb.co/LtL2nxd/MONTEVIDEO.jpg",
        cupos: 20,
        estado: "activo",
        oferta: false,
      },
      {
        nombre: "Salto",
        precio: 1800,
        descripcion: "Famoso por sus termas, es ideal para quienes buscan relajación y bienestar.",
        url: "https://i.ibb.co/cTCP4mP/SALTO.jpg",
        cupos: 0,
        estado: "pausado",
        oferta: true,
      },
      {
        nombre: "Piriápolis",
        precio: 2200,
        descripcion: "Un rincón sereno donde el mar y las sierras se encuentran para brindar paz y descanso.",
        url: "https://i.ibb.co/JvczRz8/PIRIAPOLIS.jpg",
        cupos: 8,
        estado: "activo",
        oferta: false,
      },
      {
        nombre: "Riviera Maya",
        precio: 5000,
        descripcion: "Un paraíso tropical en México con playas de arena blanca y aguas turquesa.",
        url: "https://i.ibb.co/gzFrjGX/RIVIERA-MAYA.jpg",
        cupos: 12,
        estado: "activo",
        oferta: true,
      },
      {
        nombre: "Buenos Aires",
        precio: 2700,
        descripcion: "La vibrante capital argentina te invita a disfrutar de su arte, tango y gastronomía.",
        url: "https://i.ibb.co/6DR9prc/BUENOS-AIRES.jpg",
        cupos: 25,
        estado: "activo",
        oferta: false,
      },
      {
        nombre: "Mendoza",
        precio: 3200,
        descripcion: "Explora la capital del vino en Argentina, rodeada de montañas y viñedos majestuosos.",
        url: "https://i.ibb.co/H2HMR5q/MENDOZA.webp",
        cupos: 18,
        estado: "pausado",
        oferta: true,
      },
      {
        nombre: "Bariloche",
        precio: 4000,
        descripcion: "Rodeado de lagos y montañas, Bariloche es ideal para aventureros y amantes de la naturaleza.",
        url: "https://i.ibb.co/zWdZ8yv/BARILOCHE.jpg",
        cupos: 10,
        estado: "activo",
        oferta: false,
      },
    ];
    for (let i = 0; i < DESTINOS_DATOS.length; i++) {
      let destino = new Destino(
        DESTINOS_DATOS[i].nombre,
        DESTINOS_DATOS[i].precio,
        DESTINOS_DATOS[i].descripcion,
        DESTINOS_DATOS[i].url,
        DESTINOS_DATOS[i].cupos,
        DESTINOS_DATOS[i].estado,
        DESTINOS_DATOS[i].oferta
      );
      this.destinos.push(destino);
    }
  }

  PrecargarDatosUsuarios() {
    const CLIENTES_ADMINISTRADORES = [
      {
        nombreDeUsuario: "chernandez",
        password: "123",
        esAdmin: true,
      },
      {
        nombreDeUsuario: "agarcia",
        password: "SecureAna1",
        esAdmin: true,
      },
      {
        nombreDeUsuario: "lmendoza",
        password: "LuisSecure9",
        esAdmin: true,
      },
      {
        nombreDeUsuario: "mramirez",
        password: "MariaNew2",
        esAdmin: true,
      },
      {
        nombreDeUsuario: "jguzman",
        password: "Guzman2024",
        esAdmin: true,
      },
      {
        nombre: "Laura",
        apellido: "Ortega",
        nombreDeUsuario: "lortega",
        password: "NewLaura3",
        nroDeTarjeta: "6666777788889999",
        cvc: "330",
        esAdmin: false,
        saldo: 15000,
      },
      {
        nombre: "Carlos",
        apellido: "Vargas",
        nombreDeUsuario: "cvargas",
        password: "123",
        nroDeTarjeta: "4485746493384014",
        cvc: "123",
        esAdmin: false,
        saldo: 15000,
      },
      {
        nombre: "María",
        apellido: "Sánchez",
        nombreDeUsuario: "msanchez",
        password: "MariaSecure4",
        nroDeTarjeta: "2222333344445555",
        cvc: "234",
        esAdmin: false,
        saldo: 15000,
      },
      {
        nombre: "Andrés",
        apellido: "Gómez",
        nombreDeUsuario: "agomez",
        password: "AndresPass6",
        nroDeTarjeta: "3333444455556666",
        cvc: "345",
        esAdmin: false,
        saldo: 15000,
      },
      {
        nombre: "Sofía",
        apellido: "Pérez",
        nombreDeUsuario: "sperez",
        password: "SofiaPass8",
        nroDeTarjeta: "4444555566667777",
        cvc: "456",
        esAdmin: false,
        saldo: 15000,
      },
    ];
    for (let i = 0; i < CLIENTES_ADMINISTRADORES.length; i++) {
      let usuarioyadmin = CLIENTES_ADMINISTRADORES[i];

      if (usuarioyadmin.esAdmin) {
        let usuario = new Administrador(
          usuarioyadmin.nombreDeUsuario,
          usuarioyadmin.password,
          usuarioyadmin.esAdmin
        );
        this.administradores.push(usuario);
      } else {
        let usuario = new Cliente(
          usuarioyadmin.nombre,
          usuarioyadmin.apellido,
          usuarioyadmin.nombreDeUsuario,
          usuarioyadmin.password,
          usuarioyadmin.nroDeTarjeta,
          usuarioyadmin.cvc,
          usuarioyadmin.esAdmin,
          usuarioyadmin.saldo
        );
        this.clientes.push(usuario);
      }
    }
  }

  PrecargarReservas() {
    const DATOS_RESERVA = [
      {
        estadoReservaUsuario: true,
        estadoReservaAdmin: "aprobado",
        cantidadDePersonas: 3,
        esConMillas: true,
      },
      {
        estadoReservaUsuario: true,
        estadoReservaAdmin: "aprobado",
        cantidadDePersonas: 2,
        esConMillas: false,
      },
      {
        estadoReservaUsuario: true,
        estadoReservaAdmin: "aprobado",
        cantidadDePersonas: 1,
        esConMillas: false,
      },
      {
        estadoReservaUsuario: false,
        estadoReservaAdmin: "cancelado",
        cantidadDePersonas: 8,
        esConMillas: false,
      },
      {
        estadoReservaUsuario: false,
        estadoReservaAdmin: "cancelado",
        cantidadDePersonas: 10,
        esConMillas: false,
      },
    ];
    for (let i = 0; i < DATOS_RESERVA.length; i++) {
      let datosreserva = DATOS_RESERVA[i];
      let reserva = new Reserva(
        datosreserva.cantidadDePersonas,
        this.clientes[i],
        this.destinos[i],
        this.destinos[i].precio,
        datosreserva.esConMillas,
        datosreserva.estadoReservaUsuario,
        datosreserva.estadoReservaAdmin
      );
      this.reservas.push(reserva);
      if (datosreserva.estadoReservaAdmin === "aprobado") {
        this.ModificarCuposDestinos(
          this.destinos[i].idDestino,
          datosreserva.cantidadDePersonas
        );
        this.ActualizarGananciasDestino(
          this.destinos[i].idDestino,
          datosreserva.cantidadDePersonas,
          this.destinos[i].precio * datosreserva.cantidadDePersonas
        );
      }
    }
  }

  RegistrarCliente(
    nombre,
    apellido,
    nombreDeUsuario,
    password,
    nroDeTarjeta,
    cvc
  ) {
    let errores = this.validarRegistroCliente(
      nombre,
      apellido,
      nombreDeUsuario,
      password,
      nroDeTarjeta,
      cvc
    );
    if (errores.length > 0) {
      return errores;
    } else {
      let cliente = new Cliente(
        nombre,
        apellido,
        nombreDeUsuario,
        password,
        nroDeTarjeta,
        cvc
      );
      this.clientes.push(cliente);
      return null; // Si retorna null, registra al usuario (retorna null en forma de bandera, osea si esta todo ok retorna null y ahi registra al usuario)
    }
  }

  validarRegistroCliente(
    nombre,
    apellido,
    nombreDeUsuario,
    password,
    nroDeTarjeta,
    cvc
  ) {
    let errores = []; //Array que almacena errores para luego mostrarlos.(codigo.js)
    let contadorMinusculas = 0;
    let contadorMayusculas = 0;
    let contadorNumeros = 0;

    if (nombre.trim() === "") {
      errores.push("El nombre no puede estar vacío.");
    }
    if (apellido.trim() === "") {
      errores.push("El apellido no puede estar vacío.");
    }
    if (nombreDeUsuario.trim() === "") {
      errores.push("El nombre de usuario no puede estar vacío.");
    }
    if (password.trim() === "") {
      errores.push("La contraseña no puede estar vacía.");
    }
    if (nroDeTarjeta.trim() === "") {
      errores.push("El número de la tarjeta no puede estar vacío.");
    }
    if (cvc.trim() === "") {
      errores.push("Ingrese un CVC válido.");
    }
    if (isNaN(cvc)) {
      errores.push("El CVC debe de contener caracteres numéricos.");
    }
    if (cvc.length > 3 || cvc.length < 3) {
      errores.push("El CVC debe de tener solo 3 dígitos.");
    }
    if (password.length < 5) {
      errores.push("La contraseña debe de tener un mínimo 5 caracteres.");
    }
    for (let i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
        contadorMinusculas++;
      }
      if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
        contadorMayusculas++;
      }
      if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
        contadorNumeros++;
      }
    }
    if (
      contadorMinusculas < 1 ||
      contadorMayusculas < 1 ||
      contadorNumeros < 1
    ) {
      errores.push(
        "La contraseña debe de tener al menos un número, una mayúscula y una minúscula."
      );
    }
    if (nombreDeUsuario) {
      let i = 0;
      let resultado = false;

      while (i < this.clientes.length && resultado === false) {
        if (this.clientes[i].nombreDeUsuario === nombreDeUsuario) {
          errores.push(
            `El nombre de usuario ${nombreDeUsuario} ya está en uso.`
          );
          resultado = true;
        }
        i++;
      }
    }
    if (!this.ValidarTarjeta(nroDeTarjeta)) {
      errores.push("Tarjeta de crédito incorrecta.");
    }
    return errores;
  }

  ValidarTarjeta(nroDeTarjeta) {
    let resultadoTarjeta = this.descomponerTarjeta(nroDeTarjeta) * 9;
    if (this.tarjetaCumpleConNroVerificador(resultadoTarjeta, nroDeTarjeta)) {
      return true;
    } else {
      return false;
    }
  }
  tarjetaCumpleConNroVerificador(nro, tarjeta) {
    return nro % 10 === Number(tarjeta.charAt(tarjeta.length - 1));
  }

  descomponerTarjeta(nroDeTarjeta) {
    let duplicar = true;
    let totalSuma = 0;
    for (let i = nroDeTarjeta.length - 2; i >= 0; i--) {
      let nroParaSumar = Number(nroDeTarjeta.charAt(i));
      if (duplicar) {
        nroParaSumar = this.obtenerNumeroParaSumar(nroParaSumar);
        duplicar = false;
      } else {
        duplicar = true;
      }
      totalSuma += nroParaSumar;
    }
    return totalSuma;
  }
  obtenerNumeroParaSumar(nro) {
    nro = nro * 2;
    if (nro > 9) {
      nro = this.sumarDigitosDeUnNumero(nro);
    }
    return nro;
  }
  sumarDigitosDeUnNumero(nro) {
    return Number(nro.toString().charAt(0)) + Number(nro.toString().charAt(1));
  }

  ValidarUsuarioExistente(nombreDeUsuario) {
    let i = 0;
    let resultado = null;
    while (
      i < this.clientes.length ||
      (i < this.administradores.length && resultado === null)
    ) {
      if (this.clientes[i].nombreDeUsuario === nombreDeUsuario) {
        resultado = this.clientes[i];
        break;
      } else if (this.administradores[i].nombreDeUsuario === nombreDeUsuario) {
        resultado = this.administradores[i];
        break;
      }
      i++;
    }
    return resultado;
  }

  login(nombreDeUsuario, password) {
    let usuario = this.ValidarUsuarioExistente(nombreDeUsuario);
    if (
      nombreDeUsuario.trim === "" ||
      password === "" ||
      null === usuario ||
      usuario.password !== password
    ) {
      return "El nombre de usuario o contraseña no es válido.";
    } else {
      this.usuarioLogueado = usuario;
      return null;
    }
  }
  logout() {
    this.usuarioLogueado = null;
  }

  MostrarDestinosDisponibles() {
    let resultado = [];
    for (let i = 0; i < this.destinos.length; i++) {
      if (this.destinos[i].cupos > 0 && this.destinos[i].estado === "activo") {
        resultado.push(this.destinos[i]);
      }
    }
    return resultado;
  }

  obtenerSaldoCliente() {
    if (this.usuarioLogueado) {
      return this.usuarioLogueado.saldo || 0;
    }
  }

  obtenerMillasCliente() {
    if (this.usuarioLogueado) {
      return this.usuarioLogueado.millas || 0;
    }
  }

  buscarDestinoPorId(idDestino) {
    let encontrado = null;
    let i = 0;
    while (i < this.destinos.length && encontrado === null) {
      if (idDestino === this.destinos[i].idDestino) {
        encontrado = this.destinos[i];
      }
      i++;
    }
    return encontrado;
  }

  ReservarDestino(idDestino, cantidadDePersonas, esConMillas) {
    let destinoEncontrado = this.buscarDestinoPorId(idDestino);
    let precio = destinoEncontrado.precio;
    let estado = this.reservas.estadoReservaUsuario;
    let estadoAdmin = this.reservas.estadoReservaAdmin;

    if (cantidadDePersonas === 0 || isNaN(cantidadDePersonas)) {
      alert("DEBE INGRESAR LA CANTIDAD DE PERSONAS.");
      return null;
    }

    if (esConMillas === "0") {
      alert("DEBE SELECCIONAR UN MEDIO DE PAGO.");
      return null;
    }

    for (let i = 0; i < this.reservas.length; i++) {
      if (
        this.reservas[i].destino.idDestino === destinoEncontrado.idDestino &&
        this.reservas[i].cliente === this.usuarioLogueado
      ) {
        alert("YA REALIZÓ UNA RESERVA A ESTE DESTINO.");
        return null;
      }
    }

    if (destinoEncontrado.oferta) {
      precio = precio * this.DESCUENTO_OFERTA;
    }

    let reservar = new Reserva(
      cantidadDePersonas,
      this.usuarioLogueado,
      destinoEncontrado,
      precio,
      esConMillas,
      (estado = true),
      (estadoAdmin = "activo")
    );
    this.reservas.push(reservar);

    return true;
  }

  InteractuarConCupos(idCupos, cupos) {
    let destinoEncontrado = this.buscarDestinoPorId(idCupos);
    for (let i = 0; i < this.destinos.length; i++) {
      if (destinoEncontrado.idDestino === this.destinos[i].idDestino) {
        this.destinos[i].cupos = cupos;
      }
      if (
        cupos <= 0 &&
        destinoEncontrado.idDestino === this.destinos[i].idDestino
      ) {
        this.destinos[i].estado = "pausado";
      }
    }
  }

  CancelarReserva(idDestino) {
    let destinoEncontrado = this.buscarDestinoPorId(idDestino);
    for (let i = 0; i < this.reservas.length; i++) {
      if (this.reservas[i].destino.idDestino === destinoEncontrado.idDestino) {
        this.reservas[i].estadoReservaUsuario = false;
      }
    }
  }

  CargarReservasCanceladas() {
    for (let i = 0; i < this.reservas.length; i++) {
      if (!this.reservas[i].estadoReservaUsuario) {
        this.reservas[i].estadoReservaAdmin = "cancelado";
      }
    }
  }

  AprobarReserva(idDestinoAprobar, cantidadDePersonas, precio) {
    let encontrarDestino = this.buscarDestinoPorId(idDestinoAprobar);
    for (let i = 0; i < this.reservas.length; i++) {
      if (
        this.reservas[i].destino === encontrarDestino &&
        this.reservas[i].estadoReservaUsuario &&
        this.reservas[i].estadoReservaAdmin === "activo"
      ) {
        if (this.reservas[i].cliente.saldo < precio || this.reservas[i].destino.cupos < cantidadDePersonas) {
          this.reservas[i].estadoReservaAdmin = "cancelado";
        } else {
          this.ModificarSaldoMillasClientes(
            idDestinoAprobar,
            cantidadDePersonas,
            precio
          );
          this.ModificarCuposDestinos(idDestinoAprobar, cantidadDePersonas);
          this.reservas[i].estadoReservaAdmin = "aprobado";
          return;
        }
      }
    }
  }

  ModificarSaldoMillasClientes(idDestinoAprobar, cantidadDePersonas, precio) {
    let destinoEncontrado = this.buscarDestinoPorId(idDestinoAprobar);
    for (let i = 0; i < this.reservas.length; i++) {
      if (
        destinoEncontrado.idDestino === this.reservas[i].destino.idDestino &&
        this.reservas[i].estadoReservaAdmin === "activo"
      ) {
        if (this.reservas[i].esConMillas === "true") {
          let saldoRestante = 0;

          if (this.reservas[i].cliente.millas >= precio) {
            this.reservas[i].cliente.millas -= precio;
            saldoRestante = 0;
          } else {
            saldoRestante = precio - this.reservas[i].cliente.millas;
            this.reservas[i].cliente.millas = 0;
          }
          if (saldoRestante > 0) {
            this.reservas[i].cliente.saldo -= saldoRestante;
            this.ActualizarMillasClientes(idDestinoAprobar, saldoRestante);
            this.ActualizarGananciasDestino(
              idDestinoAprobar,
              cantidadDePersonas,
              saldoRestante
            );
          }
          return;
        } else {
          this.reservas[i].cliente.saldo -= precio;
          this.ActualizarMillasClientes(idDestinoAprobar, precio);
          this.ActualizarGananciasDestino(
            idDestinoAprobar,
            cantidadDePersonas,
            precio
          );
          return;
        }
      }
    }
  }

  ActualizarMillasClientes(idDestinoAprobar, precio) {
    let destinoEncontrado = this.buscarDestinoPorId(idDestinoAprobar);
    for (let i = 0; i < this.reservas.length; i++) {
      if (
        destinoEncontrado.idDestino === this.reservas[i].destino.idDestino &&
        this.reservas[i].estadoReservaAdmin === "activo"
      ) {
        this.reservas[i].cliente.millas += precio / 100;
        return;
      }
    }
  }

  CrearDestino(
    nombreDestino,
    precio,
    descripcion,
    urlImagen,
    cupos,
    estado,
    oferta
  ) {
    let errores = this.ValidarCrearDestinos(
      nombreDestino,
      precio,
      descripcion,
      urlImagen,
      cupos,
      estado,
      oferta
    );
    if (errores.length > 0) {
      return errores;
    } else {
      let destino = new Destino(
        nombreDestino,
        precio,
        descripcion,
        urlImagen,
        cupos,
        (estado = "activo")
      );
      this.destinos.push(destino);
      return null;
    }
  }

  ValidarCrearDestinos(nombreDestino, precio, descripcion, urlImagen, cupos) {
    let errores = [];
    if (nombreDestino.trim() === "") {
      errores.push("El nombre del destino no puede estar vacío.");
    }
    if (precio.trim() === "") {
      errores.push("El precio no puede estar vacío.");
    }
    if (descripcion.trim() === "") {
      errores.push("La descripción no puede estar vacía.");
    }
    if (urlImagen.trim() === "") {
      errores.push("La url de la imagen no puede estar vacía.");
    }
    if (cupos.trim() === "") {
      errores.push("La cantidad de cupos no puede estar vacía.");
    }
    if (isNaN(precio) || isNaN(cupos)) {
      errores.push("El precio y los cupos deben ser valores numéricos.");
    }
    if (precio < 0 || cupos < 0) {
      errores.push("El precio y los cupos deben ser mayores que 0.");
    }
    return errores;
  }

  PausarEstado(idEstado) {
    let destinoEncontrado = this.buscarDestinoPorId(idEstado);
    for (let i = 0; i < this.destinos.length; i++) {
      if (
        this.destinos[i].estado === "activo" &&
        destinoEncontrado.idDestino === this.destinos[i].idDestino
      ) {
        this.destinos[i].estado = "pausado";
      }
    }
  }

  ActivarEstado(idEstado) {
    let destinoEncontrado = this.buscarDestinoPorId(idEstado);
    for (let i = 0; i < this.destinos.length; i++) {
      if (
        this.destinos[i].estado === "pausado" &&
        destinoEncontrado.idDestino === this.destinos[i].idDestino
      ) {
        this.destinos[i].estado = "activo";
      }
    }
  }

  ModificarOferta(idCheck) {
    let destinoEncontrado = this.buscarDestinoPorId(idCheck);
    for (let i = 0; i < this.destinos.length; i++) {
      if (this.destinos[i].idDestino === destinoEncontrado.idDestino) {
        this.destinos[i].oferta = !this.destinos[i].oferta;
      }
    }
  }

  ModificarCuposDestinos(idDestinoAprobar, cantidadDePersonas) {
    let encontrarDestino = this.buscarDestinoPorId(idDestinoAprobar);
    for (let i = 0; i < this.destinos.length; i++) {
      if (encontrarDestino.idDestino === this.destinos[i].idDestino) {
        this.destinos[i].cupos = this.destinos[i].cupos - cantidadDePersonas;
        if (this.destinos[i].cupos <= 0) {
          this.destinos[i].estado = "pausado";
        }
      }
    }
  }

  ActualizarGananciasDestino(idDestino, cantidadDePersonas, precio) {
    let destinoEncontrado = this.buscarDestinoPorId(idDestino);
    let destinoExistente = null;

    for (let i = 0; i < this.totalDestino.length; i++) {
      if (
        this.totalDestino[i].destino.idDestino === destinoEncontrado.idDestino
      ) {
        destinoExistente = this.totalDestino[i];
        break;
      }
    }

    if (destinoExistente) {
      destinoExistente.cantidadDePersonas += cantidadDePersonas;
      destinoExistente.totalGanancias += precio;
    } else {
      this.totalDestino.push({
        destino: destinoEncontrado.nombre,
        idDestino: destinoEncontrado.idDestino,
        cantidadDePersonas: cantidadDePersonas,
        totalGanancias: precio,
      });
    }
    this.CalcularGananciasTotales();
  }

  CalcularGananciasTotales() {
    let total = 0;
    for (let i = 0; i < this.totalDestino.length; i++) {
      total += Number(this.totalDestino[i].totalGanancias);
    }
    this.total = total;
  }
}
