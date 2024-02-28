import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
	findById(id: string): Promise<Pet | null>
	findByPetIdOnDate(userId: string, date: Date): Promise<Pet | null>
	findManyByUserId(userId: string, page: number): Promise<Pet[]>
	countByUserId(userId: string): Promise<number>
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
	save(Pet: Pet): Promise<Pet>
}