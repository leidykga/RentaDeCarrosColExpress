import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesAsesor extends Model {
  @property({
    type: 'string',
    required: true,
  })
  asesor: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<CredencialesAsesor>) {
    super(data);
  }
}

export interface CredencialesAsesorRelations {
  // describe navigational properties here
}

export type CredencialesAsesorWithRelations = CredencialesAsesor & CredencialesAsesorRelations;
