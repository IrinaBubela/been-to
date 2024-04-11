import { createReducer, on } from '@ngrx/store';
import { initialState, AppState, User } from './app.state';
import * as UserActions from './user.actions';

const userReducer = createReducer(
  initialState,
  on(UserActions.register, (state, { username, password }) => {
    const newUser: User = {
      id: Math.random().toString(40).substr(2, 9),
      username,
      visitedCountries: []
    };
    return { ...state, users: [...state.users, newUser] };
  }),
  on(UserActions.login, (state, { username, password }) => {
    console.log(state, { username, password });
    
    return state;
  }),
  on(UserActions.logout, state => {
    
    return state;
  }),
  on(UserActions.markVisitedCountry, (state, { userId, countryName }) => {
    const updatedUsers = state.users.map(user => {
      if (user.id === userId) {
        const visitedCountry = user.visitedCountries.find(country => country.name === countryName);
        if (visitedCountry) {
          visitedCountry.visited = true;
        } else {
          user.visitedCountries.push({ name: countryName, visited: true });
        }
      }
      return user;
    });
    return { ...state, users: updatedUsers };
  })
);

export function reducer(state: AppState | undefined, action: any) {
  return userReducer(state, action);
}
