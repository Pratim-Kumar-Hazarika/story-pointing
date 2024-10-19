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
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { generateRoomCode } from "@/utils/otp";
import { Button } from "./ui/button";
import { WebsocketManager } from "@/utils/WebsocketManager";
import { useRouter } from "next/navigation";
const FormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export function Rejoin() {
  const { toast } = useToast();
  const { setCreateRoom, setUser, reconnectDetails } = useAppContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });
  useEffect(() => {
    form.setFocus("username");
  }, [form]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      form.setValue("username", storedUsername);
    }
    form.setFocus("username");
  }, [form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const roomCode = localStorage.getItem("roomCode");
    if (!roomCode) {
      return;
    }
    const moderatorId = localStorage.getItem("moderatorId");
    setUser({
      name: data.username,
      isModerator: reconnectDetails.isModerator,
    });
    localStorage.setItem("username", data.username);

    setCreateRoom({ roomCode: roomCode });
    const params = new URLSearchParams();
    params.delete("roomCode", roomCode);
    const createRoomPayload = {
      method: "SUBSCRIBE",
      params: [roomCode],
      username: data.username,
      moderatorId: moderatorId ? moderatorId : null,
    };
    router.replace(window.location.pathname);
    WebsocketManager.getInstance().sendMessage(createRoomPayload);
    toast({
      description: "Room Joined successfully 🚀",
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 h-[400px] space-y-6"
      >
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                <div className="bg-clip-text  bg-gradient-to-b text-transparent from-neutral-400 to-white text-xl font-bold tracking-tight">
                  Hey 👋,
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
                Looks like you got disconnected. Your session is{" "}
                <span className=" slow-pulse  text-green-500">ongoing</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <Button
          type="submit"
          variant="outline"
          className="border-neutral-800  text-white w-full  "
        >
          Rejoin Session
        </Button>
      </form>
    </Form>
  );
}
