import api from "../api";

async function postReqWithErrorHandling(endpoint, body) {
  const errors = [];

  console.log(body);
  const result = await api.post(endpoint, body).catch(err => {
    errors.push(...err.response.data.errors);
  });

  if (errors.length > 0) {
    return { errors };
  }

  return result.data;
}

export async function register(username, email, password) {
  const body = {
    username,
    email,
    password
  };
  return postReqWithErrorHandling("/account", body);
}

export async function authenticate(email, password) {
  const body = {
    email,
    password
  };
  return postReqWithErrorHandling("/auth", body);
}

export async function currentUser(token) {
  const result = await api.get("/auth", {
    headers: {
      "x-auth-token": token
    }
  });

  return result.data;
}
