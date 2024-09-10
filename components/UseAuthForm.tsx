"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Reveal } from "./Reveal";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = any;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  //   async function onSubmit(data: FormData) {
  //     setIsLoading(true);

  //     const signInResult = await signIn("email", {
  //       email: data.email.toLowerCase(),
  //       redirect: false,
  //       callbackUrl: searchParams?.get("from") || "/dashboard",
  //     });

  //     setIsLoading(false);

  //     if (!signInResult?.ok) {
  //       return toast({
  //         title: "Something went wrong.",
  //         description: "Your sign in request failed. Please try again.",
  //         variant: "destructive",
  //       });
  //     }

  //     return toast({
  //       title: "Check your email",
  //       description: "We sent you a login link. Be sure to check your spam too.",
  //     });
  //   }

  return (
    <div className={cn("grid gap-6 text-white", className)} {...props}>
      <form onSubmit={() => {}}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>

            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {/* {errors.email.message} */}
              </p>
            )}
          </div>
          <Reveal title="Sign with Google" />
        </div>
      </form>
    </div>
  );
}
