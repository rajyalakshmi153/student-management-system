export const getRole = () => localStorage.getItem("role");
export const getUserId = () => localStorage.getItem("userId");
export const getToken = () => localStorage.getItem("token");
export const getName = () => localStorage.getItem("name");

export const isAdmin = () => getRole() === "ADMIN";
export const isStudent = () => getRole() === "STUDENT";

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};