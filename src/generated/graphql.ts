
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateVenueInput {
    description?: Nullable<string>;
    location?: Nullable<string>;
    name: string;
}

export interface UpdateVenueInput {
    description?: Nullable<string>;
    id: string;
    location?: Nullable<string>;
    name?: Nullable<string>;
}

export interface IMutation {
    createVenue(createVenueInput: CreateVenueInput): Venue | Promise<Venue>;
    removeVenue(id: string): Nullable<Venue> | Promise<Nullable<Venue>>;
    updateVenue(updateVenueInput: UpdateVenueInput): Venue | Promise<Venue>;
}

export interface IQuery {
    getVenue(id: string): Nullable<Venue> | Promise<Nullable<Venue>>;
    getVenues(): Nullable<Venue>[] | Promise<Nullable<Venue>[]>;
}

export interface Venue {
    description?: Nullable<string>;
    id?: Nullable<string>;
    location: string;
    name: string;
}

type Nullable<T> = T | null;
