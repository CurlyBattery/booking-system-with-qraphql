
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum BookingStatus {
    CANCELLED = "CANCELLED",
    CONFIRMED = "CONFIRMED",
    PENDING = "PENDING"
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface CreateBookingInput {
    endTime: DateTime;
    roomId: string;
    startTime: DateTime;
    status?: Nullable<BookingStatus>;
    userId: string;
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
}

export interface CreateVenueInput {
    description?: Nullable<string>;
    location?: Nullable<string>;
    name: string;
}

export interface SignInInput {
    email: string;
    password: string;
}

export interface UpdateBookingInput {
    endTime?: Nullable<DateTime>;
    id: string;
    startTime?: Nullable<DateTime>;
    status?: Nullable<BookingStatus>;
}

export interface UpdateRoomInput {
    capacity?: Nullable<number>;
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

export interface AuthPayload {
    accessToken: string;
    role: Role;
    userId: string;
}

export interface Booking {
    endTime: DateTime;
    id?: Nullable<string>;
    room?: Nullable<Room>;
    roomId: string;
    startTime: DateTime;
    status?: Nullable<BookingStatus>;
    user?: Nullable<User>;
    userId: string;
}

export interface IMutation {
    createBooking(createBookingInput: CreateBookingInput): Booking | Promise<Booking>;
    createRoom(createRoomInput: CreateRoomInput): Room | Promise<Room>;
    createVenue(createVenueInput: CreateVenueInput): Venue | Promise<Venue>;
    removeBooking(id: string): Nullable<Booking> | Promise<Nullable<Booking>>;
    removeRoom(id: string): Nullable<Room> | Promise<Nullable<Room>>;
    removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
    removeVenue(id: string): Nullable<Venue> | Promise<Nullable<Venue>>;
    signIn(loginInput?: Nullable<SignInInput>): AuthPayload | Promise<AuthPayload>;
    signUp(registerInput?: Nullable<CreateUserInput>): User | Promise<User>;
    updateBooking(updateBookingInput: UpdateBookingInput): Booking | Promise<Booking>;
    updateRoom(updateRoomInput: UpdateRoomInput): Room | Promise<Room>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    updateVenue(updateVenueInput: UpdateVenueInput): Venue | Promise<Venue>;
}

export interface IQuery {
    getAuthenticatedUser(): User | Promise<User>;
    getBooking(id: string): Nullable<Booking> | Promise<Nullable<Booking>>;
    getBookings(): Nullable<Booking>[] | Promise<Nullable<Booking>[]>;
    getRoom(id: string): Nullable<Room> | Promise<Nullable<Room>>;
    getRooms(): Nullable<Room>[] | Promise<Nullable<Room>[]>;
    getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
    getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
    getVenue(id: string): Nullable<Venue> | Promise<Nullable<Venue>>;
    getVenues(): Nullable<Venue>[] | Promise<Nullable<Venue>[]>;
}

export interface Room {
    bookings?: Nullable<Nullable<Booking>[]>;
    capacity: number;
    id?: Nullable<string>;
    name: string;
    venue?: Nullable<Venue>;
    venueId: string;
}

export interface User {
    bookings?: Nullable<Booking[]>;
    email: string;
    id?: Nullable<string>;
    name: string;
    role?: Nullable<Role>;
}

export interface Venue {
    description?: Nullable<string>;
    id?: Nullable<string>;
    location: string;
    name: string;
    rooms?: Nullable<Room[]>;
}

export type DateTime = any;
type Nullable<T> = T | null;
