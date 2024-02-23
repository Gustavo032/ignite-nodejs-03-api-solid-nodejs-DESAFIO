import { Org, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
	city: string;
}

export interface OrgsRepository {
	searchMany(query: string, page:number): Promise<Org[]>
	findByOrgId(id: string): Promise<Org | null>;
	create(data: Prisma.OrgCreateInput) : Promise<Org>;
	findManyNearby(params: FindManyNearbyParams): Promise<Org[]>
	findByEmail(email: string): Promise<Org | null>
}