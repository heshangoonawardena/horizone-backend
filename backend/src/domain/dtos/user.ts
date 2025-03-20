import { z } from "zod";

export const createUserDTO = z.object({
  name: z.string(),
  email: z.string(),
});
