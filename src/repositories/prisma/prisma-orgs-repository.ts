import { prisma } from '@/lib/prisma'
import { Org, Prisma } from '@prisma/client'
import { FindManyNearbyParams, OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
	async findByOrgId(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

	async findManyNearby({ city }: FindManyNearbyParams) {
    const orgs = await prisma.org.findMany({
			where: {
				address: city,
			},
		});
		
    return orgs
  }

	async searchMany(query: string, page: number) {
    const orgs = await prisma.org.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return orgs
  }

	async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }
	
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
	
}