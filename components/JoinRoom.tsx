"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { HoverBorderGradient } from "./HoverBorderGradient";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const FormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  room: z.string().min(1, {
    message: "Room Code is required to join the session.",
  }),
});

export function JoinRoom() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("roomCode");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      room: roomCode ?? "",
    },
  });
  useEffect(() => {
    form.setFocus("username");
  }, [form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px]border-none rounded-md bg-slate-950 p-4">
          <code className="text-white">{`Joined: ${data.username}, Room: ${data.room}`}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 h-[240px]  space-y-6"
      >
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                <div className="bg-clip-text  bg-gradient-to-b text-transparent from-neutral-400 to-white text-xl font-bold tracking-tight">
                  Username
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name.."
                  {...field}
                  className="text-white border-neutral-800"
                />
              </FormControl>
              <FormDescription className=" text-white text-sm bg-gradient-to-b   text-transparent  from-neutral-400 to-white  tracking-tight bg-clip-text">
                This is your joining display name.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Required Room Field */}
        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                <div className="bg-clip-text bg-gradient-to-b text-transparent from-neutral-400 to-white text-xl font-bold tracking-tight">
                  Room Code
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the room code.."
                  {...field}
                  className="text-white border-neutral-800"
                />
              </FormControl>
              <FormDescription className=" text-white text-sm bg-gradient-to-b   text-transparent  from-neutral-400 to-white  tracking-tight bg-clip-text">
                Without room code you can't proceed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <HoverBorderGradient
          leftSideBar={false}
          containerClassName="rounded-md  w-full"
          as="button"
          className="bg-black text-white w-full flex items-center space-x-2"
        >
          <button type="submit" className="font-medium text-sm w-full">
            Join
          </button>
        </HoverBorderGradient>
      </form>
    </Form>
  );
}
