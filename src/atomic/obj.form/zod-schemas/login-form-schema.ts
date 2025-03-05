import z from 'zod';

const loginFormStrings = {
 passwordTooShort: 'A senha deve ter pelo menos 8 caracteres',
 invalidEmail: 'O email deve ser um email válido',
};

export const loginFormSchema = z.object({
 email: z.string().email({ message: loginFormStrings.invalidEmail }),
 password: z.string().min(8, loginFormStrings.passwordTooShort),
});
