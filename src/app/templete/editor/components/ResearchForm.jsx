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

// Define the schema for the research form
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  abstract: z.string().min(1, "Abstract is required"),
  researchPaper: z.string().min(1, "Research paper upload is required"),
});

export default function ResearchForm() {
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: "",
      abstract: "",
      researchPaper: "",
    },
  ]);

  const { uploadFile } = useFileUpload();

  const addResearchEntry = () => {
    setEntries([
      ...entries,
      {
        id: entries.length + 1,
        title: "",
        abstract: "",
        researchPaper: "",
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
        <Button onClick={addResearchEntry}>Add Research</Button>
      </div>

      {entries.map((entry, index) => (
        <ResearchEntryForm
          key={entry.id}
          entry={entry}
          index={index}
          handleFileChange={handleFileChange}
        />
      ))}
    </div>
  );
}

function ResearchEntryForm({ entry, index, handleFileChange }) {
  const [selectedResearchPaper, setSelectedResearchPaper] = useState(
    entry.researchPaper
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: entry.title,
      abstract: entry.abstract,
      researchPaper: entry.researchPaper,
    },
  });

  const onSubmit = (formData) => {
    console.log(`Research Entry ${index + 1} Data:`, {
      ...formData,
      researchPaper: selectedResearchPaper,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 border rounded-lg"
      >
        <h2 className="text-xl font-bold mb-4">Research Entry {index + 1}</h2>

        {/* Title */}
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

        {/* Abstract */}
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

        {/* Research Paper Upload */}
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

        <Button type="submit" className="w-full">
          Save Research Data
        </Button>
      </form>
    </Form>
  );
}
