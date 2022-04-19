// mock login and logout
export function login() {
  // add cookie
  document.cookie = "token=swr;";
}
export function logout() {
  // delete cookie
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
