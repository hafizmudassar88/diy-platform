"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useFileUpload from "@/hooks/useFileUpload";

const schema = z.object({
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(1, "Description is required"),
  heroImage: z.string().min(1, "Hero section image is required"),
});

export default function BlogForm() {
  const [entries, setEntries] = useState([
    {
      id: 1,
      tagline: "",
      description: "",
      heroImage: "",
    },
  ]);

  const { uploadFile } = useFileUpload();

  const addBlogEntry = () => {
    setEntries([
      ...entries,
      {
        id: entries.length + 1,
        tagline: "",
        description: "",
        heroImage: "",
      },
    ]);
  };

  const handleFileChange = async (e, setFileCallback) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      const uploadedUrl = await uploadFile(selectedFile);
      setFileCallback(uploadedUrl);
    } catch (error) {
      console.error("File upload failed:", error.message);
    }
  };

  return (
    <div className="p-6 mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1200px]">
      <div className="flex justify-end mb-6">
        <Button onClick={addBlogEntry}>Add Blog</Button>
      </div>

      {entries.map((entry, index) => (
        <BlogEntryForm
          key={entry.id}
          entry={entry}
          index={index}
          handleFileChange={handleFileChange}
        />
      ))}
    </div>
  );
}

function BlogEntryForm({ entry, index, handleFileChange }) {
  const [selectedHeroImage, setSelectedHeroImage] = useState(entry.heroImage);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tagline: entry.tagline,
      description: entry.description,
      heroImage: entry.heroImage,
    },
  });

  const onSubmit = (formData) => {
    console.log(`Blog Entry ${index + 1} Data:`, {
      ...formData,
      heroImage: selectedHeroImage,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 border rounded-lg"
      >
        <h2 className="text-xl font-bold mb-4">Blog Entry {index + 1}</h2>

        {/* Tagline */}
        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input placeholder="Enter tagline" {...field} />
              </FormControl>
              <FormDescription>
                Required: Enter a catchy tagline for blog
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" rows={4} {...field} />
              </FormControl>
              <FormDescription>
                Required: Provide a brief description
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hero Section Image */}
        <FormField
          control={form.control}
          name="heroImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Section Image URL</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload hero section image"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFileChange(e, setSelectedHeroImage);
                  }}
                />
              </FormControl>
              <FormDescription>
                {selectedHeroImage ||
                  "Required: Choose your hero section image"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Blog Data
        </Button>
      </form>
    </Form>
  );
}
