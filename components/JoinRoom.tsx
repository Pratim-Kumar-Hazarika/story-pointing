"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Suspense } from "react";
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
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "./ui/button";
import { WebsocketManager } from "@/utils/WebsocketManager";

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
  const { setUser } = useAppContext();
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

  // Load username and moderator status from localStorage if available
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      form.setValue("username", storedUsername);
    }
    form.setFocus("username");
  }, [form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setUser({ name: data.username, isModerator: false });
    localStorage.removeItem("moderatorId");
    localStorage.setItem("username", data.username);
    localStorage.setItem("roomCode", data.room);
    const createRoomPayload = {
      method: "SUBSCRIBE",
      params: [data.room],
      username: data.username,
      moderatorId: null,
    };
    console.log({ createRoomPayload });
    WebsocketManager.getInstance().sendMessage(createRoomPayload);
  }

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 h-[400px]  space-y-6"
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
                <FormDescription className=" text-sm text-white  bg-gradient-to-b   text-transparent  from-neutral-400 to-white  tracking-tight bg-clip-text">
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
                  Without room code you can&apos;t proceed
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
            Join Room
          </Button>
        </form>
      </Form>
    </Suspense>
  );
}
