import axios from "axios";

export async function serverLogin(
  email: string,
  password: string,
): Promise<{ id: string; email: string } | null> {
  try {
    const response = await axios.post("http://localhost:3000/users", {
      email,
      password,
    });
    if (response.data && response.data.id && response.data.email) {
      return { id: response.data.id, email: response.data.email };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

//dev only
export function simpleLogin(email: string, password: string): boolean {
  const validEmail = "test@test.com";
  const validPassword = "password";

  return email === validEmail && password === validPassword;
}
