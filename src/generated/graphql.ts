
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface CreateRoomInput {
    capacity: number;
    name: string;
    venueId: string;
}

export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
    role?: Nullable<Role>;
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

export interface UpdateUserInput {
    email?: Nullable<string>;
    id?: Nullable<string>;
    name?: Nullable<string>;
    role?: Nullable<Role>;
}

export interface UpdateVenueInput {
    description?: Nullable<string>;
    id: string;
    location?: Nullable<string>;
    name?: Nullable<string>;
}

export interface IMutation {
    createRoom(createRoomInput: CreateRoomInput): Room | Promise<Room>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    createVenue(createVenueInput: CreateVenueInput): Venue | Promise<Venue>;
    removeRoom(id: string): Nullable<Room> | Promise<Nullable<Room>>;
    removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
    removeVenue(id: string): Nullable<Venue> | Promise<Nullable<Venue>>;
    updateRoom(updateRoomInput: UpdateRoomInput): Room | Promise<Room>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    updateVenue(updateVenueInput: UpdateVenueInput): Venue | Promise<Venue>;
}

export interface IQuery {
    getRoom(id: string): Nullable<Room> | Promise<Nullable<Room>>;
    getRooms(): Nullable<Room>[] | Promise<Nullable<Room>[]>;
    getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
    getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
    getVenue(id: string): Nullable<Venue> | Promise<Nullable<Venue>>;
    getVenues(): Nullable<Venue>[] | Promise<Nullable<Venue>[]>;
}

export interface Room {
    capacity: number;
    id?: Nullable<string>;
    name: string;
    venue?: Nullable<Venue>;
    venueId: string;
}

export interface User {
    email: string;
    id?: Nullable<string>;
    name: string;
    password: string;
    role?: Nullable<Role>;
}

export interface Venue {
    description?: Nullable<string>;
    id?: Nullable<string>;
    location: string;
    name: string;
    rooms?: Nullable<Nullable<Room>[]>;
}

type Nullable<T> = T | null;
