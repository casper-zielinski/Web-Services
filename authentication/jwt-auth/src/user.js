const USERS = [];
let id = 0;

export const addUser = (userData) => {
  id++;
  USERS.push({ id: id, ...userData });
  return id;
};

export const getUsers = () => {
  return USERS;
};

export const getUserById = (id) => {
  return USERS.find((user) => user.id === id);
};
