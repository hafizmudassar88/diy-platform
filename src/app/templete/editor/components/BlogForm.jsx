"use client";
import { useState, useEffect } from "react";
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
import { useFormContext } from "@/contexts/FormContext";
import { CheckCircle } from "lucide-react"; // For the green checkmark icon
import { toast } from "react-hot-toast"; // For toast notifications

// Define the schema for the blog form
const schema = z.object({
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(1, "Description is required"),
  heroImage: z.string().min(1, "Hero section image is required"),
});

export default function BlogForm() {
  const { formData, addBlogEntry, updateFormData } = useFormContext();
  const { blogs } = formData; // Pull blogs from global formData

  // Initialize entries as an array, even if blogs is undefined
  const [entries, setEntries] = useState(Array.isArray(blogs) ? blogs : []);

  // Sync entries with formData.blogs whenever it changes
  useEffect(() => {
    if (Array.isArray(blogs)) {
      setEntries(blogs);
    }

    console.log(`form Data:`, formData);
  }, [blogs]);

  const { uploadFile } = useFileUpload();

  // Function to handle file upload
  const handleFileChange = async (e, setFileCallback) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      const uploadedUrl = await uploadFile(selectedFile); // Upload the file
      setFileCallback(uploadedUrl); // Update the state with the uploaded file URL
    } catch (error) {
      console.error("File upload failed:", error.message);
    }
  };

  // Function to add a new blog entry
  const handleAddBlogEntry = () => {
    const newEntry = {
      id: entries.length + 1,
      tagline: "",
      description: "",
      heroImage: "",
    };
    setEntries([...entries, newEntry]);
    addBlogEntry(newEntry); // Add the new entry to the global form data
  };

  return (
    <div className="p-6 mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1200px]">
      <div className="flex justify-end mb-6">
        <Button onClick={handleAddBlogEntry}>Add Blog</Button>
      </div>

      {entries.map((entry, index) => (
        <BlogEntryForm
          key={entry.id}
          entry={entry}
          index={index}
          handleFileChange={handleFileChange}
          updateFormData={updateFormData}
        />
      ))}
    </div>
  );
}

// Blog Entry Form Component
function BlogEntryForm({ entry, index, handleFileChange, updateFormData }) {
  const [selectedHeroImage, setSelectedHeroImage] = useState(entry.heroImage);
  const [isSaved, setIsSaved] = useState(false); // State for save animation

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tagline: entry.tagline,
      description: entry.description,
      heroImage: entry.heroImage,
    },
  });

  // Update form values when entry changes
  useEffect(() => {
    form.reset({
      tagline: entry.tagline,
      description: entry.description,
      heroImage: entry.heroImage,
    });
    setSelectedHeroImage(entry.heroImage);
  }, [entry, form]);

  // Function to handle form submission
  const onSubmit = (data) => {
    const updatedEntry = {
      ...data,
      heroImage: selectedHeroImage,
    };

    // Update the specific blog entry in the blogs array
    updateFormData("blogs", (prevBlogs) => {
      const updatedBlogs = [...prevBlogs]; // Create a copy of the blogs array
      updatedBlogs[index] = updatedEntry; // Update the specific entry
      return updatedBlogs; // Return the updated array
    });

    console.log(`Blog Entry ${index + 1} Data:`, updatedEntry);

    // Show success feedback
    setIsSaved(true);
    toast.success("Blog data saved successfully!");

    // Reset the saved state after 3 seconds
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 border rounded-lg"
      >
        <h2 className="text-xl font-bold mb-4">Blog Entry {index + 1}</h2>

        {/* Tagline Field */}
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
                Required: Enter a catchy tagline for the blog
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
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

        {/* Hero Image Field */}
        <FormField
          control={form.control}
          name="heroImage"
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
                    handleFileChange(e, setSelectedHeroImage);
                  }}
                />
              </FormControl>
              <FormDescription>
                {selectedHeroImage || "Required: Choose your hero section image"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Save Button and Success Feedback */}
        <div className="flex items-center gap-2">
          <Button type="submit">Save Blog Data</Button>
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
