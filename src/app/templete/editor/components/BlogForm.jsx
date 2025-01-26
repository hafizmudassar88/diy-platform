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
import { CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const schema = z.object({
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(1, "Description is required"),
  heroImage: z.string().min(1, "Hero section image is required"),
});

export default function BlogForm() {
  const { formData, addBlogEntry, updateFormData } = useFormContext();
  const { blogs } = formData;
  const [entries, setEntries] = useState(() => 
    Array.isArray(blogs) 
      ? blogs.map(entry => ({ ...entry, isDirty: false })) 
      : []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const { uploadFile } = useFileUpload();

  const filteredEntries = entries.filter(entry => {
    const searchLower = searchTerm.toLowerCase();
    return (
      entry.id.toString().includes(searchLower) ||
      entry.tagline.toLowerCase().includes(searchLower)
    );
  });

  const allSaved = entries.every(entry => !entry.isDirty);
  const unsavedCount = entries.filter(entry => entry.isDirty).length;

  useEffect(() => {
    if (Array.isArray(blogs)) {
      setEntries(blogs.map(entry => ({ 
        ...entry, 
        isDirty: false 
      })));
    }
  }, [blogs]);

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

  const handleAddBlogEntry = () => {
    const newEntry = {
      id: Date.now(),
      tagline: "",
      description: "",
      heroImage: "",
      isDirty: true
    };
    setEntries([...entries, newEntry]);
    addBlogEntry(newEntry);
  };

  const handleRemoveBlogEntry = (idToRemove) => {
    updateFormData("blogs", prevBlogs => 
      prevBlogs.filter(blog => blog.id !== idToRemove)
    );
    setEntries(prev => prev.filter(entry => entry.id !== idToRemove));
  };

  const handleEntryUpdate = (id, updatedData) => {
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === id ? { ...updatedData, isDirty: true } : entry
      )
    );
  };

  const handleEntrySave = async (id) => {
    try {
      const entryToSave = entries.find(entry => entry.id === id);
      
      const validation = schema.safeParse({
        tagline: entryToSave.tagline,
        description: entryToSave.description,
        heroImage: entryToSave.heroImage
      });

      if (!validation.success) {
        const errors = validation.error.errors.map(err => `${err.path[0]} ${err.message}`);
        throw new Error(`Validation errors: ${errors.join(", ")}`);
      }

      updateFormData("blogs", prevBlogs =>
        prevBlogs.map(blog =>
          blog.id === id ? { ...entryToSave, isDirty: false } : blog
        )
      );

      setEntries(prevEntries =>
        prevEntries.map(entry =>
          entry.id === id ? { ...entry, isDirty: false } : entry
        )
      );

      toast.success("Blog entry saved successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1200px]">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Button onClick={handleAddBlogEntry}>Add Blog</Button>
          <div className="text-sm text-muted-foreground">
            {allSaved ? (
              <span className="text-green-600 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                All changes saved
              </span>
            ) : (
              <span className="text-yellow-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {unsavedCount} unsaved {unsavedCount === 1 ? "entry" : "entries"}
              </span>
            )}
          </div>
        </div>
        <div className="w-full sm:flex-1 sm:max-w-xs">
          <Input
            type="text"
            placeholder="Search by ID or tagline..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {filteredEntries.map((entry) => (
        <BlogEntryForm
          key={entry.id}
          entry={entry}
          handleFileChange={handleFileChange}
          onUpdate={handleEntryUpdate}
          onSave={handleEntrySave}
          onRemove={handleRemoveBlogEntry}
        />
      ))}
    </div>
  );
}

function BlogEntryForm({ entry, handleFileChange, onUpdate, onSave, onRemove }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tagline: entry.tagline,
      description: entry.description,
      heroImage: entry.heroImage,
    },
  });

  const handleChange = (field, value) => {
    form.setValue(field, value, { shouldValidate: true });
    onUpdate(entry.id, {
      ...entry,
      [field]: value,
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await handleFileChange(e, (url) => {
        handleChange('heroImage', url);
        form.setValue('heroImage', url, { shouldValidate: true });
      });
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-6 p-6 border rounded-lg mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">Blog Entry ID: {entry.id}</h2>
            <div className="text-sm mt-1 flex items-center gap-1">
              {entry.isDirty ? (
                <span className="text-yellow-600">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Unsaved changes
                </span>
              ) : (
                <span className="text-green-600">
                  <CheckCircle className="h-4 w-4 inline mr-1" />
                  Saved
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => onSave(entry.id)}
              disabled={!entry.isDirty}
            >
              Save Entry
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onRemove(entry.id)}
            >
              Remove
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter tagline" 
                  {...field}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  rows={4}
                  {...field}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  onChange={handleFileUpload}
                />
              </FormControl>
              <FormDescription>
                {field.value ? (
                  <span className="text-green-600 break-all">
                    Uploaded: {field.value}
                  </span>
                ) : (
                  "Required: Choose your hero section image"
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}