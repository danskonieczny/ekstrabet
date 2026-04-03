import type { User } from "../types";

export const mockUsers: User[] = [
    { id: "1", username: "daniel.skonieczny", totalPoints: 120, role: "admin" },
    { id: "2", username: "mateusz.rumel", totalPoints: 95, role: "user" },
    { id: "3", username: "maciej.szafranski", totalPoints: 87, role: "user" },
    { id: "4", username: "jakub.stachowski", totalPoints: 87, role: "user" },
];
export const currentUser: User = mockUsers[0];
