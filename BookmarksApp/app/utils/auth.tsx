//dev only
export default function simpleLogin(email: string, password: string): boolean {
  const validEmail = "test@test.com";
  const validPassword = "password";

  return email === validEmail && password === validPassword;
}
