export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error('Invalid email format');
}

// At least 8 char long, contain at least one letter, and contain at least one digit
export function validatePassword(password: string) {
  const passwordRegex = /^[A-Za-z0-9]{8,}$/;
  if (!passwordRegex.test(password)) throw new Error('Invalid password format');
}
