import type { User } from "../types";

export const mockUsers: User[] = [
    { id: "1", username: "Daniel", totalPoints: 120 },
    { id: "2", username: "Marek", totalPoints: 95 },
    { id: "3", username: "Kamil", totalPoints: 87 },
];

export const currentUser: User = mockUsers[0];
