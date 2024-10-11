import { Prisma, Tasks as PrismaTask } from '@prisma/client'

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

  static toPrisma(task: Task): Prisma.TasksUncheckedCreateInput {
    return {
      id: task.id.toString(),
      content: task.content,
      title: task.title,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      finishedAt: task.finishedAt,
      authorId: task.authorId.toString(),
    }
  }
}
