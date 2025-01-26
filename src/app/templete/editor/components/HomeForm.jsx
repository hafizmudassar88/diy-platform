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
import { CheckCircle } from "lucide-react"; // For the green checkmark icon
import { toast } from "react-hot-toast"; // For toast notifications

// Zod schema for form validation
const schema = z.object({
  logoImage: z.string().min(1, "Logo image is required"),
  name: z.string().min(1, "Name is required"),
  tagLine: z.string().min(1, "Tag line is required"),
  description: z.string().min(1, "Description is required"),
  heroSectionImage: z.string().min(1, "Hero section image is required"),
});

export function HomeForm({ data }) {
  const { formData, updateFormData } = useFormContext();

  const { home } = formData;

  // State for uploaded images
  const [selectedLogoImage, setSelectedLogoImage] = useState(
    data?.logoImage || null
  );
  const [selectedHeroSectionImage, setSelectedHeroSectionImage] = useState(
    data?.heroSectionImage || null
  );

  // State to track if the form is saved
  const [isSaved, setIsSaved] = useState(false);

  // React Hook Form setup
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      logoImage:  home?.logoImage || "",
      name: home?.name || "",
      tagLine: home?.tagLine || "",
      description: home?.description || "",
      heroSectionImage: home?.heroSectionImage || "",
    },
  });

  const { uploading, uploadFile } = useFileUpload();

  // Handle file upload
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

  // Form submission handler
  const onSubmit = (formData) => {
    console.log("home data", formData);

    // Update global form data
    updateFormData("home", {
      ...formData,
      logoImage: selectedLogoImage,
      heroSectionImage: selectedHeroSectionImage,
    });

    // Show success feedback
    setIsSaved(true);
    toast.success("Home data saved successfully!");

    // Reset the saved state after 3 seconds
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  // Handlers for file input changes
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
              <FormLabel>Logo Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload logo image"
                  onChange={(e) => {
                    field.onChange(e);
                    handleSelectedLogoImageChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                {selectedLogoImage || home?.logoImage || "Required: Choose your logo image"}
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
              <FormLabel>Hero Section Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload hero section image"
                  onChange={(e) => {
                    field.onChange(e);
                    handleSelectedHeroSectionImageChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                {selectedHeroSectionImage || home?.heroSectionImage ||
                  "Required: Choose your hero section image"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Save Button and Success Feedback */}
        <div className="flex items-center gap-2">
          <Button type="submit">Save Home Data</Button>
          {isSaved && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Saved!</span>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
