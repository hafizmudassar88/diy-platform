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
import { useState, useEffect } from "react";
import useFileUpload from "@/hooks/useFileUpload";

const schema = z.object({
  logoImage: z.string().min(1, "Logo image is required"),
  name: z.string().min(1, "Name is required"),
  tagLine: z.string().min(1, "Tag line is required"),
  description: z.string().min(1, "Description is required"),
  heroSectionImage: z.string().min(1, "Hero section image is required"),
});

export function HomeForm({ data }) {
  const { updateFormData } = useFormContext();

  const [selectedLogoImage, setSelectedLogoImage] = useState(
    data?.logoImage || null
  );
  const [selectedHeroSectionImage, setSelectedHeroSectionImage] = useState(
    data?.heroSectionImage || null
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      logoImage: data?.logoImage || "",
      name: data?.name || "",
      tagLine: data?.tagLine || "",
      description: data?.description || "",
      heroSectionImage: data?.heroSectionImage || "",
    },
  });

  const { uploading, uploadFile } = useFileUpload();

  const handleFileChange = async (e, setFile) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      const uploadedUrl = await uploadFile(selectedFile);
      setFile(uploadedUrl);
      console.log("Uploaded File URL:", uploadedUrl);
    } catch (error) {
      console.error("Failed to upload file:", error.message);
    }
  };

  const onSubmit = (formData) => {
    console.log("home data", formData);

    updateFormData("home", {
      ...formData,
      logoImage: selectedLogoImage,
      heroSectionImage: selectedHeroSectionImage,
    });
  };

  const handleSelectedLogoImageChange = async (e) => {
    await handleFileChange(e, setSelectedLogoImage);
  };

  const handleSelectedHeroSectionImageChange = async (e) => {
    await handleFileChange(e, setSelectedHeroSectionImage);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Logo Image */}
        <FormField
          control={form.control}
          name="logoImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo Image URL</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Enter logo image URL"
                  onChange={(e) => {
                    field.onChange(e);
                    handleSelectedLogoImageChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                {selectedLogoImage || "Required: Choose your logo image"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormDescription>
                Required: Enter your name or company name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tagline */}
        <FormField
          control={form.control}
          name="tagLine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input placeholder="Enter tagline" {...field} />
              </FormControl>
              <FormDescription>
                Required: Enter a catchy tagline
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
                <Textarea placeholder="Enter description" {...field} />
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
          name="heroSectionImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Section Image URL</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Enter hero section image"
                  onChange={(e) => {
                    field.onChange(e);
                    handleSelectedHeroSectionImageChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                {selectedHeroSectionImage ||
                  "Required: Choose your hero section image"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Blog Data</Button>
      </form>
    </Form>
  );
}
