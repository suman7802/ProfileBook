import CustomError from '../errors/customError';

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new CustomError('Invalid email format', 400);
}

// At least 8 char long, contain at least one letter, and contain at least one digit
export function validatePassword(password: string) {
  const passwordRegex = /^[A-Za-z0-9]{8,}$/;
  if (!passwordRegex.test(password)) throw new CustomError('Invalid password format', 400);
}
