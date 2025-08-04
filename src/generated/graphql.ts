
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateRoomInput {
    capacity: number;
    name: string;
    venueId: string;
}

export interface CreateVenueInput {
    description?: Nullable<string>;
    location?: Nullable<string>;
    name: string;
}

export interface UpdateRoomInput {
    capacity?: Nullable<string>;
    id: string;
    name?: Nullable<string>;
}

export interface UpdateVenueInput {
    description?: Nullable<string>;
    id: string;
    location?: Nullable<string>;
    name?: Nullable<string>;
}

export interface IMutation {
    createRoom(createRoomInput: CreateRoomInput): Room | Promise<Room>;
    createVenue(createVenueInput: CreateVenueInput): Venue | Promise<Venue>;
    removeRoom(id: string): Nullable<Room> | Promise<Nullable<Room>>;
    removeVenue(id: string): Nullable<Venue> | Promise<Nullable<Venue>>;
    updateRoom(updateRoomInput: UpdateRoomInput): Room | Promise<Room>;
    updateVenue(updateVenueInput: UpdateVenueInput): Venue | Promise<Venue>;
}

export interface IQuery {
    getRoom(id: string): Nullable<Room> | Promise<Nullable<Room>>;
    getRooms(): Nullable<Room>[] | Promise<Nullable<Room>[]>;
    getVenue(id: string): Nullable<Venue> | Promise<Nullable<Venue>>;
    getVenues(): Nullable<Venue>[] | Promise<Nullable<Venue>[]>;
}

export interface Room {
    capacity: number;
    id?: Nullable<string>;
    name: string;
    venueId: string;
}

export interface Venue {
    description?: Nullable<string>;
    id?: Nullable<string>;
    location: string;
    name: string;
}

type Nullable<T> = T | null;
