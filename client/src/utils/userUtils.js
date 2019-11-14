// Move to redux
import { currentUser } from "../api/users/userApi";

export async function getCurrentUser() {
  const token = localStorage.getItem("authToken");
  const result = await currentUser(token);
  console.log(result);
}
