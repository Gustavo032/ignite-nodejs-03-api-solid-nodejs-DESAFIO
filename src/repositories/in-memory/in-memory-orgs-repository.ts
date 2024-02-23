import {
	FindManyNearbyParams,
  OrgsRepository,
} from '@/repositories/orgs-repository'
import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

	async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findByOrgId(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findManyNearby(params: FindManyNearbyParams) {
		return this.items.filter((item) => {
			return item.address.includes(params.city);
		});
	}
	

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone,
			cnpj: data.cnpj,
			email: data.email,
			address: data.address,
			password_hash: data.password_hash ?? 'testers',
			created_at: new Date(),
    }

    this.items.push(org)

    return org
  }


}