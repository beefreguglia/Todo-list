import { Tasks as PrismaTask } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Task } from '@/domain/to-do/enterprise/entities/task'

export class PrismaTaskMapper {
  static toDomain(raw: PrismaTask): Task {
    return Task.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        createdAt: raw.createdAt,
        finishedAt: raw.finishedAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
