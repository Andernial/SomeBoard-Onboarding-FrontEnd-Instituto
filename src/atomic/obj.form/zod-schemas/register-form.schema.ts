import z from 'zod';

const registerFormStrings = {
 passwordTooShort: 'A senha deve conter pelo menos 8 caracteres',
 invalidEmail: 'O email deve ser um email válido',
 confirmPasswordError: 'As senhas não coincidem',
 terms: 'Aceite aos termos de uso para fazer cadastro',
 nameFieldObligatory: 'O nome é obrigatório',
};

export const registerFormSchema = z
 .object({
  name: z.string().nonempty({ message: registerFormStrings.nameFieldObligatory }),
  email: z.string().email({ message: registerFormStrings.invalidEmail }),
  confirmPassword: z.string(),
  password: z
   .string()
   .min(8, registerFormStrings.passwordTooShort)
   .regex(/[a-zA-Z]/, 'Senha deve conter pelo menos uma letra')
   .regex(/[^a-zA-Z0-9]/, 'Senha deve conter pelo menos um símbolo'),
  terms: z.boolean().refine((val) => val === true, { message: registerFormStrings.terms }),
 })
 .refine((data) => data.confirmPassword === data.password, {
  message: registerFormStrings.confirmPasswordError,
  path: ['confirmPassword'],
 });
