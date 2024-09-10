"use client";
import { Metadata } from "next";
import Image from "next/image";

import { UserAuthForm } from "@/components/UseAuthForm";
export default function Page() {
  return (
    <>
      <div className="md:hidden  ">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden   h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4)), url(/tryestimate.png)",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              opacity: 0.8,
            }}
            className="absolute inset-0 bg-neutral-900"
          />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <h2 className="bg-clip-text  text-transparent text-center bg-gradient-to-b  from-neutral-400 to-white text-4xl  font-sans   relative z-20 font-bold tracking-tight">
              Estimate
            </h2>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Empowering Teams with Accurate, Real-Time Story
                Pointing.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8  ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h2 className="bg-clip-text  text-transparent text-center bg-gradient-to-b  from-neutral-400 to-white text-3xl  font-sans   relative z-20 font-bold tracking-tight">
                Create an account
              </h2>
              <p className="text-sm  text-neutral-400 text-center mt-2">
                We are supporting only Google accounts as of now!
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
