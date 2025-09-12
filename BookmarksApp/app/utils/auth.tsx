import axios from "axios";

import { BASE_ENDPOINT } from "../data/consts";
import { User } from "../data/response";

export async function serverLogin(
  email: string,
  password: string,
): Promise<{ id: string; email: string; username: string } | null> {
  try {
    const response = await axios.post(`${BASE_ENDPOINT}/users`, {
      email,
      password,
    });
    if (response.data && response.data.id && response.data.email) {
      return {
        id: response.data.id,
        email: response.data.email,
        username: response.data.username,
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function serverSignup(
  name: string,
  email: string,
  password: string,
): Promise<User | null> {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username: name, password }),
    });

    if (!response.ok) {
      console.error("Signup failed with status", response.status);
      return null;
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error("Error during signup:", error);
    return null;
  }
}

//dev only
export function simpleLogin(email: string, password: string): boolean {
  const validEmail = "test@test.com";
  const validPassword = "password";

  return email === validEmail && password === validPassword;
}
