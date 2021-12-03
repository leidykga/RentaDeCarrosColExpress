import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {LLaves} from '../config/llaves';
import {Administrador, Asesor, Cliente} from '../models';
import {AdministradorRepository, AsesorRepository, ClienteRepository} from '../repositories';


const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }
  @repository(AdministradorRepository)
  public administradorRepository: AdministradorRepository
  @repository(ClienteRepository)
  public clienteRepository: ClienteRepository
  @repository(AsesorRepository)
  public asesorRepository: AsesorRepository
  /*
   * Add service methods here
   */
  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }
  Cifrarclave(clave: string) {
    let clavecifrada = cryptoJS.MD5(clave).toString();
    return clavecifrada;

  }
  autentificarAdministrador(usuario: string, clave: string) {
    try {
      let p = this.administradorRepository.findOne({where: {email: usuario, clave: clave}})
      if (p) {
        return p
      }
      return false;
    } catch {
      return false;

    }
  }

  GenerarTokenJWT(administrador: Administrador) {
    let token = jwt.sign({
      data: {
        id: administrador.id,
        correo: administrador.email,
        nombre: administrador.nombre,

      }
    },
      LLaves.claveJwT);
    return token;
  }

  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, LLaves.claveJwT);
      return datos;
    } catch {
      return false;
    }
  }

  //cliente token
  GenerarTokenClienteJWT(cliente: Cliente) {
    let token = jwt.sign({
      data: {
        id: cliente.id,
        correo: cliente.email,
        nombre: cliente.nombre,

      }
    },
      LLaves.clavecliente);
    return token;
  }

  validarTokenClienteJWT(token: string) {
    try {
      let datos = jwt.verify(token, LLaves.clavecliente);
      return datos;
    } catch {
      return false;
    }
  }
  autentificarCliente(usuario: string, clave: string) {
    try {
      let p = this.clienteRepository.findOne({where: {email: usuario, clave: clave}})
      if (p) {
        return p
      }
      return false;
    } catch {
      return false;

    }
  }
  //asesor token
  GenerarTokenAsesorJWT(asesor: Asesor) {
    let token = jwt.sign({
      data: {
        id: asesor.id,
        correo: asesor.email,
        nombre: asesor.nombre,

      }
    },
      LLaves.claveasesor);
    return token;
  }

  validarTokenAsesorJWT(token: string) {
    try {
      let datos = jwt.verify(token, LLaves.claveasesor);
      return datos;
    } catch {
      return false;
    }
  }
  autentificarAsesor(usuario: string, clave: string) {
    try {
      let p = this.asesorRepository.findOne({where: {email: usuario, clave: clave}})
      if (p) {
        return p
      }
      return false;
    } catch {
      return false;

    }
  }
}
