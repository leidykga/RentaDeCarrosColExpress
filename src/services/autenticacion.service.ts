import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {LLaves} from '../config/llaves';
import {Administrador} from '../models';
import {AdministradorRepository} from '../repositories';

const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }
  @repository(AdministradorRepository)
  public administradorRepository: AdministradorRepository
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
}
