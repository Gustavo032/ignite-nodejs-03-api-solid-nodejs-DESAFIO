import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { GetResult } from '@prisma/client/runtime/library'
import dayjs from 'dayjs'

export class InMemoryPetsRepository implements PetsRepository {	
	public items: Pet[] = []
	
	async findByPetIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date')
		const endOfTheDay = dayjs(date).endOf('date') 

		const petOnSameDate = this.items.find(
			(pet) => {
				const petDate = dayjs(pet.created_at)
				const isOnSameDate = petDate.isAfter(startOfTheDay) && petDate.isBefore(endOfTheDay)

				return pet.id === userId && isOnSameDate
			}
		)

		if(!petOnSameDate){
			return null
		}
		
		return petOnSameDate
	}

	async findManyByUserId(userId: string, page: number) {
		return this.items
		.filter((item) => item.id == userId)
		.slice((page - 1) * 20, page * 20)
	}

	async findById(id: string) {
		const pet = this.items
		.find((item) => item.id === id)

		if(!pet){
			return null
		}

		return pet
	}

	async save(pet: Pet){
		const petIndex = this.items.findIndex((item) => item.id === pet.id);

		if(petIndex >= 0){
			this.items[petIndex] = pet
		}

		return pet
	}

	async countByUserId(userId: string) {
    return this.items.filter((pet) => pet.userId === userId).length
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
        id: randomUUID(),
        name: data.name,
        age: data.age,
        race: data.race,
        observation: typeof data.observation === 'undefined' ? null : data.observation,
        created_at: new Date(),
        orgId: data.orgId,
        userId: typeof data.userId === 'undefined' ? null : data.userId,
        category: data.category,
    };

    this.items.push(pet);

    return pet;
	}
}

// {
// 	async findByEmail(email) {
// 		return null
// 	},

// 	async create(data) {
// 		return {
// 			id: 'user1',
// 			nome: data.nome,
// 			email: data.email,
// 			password_hash: data.password_hash,
// 			created_at: new Date(),
// 		}
// 	},
// }
