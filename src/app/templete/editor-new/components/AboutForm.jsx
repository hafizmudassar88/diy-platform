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
import { useState } from "react";

const schema = z.object({
  bioImage: z.string().min(1, "Bio image is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(1, "Bio is required"),
});

export function AboutForm() {
  const { formData, updateFormData } = useFormContext();
  const [SelectedBioImage, setSelectedBioImage] = useState(
    formData?.about?.bioImage || null
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...formData.about, bioImage: "" },
  });

  const onSubmit = (data) => {
    updateFormData("about", { ...data, bioImage: SelectedBioImage });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedBioImage(file);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bioImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio Image URL</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Choose bio image"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFileChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                {SelectedBioImage?.name || "Required: Choose your bio image"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormDescription>
                Required: Enter your title or position
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your bio" {...field} />
              </FormControl>
              <FormDescription>
                Required: Write a brief biography
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save About Data</Button>
      </form>
    </Form>
  );
}
