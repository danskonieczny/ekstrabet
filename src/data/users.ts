import type { User } from "../types";

export const mockUsers: User[] = [
    { id: "1", username: "Daniel", totalPoints: 120, role: "admin" },
    { id: "2", username: "Mateusz", totalPoints: 95, role: "user" },
    { id: "3", username: "Maciej", totalPoints: 87, role: "user" },
];
export const currentUser: User = mockUsers[0];
