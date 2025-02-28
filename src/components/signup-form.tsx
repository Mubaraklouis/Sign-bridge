"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupSchema } from "@/schema/zod-schema";
import axios from "axios";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    const { fullName: username, email, password } = data;
    console.log("Form data:", data);

    // console.log(username, email, password);

    try {
      const response = await axios.post(
        "/api/signup",

        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      console.log("Data from the sign in page", data);
      return data;
    } catch (error) {
      // Handle errors
      console.error("Failed to register:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Link href="/login">
                  <Button type="submit" className="w-full">
                    login
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Sign Up with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account? Login
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
