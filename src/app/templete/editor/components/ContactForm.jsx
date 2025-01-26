"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFormContext } from "@/contexts/FormContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react"; // For the green checkmark icon
import { toast } from "react-hot-toast"; // For toast notifications

// Zod schema for form validation
const schema = z.object({
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
});

export function ContactForm({ data }) {
  const { formData, updateFormData } = useFormContext();

  const { contact } = formData;

  // State to track if the form is saved
  const [isSaved, setIsSaved] = useState(false);

  // React Hook Form setup
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: contact?.email || "",
      address: contact?.address || "",
    },
  });

  // Form submission handler
  const onSubmit = (data) => {
    console.log("data", data);
    console.log("formData before contact", formData);

    // Update global form data
    updateFormData("contact", data);
    console.log("formData after contact", formData);

    // Show success feedback
    setIsSaved(true);
    toast.success("Contact data saved successfully!");

    // Reset the saved state after 3 seconds
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormDescription>
                Required: Enter a valid email address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Field */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your address" {...field} />
              </FormControl>
              <FormDescription>Required: Provide your address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Save Button and Success Feedback */}
        <div className="flex items-center gap-2">
          <Button type="submit">
            {data || contact ? "Save Contact Data" : "Update Contact Data"}
          </Button>
          {isSaved && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Saved!</span>
              {/* <span>{data || contact ? "Saved!" : "Update!"}</span> */}
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
