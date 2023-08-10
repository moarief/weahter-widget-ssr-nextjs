import * as z from "zod";

export const SearchSchema = z.object({
  country: z.string(),
});

export type SearchProps = z.infer<typeof SearchSchema>;
