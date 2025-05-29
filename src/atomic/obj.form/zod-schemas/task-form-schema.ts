import z from 'zod';

const taskFormStrings = {
 emptyName: 'A tarefa precisa de um nome!',
};

export const taskFormSchema = z.object({
 name: z.string().nonempty({ message: taskFormStrings.emptyName }),
});

