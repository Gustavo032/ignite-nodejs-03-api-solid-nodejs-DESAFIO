import { Pet, Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaPetsRepository implements PetsRepository {
	async findById(id: string) {
		const pet = await prisma.pet.findUnique({
			where: {
				id,
			}
		})

		return pet
	}

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfTheday = dayjs(date).startOf('date')
		const endOfTheday = dayjs(date).endOf('date')

		const pet = await prisma.pet.findFirst({
			where: {
				userId: userId,
				created_at: {
					gte: startOfTheday.toDate(),
					lte: endOfTheday.toDate()
				}
			}
		})

		return pet
	}

	async findManyByUserId(userId: string, page: number) {
		const pets = prisma.pet.findMany({
			where: {
				userId: userId,
			},
			take: 20,
			skip: (page - 1) * 20
		})

		return pets
	}

	async countByUserId(userId: string) {
		const count = await prisma.pet.count({
			where: {
				userId: userId
			}
		})
		
		return count
	}

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = await prisma.pet.create({
			data
		})

		return pet
	}

	
	async findManyNearby(city: string ): Promise<Pet[]> {
		const pets = await prisma.pet.findMany({
			where: {
				address: {
					contains:city
				},
			},
		});
		
		return pets;
	}
	async save(data: Pet) {
		const pet = await prisma.pet.update({
			where: {
				id: data.id,
			},
			data,
		})

		return pet
	}
}