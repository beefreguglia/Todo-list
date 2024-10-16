import { DomainEvents } from '@/core/events/domain-events'
import { UsersRepository } from '@/domain/to-do/application/repositories/users-repository'
import { User } from '@/domain/to-do/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email.toString() === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User) {
    this.items.push(user)

    DomainEvents.dispatchEventsForAggregate(user.id)
  }
}
