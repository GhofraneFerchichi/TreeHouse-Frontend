import { Role } from "./role";

// Frontend User Model
export class User {
    id!: number;
    firstname!: string; // Update field name
    lastname!: string; // Keep other fields unchanged
    email!: string;
    password!: string;
    phone!: string;
    adresse!: string;
    token!: string;
    role: Role = Role.USER;
    enabled!:Boolean;
  }
  