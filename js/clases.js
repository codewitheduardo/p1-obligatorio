let idClientes = 0;
let idDestinos = 0;

class Administrador {
  /**
   *
   * @param {String} nombreDeUsuario
   * @param {String} password
   * @param {Boolean} esAdmin
   */
  constructor(nombreDeUsuario, password, esAdmin = true) {
    this.nombreDeUsuario = nombreDeUsuario;
    this.password = password;
    this.esAdmin = esAdmin;
  }
}

class Cliente {
  /**
   *
   * @param {String} nombre
   * @param {String} apellido
   * @param {String} nombreDeUsuario
   * @param {String} password
   * @param {Number} nroDeTarjeta
   * @param {Number} cvc
   * @param {Boolean} esAdmin
   * @param {Number} saldo
   * @param {Number} millas
   */
  constructor(
    nombre,
    apellido,
    nombreDeUsuario,
    password,
    nroDeTarjeta,
    cvc,
    esAdmin = false,
    saldo = 15000,
    millas = 0
  ) {
    this.idCliente = `#${++idClientes}`;
    this.nombre = nombre;
    this.apellido = apellido;
    this.nombreDeUsuario = nombreDeUsuario;
    this.password = password;
    this.nroDeTarjeta = nroDeTarjeta;
    this.cvc = cvc;
    this.esAdmin = esAdmin;
    this.saldo = saldo;
    this.millas = millas;
  }
}

class Destino {
  /**
   *
   * @param {String} nombre
   * @param {Number} precio
   * @param {String} descripcion
   * @param {String} url
   * @param {Number} cupos
   * @param {String} estado
   * @param {Boolean} oferta
   */
  constructor(
    nombre,
    precio,
    descripcion,
    url,
    cupos,
    estado = "activo",
    oferta = false
  ) {
    this.idDestino = `DEST_ID_${++idDestinos}`;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.url = url;
    this.cupos = cupos;
    this.estado = estado;
    this.oferta = oferta;
  }
}

class Reserva {
  /**
   *
   * @param {Number} cantidadDePersonas
   * @param {Cliente} cliente
   * @param {Destino} destino
   * @param {Number} precio
   * @param {Boolean} esConMillas
   * @param {Boolean} estadoReservaUsuario
   * @param {String} estadoReservaAdmin
   */
  constructor(
    cantidadDePersonas,
    cliente,
    destino,
    precio,
    esConMillas,
    estadoReservaUsuario,
    estadoReservaAdmin
  ) {
    this.cantidadDePersonas = cantidadDePersonas;
    this.cliente = cliente;
    this.destino = destino;
    this.precio = precio;
    this.esConMillas = esConMillas;
    this.estadoReservaUsuario = estadoReservaUsuario;
    this.estadoReservaAdmin = estadoReservaAdmin;
  }
}
