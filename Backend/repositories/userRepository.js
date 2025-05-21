const users = [];

export function addUser(user) {
  users.push(user);
}

export function getUserById(user_id) {
  return users.find(u => u.user_id === user_id);
}
export function getAllUsers() {
  return users;
}