import z from 'zod';

const projectFormStrigs = {
 emptyName: 'O projeto precisa de um nome!',
};

export const projectFormSchema = z.object({
 name: z.string().nonempty({ message: projectFormStrigs.emptyName }),
});
