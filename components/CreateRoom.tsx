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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { generateRoomCode } from "@/utils/otp";
import { Button } from "./ui/button";

const FormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export function CreateRoom() {
  const { toast } = useToast();
  const router = useRouter();
  const { createRoom, setCreateRoom, setUser } = useAppContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });
  useEffect(() => {
    form.setFocus("username");
  }, [form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const roomCode = generateRoomCode();
    setUser({ name: data.username, isModerator: true });
    setCreateRoom({ roomCode: roomCode });
    toast({
      description: "Room created successfully 🚀",
    });
    router.push(`/trynow?roomCode=${roomCode}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 h-[240px] space-y-6"
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
                You will be the moderator
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="outline"
          className="border-neutral-800  text-white w-full"
        >
          Create Room
        </Button>
      </form>
    </Form>
  );
}
