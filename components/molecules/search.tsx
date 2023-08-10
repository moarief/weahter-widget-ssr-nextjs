"use client";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { SearchProps } from "../../lib/types/search";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  city: z.string({ description: "" }).min(2, {
    message: "City must be least 2 characters.",
  }),
});

export function Search({ country }: SearchProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/?city=${data.city}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-fit space-y-6"
      >
        <div className="flex w-full max-w-lx items-center flex-wrap">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <>
                <FormControl>
                  <Input
                    data-testid="search-field"
                    className={clsx("w-auto mr-2", {
                      "border-red-500": form.formState.errors?.city,
                    })}
                    placeholder="City"
                    {...field}
                    autoFocus
                  />
                </FormControl>

                <Button
                  data-testid="submit-button"
                  className="space-x-2"
                  type="submit"
                >
                  <span>Search</span>
                  {/*  <SearchIcon size={"16"} /> */}
                </Button>
                <FormMessage className="mt-2" />
              </>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
