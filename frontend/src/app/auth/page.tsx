"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const router = useRouter();

  async function signIn(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`${BACKEND_URI}/api/auth/login`, {
        email: values.email,
        password: values.password
      }, { withCredentials: true })
      router.push('/todos');
      toast("Login successful");
    } catch (error) {
      toast(error instanceof AxiosError ? error.response?.data?.error : "Error signing in")
    }
  }
  async function signUp(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`${BACKEND_URI}/api/auth/signup`, {
        email: values.email,
        password: values.password
      }, { withCredentials: true })
      toast("User registered successfully");
      router.push('/todos');
    } catch (error) {
      toast(error instanceof AxiosError ? error.response?.data?.error : "Error registering user")
    }
  }

  return (
    <div className="flex flex-col items-center p-4 grow justify-center">
      <Form {...form}>
        <form className="space-y-6 border border-black p-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-around [&>*]:grow">
            <Button className="hover:bg-black hover:text-white text-black bg-white focus:z-10" type="button" onClick={form.handleSubmit(signUp)}>Register</Button>
            <Button className="hover:bg-black hover:text-white text-black bg-white focus:z-10" type="button" onClick={form.handleSubmit(signIn)}>Login</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
