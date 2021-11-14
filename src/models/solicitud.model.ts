import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Solicitud extends Entity {
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
  id_cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  id_asesor: string;

  @property({
    type: 'string',
    required: true,
  })
  id_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoSolicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  tipoVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoSolicitud: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasOne(() => Vehiculo)
  vehiculo: Vehiculo;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  @property({
    type: 'string',
  })
  asesorId?: string;

  @hasOne(() => Asesor)
  asesor: Asesor;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
