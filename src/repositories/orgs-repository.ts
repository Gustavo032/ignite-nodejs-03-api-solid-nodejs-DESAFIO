import { Org, Prisma } from "@prisma/client";
import { Pet } from '@prisma/client';

export type OrgWithPets = Org & { pets: Pet[] };

export interface OrgsRepository {
	searchMany(query: string, page:number): Promise<Org[]>
	findByOrgId(id: string): Promise<Org | null>;
	findByEmail(email: string): Promise<Org | null>
	create(data: Prisma.OrgCreateInput) : Promise<Org>;
}