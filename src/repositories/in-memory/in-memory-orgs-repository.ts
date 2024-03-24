import {
  OrgWithPets,
  OrgsRepository,
} from '@/repositories/orgs-repository'
import { Org, Pet, Prisma } from '@prisma/client'
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

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
        id: data.id ? data.id : randomUUID(),
        created_at: new Date(),
        name: data.name,
        address: data.address,
        cnpj: data.cnpj,
        description: data.description ?? null, // Definindo explicitamente como null se for undefined
        email: data.email,
        phone: data.phone,
        pets: data.pets,
        password_hash: data.password_hash ?? 'testers', // Definindo um valor padrão se for undefined (pode ser ajustado conforme necessário)
    };

		this.items.push(org);
		
    return org;
}




}