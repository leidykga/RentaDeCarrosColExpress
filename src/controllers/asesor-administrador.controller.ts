import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Asesor,
  Administrador,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorAdministradorController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/administrador', {
    responses: {
      '200': {
        description: 'Asesor has one Administrador',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Administrador),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Administrador>,
  ): Promise<Administrador> {
    return this.asesorRepository.administrador(id).get(filter);
  }

  @post('/asesors/{id}/administrador', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministradorInAsesor',
            exclude: ['id'],
            optional: ['asesorId']
          }),
        },
      },
    }) administrador: Omit<Administrador, 'id'>,
  ): Promise<Administrador> {
    return this.asesorRepository.administrador(id).create(administrador);
  }

  @patch('/asesors/{id}/administrador', {
    responses: {
      '200': {
        description: 'Asesor.Administrador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Partial<Administrador>,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.asesorRepository.administrador(id).patch(administrador, where);
  }

  @del('/asesors/{id}/administrador', {
    responses: {
      '200': {
        description: 'Asesor.Administrador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.asesorRepository.administrador(id).delete(where);
  }
}
