export interface Country {
    name: string;
    visited: boolean;
}

export interface User {
    id: string;
    username: string;
    visitedCountries: Country[];
}

export interface AppState {
    users: User[];
}

export const initialState: AppState = {
    users: []
};
