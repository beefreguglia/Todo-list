import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { TasksRepository } from '@/domain/to-do/application/repositories/tasks-repository'
import { Task } from '@/domain/to-do/enterprise/entities/task'

import { PrismaTaskMapper } from '../mappers/prisma-task-mapper'
import { PrismaService } from '../prisma.service'

const PER_PAGE = 20

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.tasks.findUnique({
      where: {
        id,
      },
    })

    if (!task) {
      return null
    }

    return PrismaTaskMapper.toDomain(task)
  }

  async findManyRecent(
    { page }: PaginationParams,
    id: string,
  ): Promise<Task[]> {
    const tasks = await this.prisma.tasks.findMany({
      where: {
        authorId: id,
      },
      orderBy: [
        {
          finishedAt: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
      take: PER_PAGE,
      skip: (page - 1) * PER_PAGE,
    })

    return tasks.map((task) => PrismaTaskMapper.toDomain(task))
  }

  async create(task: Task): Promise<void> {
    const data = PrismaTaskMapper.toPrisma(task)
    await this.prisma.tasks.create({
      data,
    })
  }

  async save(task: Task): Promise<void> {
    const data = PrismaTaskMapper.toPrisma(task)

    await this.prisma.tasks.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(task: Task): Promise<void> {
    const data = PrismaTaskMapper.toPrisma(task)

    await this.prisma.tasks.delete({
      where: {
        id: data.id,
      },
    })
  }
}
