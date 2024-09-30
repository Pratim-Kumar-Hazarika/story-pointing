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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { generateOTP } from "@/utils/otp";

const FormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export function CreateRoom() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomCode = searchParams.get("roomCode");
  const { createRoom, setCreateRoom } = useAppContext();
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
    const otp = generateOTP();
    setCreateRoom({ username: data.username, roomCode: otp });
    toast({
      description: "Room created successfully 🚀",
    });
    router.push(`/trynow?roomCode=${otp}`);
  }
  console.log("Here", { createRoom });
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
        <HoverBorderGradient
          leftSideBar={false}
          containerClassName="rounded-md  w-full"
          as="button"
          className="bg-black text-white w-full flex items-center space-x-2"
        >
          <button type="submit" className="font-medium text-sm w-full">
            Create Room
          </button>
        </HoverBorderGradient>
      </form>
    </Form>
  );
}
