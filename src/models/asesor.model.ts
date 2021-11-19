import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Administrador} from './administrador.model';
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
    type: 'number',
    required: true,
  })
  estado: number;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @belongsTo(() => Administrador)
  administradorId: string;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
