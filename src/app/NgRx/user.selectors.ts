import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, User } from './app.state';

export const selectUserState = createFeatureSelector<AppState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: AppState) => state.users
);

export const selectUserById = (userId: string) =>
  createSelector(
    selectAllUsers,
    (users: User[]) => users.find(user => user.id === userId)
  );
