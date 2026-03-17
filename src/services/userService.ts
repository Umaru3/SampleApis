import { users, User } from '../datas/userData';

export const getUser = (id: number): User | undefined => {
    return users.find(user => user.id === id);
};

export const getAllUsers = (): User[] => {
    return users;
}