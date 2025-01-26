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
  title: z.string().min(1, "Title is required"),
  abstract: z.string().min(1, "Abstract is required"),
  researchPaper: z.string().min(1, "Research paper upload is required"),
});

export default function ResearchForm() {
  const { formData, addResearchEntry, updateFormData } = useFormContext();
  const { research } = formData;
  const [entries, setEntries] = useState(() => 
    Array.isArray(research) 
      ? research.map(entry => ({ ...entry, isDirty: false })) 
      : []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const { uploadFile } = useFileUpload();

  const filteredEntries = entries.filter(entry => {
    const searchLower = searchTerm.toLowerCase();
    return (
      entry.id.toString().includes(searchLower) ||
      entry.title.toLowerCase().includes(searchLower)
    );
  });

  const allSaved = entries.every(entry => !entry.isDirty);
  const unsavedCount = entries.filter(entry => entry.isDirty).length;

  useEffect(() => {
    if (Array.isArray(research)) {
      setEntries(research.map(entry => ({ 
        ...entry, 
        isDirty: false 
      })));
    }
  }, [research]);

  const handleFileChange = async (e, setFileCallback) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      const uploadedUrl = await uploadFile(selectedFile);
      setFileCallback(uploadedUrl);
      return uploadedUrl;
    } catch (error) {
      console.error("File upload failed:", error.message);
      throw error;
    }
  };

  const handleAddResearchEntry = () => {
    const newEntry = {
      id: Date.now(),
      title: "",
      abstract: "",
      researchPaper: "",
      isDirty: true
    };
    setEntries([...entries, newEntry]);
    addResearchEntry(newEntry);
  };

  const handleRemoveResearchEntry = (idToRemove) => {
    updateFormData("research", prevResearch => 
      prevResearch.filter(entry => entry.id !== idToRemove)
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
      const entryIndex = entries.findIndex(entry => entry.id === id);
      const entryToSave = entries[entryIndex];
      
      // Validate using current entry data
      const validation = schema.safeParse({
        title: entryToSave.title,
        abstract: entryToSave.abstract,
        researchPaper: entryToSave.researchPaper
      });

      if (!validation.success) {
        const errors = validation.error.errors.map(err => `${err.path[0]} ${err.message}`);
        throw new Error(`Validation failed: ${errors.join(", ")}`);
      }

      // Update global form state
      updateFormData("research", prevResearch =>
        prevResearch.map(entry =>
          entry.id === id ? { ...entryToSave, isDirty: false } : entry
        )
      );

      // Update local entries state
      setEntries(prevEntries =>
        prevEntries.map(entry =>
          entry.id === id ? { ...entry, isDirty: false } : entry
        )
      );

      toast.success("Research entry saved successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1200px]">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Button onClick={handleAddResearchEntry}>Add Research</Button>
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
            placeholder="Search by ID or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {filteredEntries.map((entry) => (
        <ResearchEntryForm
          key={entry.id}
          entry={entry}
          handleFileChange={handleFileChange}
          onUpdate={handleEntryUpdate}
          onSave={handleEntrySave}
          onRemove={handleRemoveResearchEntry}
        />
      ))}
    </div>
  );
}

function ResearchEntryForm({ entry, handleFileChange, onUpdate, onSave, onRemove }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: entry.title,
      abstract: entry.abstract,
      researchPaper: entry.researchPaper,
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
      const uploadedUrl = await handleFileChange(e, (url) => {
        handleChange('researchPaper', url);
        form.setValue('researchPaper', url, { shouldValidate: true });
      });
      
      // Force validation after successful upload
      form.trigger('researchPaper');
      handleChange('researchPaper', uploadedUrl);

    } catch (error) {
      toast.error("File upload failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-6 p-6 border rounded-lg mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">Research Entry ID: {entry.id}</h2>
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter research title" 
                  {...field}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  onChange={(e) => handleChange('abstract', e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  onChange={handleFileUpload}
                />
              </FormControl>
              <FormDescription>
                {field.value ? (
                  <span className="text-green-600 break-all">
                    Uploaded: {field.value}
                  </span>
                ) : (
                  "Required: Upload your research paper as a PDF"
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