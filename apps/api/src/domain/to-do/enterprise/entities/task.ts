import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface TaskProps {
  authorId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date | null
  finishedAt?: Date | null
}

export class Task extends AggregateRoot<TaskProps> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get finishedAt() {
    return this.props.finishedAt
  }

  set finishedAt(finishedAt: Date | null | undefined) {
    this.props.finishedAt = finishedAt
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<TaskProps, 'createdAt'>, id?: UniqueEntityID) {
    const task = new Task(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return task
  }
}
