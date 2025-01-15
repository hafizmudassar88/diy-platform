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

// Define the schema for the research form
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  abstract: z.string().min(1, "Abstract is required"),
  researchPaper: z.string().min(1, "Research paper upload is required"),
});

export default function ResearchForm() {
  const { formData, addResearchEntry, updateFormData } = useFormContext();
  const { research } = formData; // Pull research from global formData

  // Initialize entries as an array, even if research is undefined
  const [entries, setEntries] = useState(Array.isArray(research) ? research : []);

  // Sync entries with formData.research whenever it changes
  useEffect(() => {
    if (Array.isArray(research)) {
      setEntries(research);
    }
  }, [research]);

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

  // Function to add a new research entry
  const handleAddResearchEntry = () => {
    const newEntry = {
      id: entries.length + 1,
      title: "",
      abstract: "",
      researchPaper: "",
    };
    setEntries([...entries, newEntry]);
    addResearchEntry(newEntry); // Add the new entry to the global form data
  };

  return (
    <div className="p-6 mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1200px]">
      <div className="flex justify-end mb-6">
        <Button onClick={handleAddResearchEntry}>Add Research</Button>
      </div>

      {entries.map((entry, index) => (
        <ResearchEntryForm
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

// Research Entry Form Component
function ResearchEntryForm({ entry, index, handleFileChange, updateFormData }) {
  const [selectedResearchPaper, setSelectedResearchPaper] = useState(
    entry.researchPaper
  );
  const [isSaved, setIsSaved] = useState(false); // State for save animation

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: entry.title,
      abstract: entry.abstract,
      researchPaper: entry.researchPaper,
    },
  });

  // Update form values when entry changes
  useEffect(() => {
    form.reset({
      title: entry.title,
      abstract: entry.abstract,
      researchPaper: entry.researchPaper,
    });
    setSelectedResearchPaper(entry.researchPaper);
  }, [entry, form]);

  // Function to handle form submission
  const onSubmit = (data) => {
    const updatedEntry = {
      ...data,
      researchPaper: selectedResearchPaper,
    };

    // Update the specific research entry in the research array
    updateFormData("research", (prevResearch) => {
      const updatedResearch = [...prevResearch]; // Create a copy of the research array
      updatedResearch[index] = updatedEntry; // Update the specific entry
      return updatedResearch; // Return the updated array
    });

    console.log(`Research Entry ${index + 1} Data:`, updatedEntry);

    // Show success feedback
    setIsSaved(true);
    toast.success("Research data saved successfully!");

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
        <h2 className="text-xl font-bold mb-4">Research Entry {index + 1}</h2>

        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter research title" {...field} />
              </FormControl>
              <FormDescription>
                Required: Provide a title for your research
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Abstract Field */}
        <FormField
          control={form.control}
          name="abstract"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abstract</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter research abstract"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Required: Provide a brief abstract of your research
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Research Paper Upload Field */}
        <FormField
          control={form.control}
          name="researchPaper"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Research Paper</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf"
                  placeholder="Upload research paper"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFileChange(e, setSelectedResearchPaper);
                  }}
                />
              </FormControl>
              <FormDescription>
                {selectedResearchPaper ||
                  "Required: Upload your research paper as a PDF"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Save Button and Success Feedback */}
        <div className="flex items-center gap-2">
          <Button type="submit">Save Research Data</Button>
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