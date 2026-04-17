import type { User } from "../types";

export const mockUsers: User[] = [
    { id: "1", username: "daniel.skonieczny", name: "Daniel", role: "admin" },
    { id: "2", username: "mateusz.rumel", name: "Mateusz", role: "user" },
    { id: "3", username: "maciej.szafranski", name: "Maciej", role: "user" },
    { id: "4", username: "jakub.stachowski", name: "Jakub", role: "user" },
];
export const currentUser: User = mockUsers[0];
