import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Cliente} from './cliente.model';
import {Solicitud} from './solicitud.model';

@model()
export class Asesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  id_administrador: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  id_cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  id_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  id_solicitud: string;

  @property({
    type: 'string',
  })
  administradorId?: string;

  @hasOne(() => Administrador)
  administrador: Administrador;

  @hasOne(() => Cliente)
  cliente: Cliente;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  @property({
    type: 'string',
  })
  solicitudId?: string;

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
