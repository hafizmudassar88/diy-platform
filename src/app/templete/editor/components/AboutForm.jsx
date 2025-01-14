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
import useFileUpload from "@/hooks/useFileUpload";
import { CheckCircle } from "lucide-react"; // For the green checkmark icon
import { toast } from "react-hot-toast"; // For toast notifications

// Zod schema for form validation
const schema = z.object({
  bioImage: z.string().min(1, "Bio image is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(1, "Bio is required"),
});

export function AboutForm({ data }) {
  const { formData, updateFormData } = useFormContext();

  // State for uploaded bio image
  const [SelectedBioImage, setSelectedBioImage] = useState(
    data?.bioImage || null
  );

  // State to track if the form is saved
  const [isSaved, setIsSaved] = useState(false);

  const { about } = formData;

  // React Hook Form setup
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      bioImage: data?.bioImage || about?.bioImage || "",
      title: data?.title || about?.title || "",
      bio: data?.bio || about?.bio || "",
    },
  });

  const { uploading, uploadFile } = useFileUpload();

  // Handle file upload
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      const uploadedUrl = await uploadFile(selectedFile);
      setSelectedBioImage(uploadedUrl);
      console.log("Uploaded File URL:", uploadedUrl);
    } catch (error) {
      console.error("Failed to upload file:", error.message);
    }
  };

  // Form submission handler
  const onSubmit = (data) => {
    console.log("About data", data);

    // Update global form data
    updateFormData("about", { ...data, bioImage: SelectedBioImage });

    // Show success feedback
    setIsSaved(true);
    toast.success("About data saved successfully!");

    // Reset the saved state after 3 seconds
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Bio Image */}
        <FormField
          control={form.control}
          name="bioImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio Image</FormLabel>
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
                {SelectedBioImage || about?.bioImage || "Required: Choose your bio image"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
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

        {/* Bio */}
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

        {/* Save Button and Success Feedback */}
        <div className="flex items-center gap-2">
          <Button type="submit">Save About Data</Button>
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