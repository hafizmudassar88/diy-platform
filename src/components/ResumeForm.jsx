"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useResumeContext } from "@/contexts/ResumeContext";
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
import { Trash2, Plus, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import useFileUpload from "@/hooks/useFileUpload";

const schema = z.object({
  profileImage: z.string().optional(),
  name: z.string().optional(),
  title: z.string().optional(),
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.string().optional()),
  phone: z.string().optional(),
  location: z.string().optional(),
  about: z.string().optional(),
  education: z
    .array(
      z.object({
        school: z.string().optional(),
        degree: z.string().optional(),
        field: z.string().optional(),
        start: z.string().optional(),
        end: z.string().optional(),
      })
    )
    .optional()
    .or(z.null()),
  experience: z
    .array(
      z.object({
        company: z.string().optional(),
        title: z.string().optional(),
        location: z.string().optional(),
        start: z.string().optional(),
        end: z.string().optional(),
        description: z.array(z.string().optional()).optional().or(z.null()),
      })
    )
    .optional()
    .or(z.null()),
  skills: z
    .array(
      z.object({
        category: z.string().optional(),
        items: z.array(z.string().optional()).optional().or(z.null()),
      })
    )
    .optional()
    .or(z.null()),
  projects: z
    .array(
      z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        technologies: z.array(z.string().optional()).optional().or(z.null()),
        link: z.string().optional(), // Removed URL validation to make it fully optional
      })
    )
    .optional()
    .or(z.null()),
  social: z
    .array(
      z.object({
        platform: z.string().optional(),
        url: z.string().optional(), // Removed URL validation to make it fully optional
      })
    )
    .optional()
    .or(z.null()),
});

export function ResumeForm({ data }) {
  const { resumeData, updateResumeData } = useResumeContext();

  const [isSaved, setIsSaved] = useState(false);

  const [selectedProfileImage, setSelectedProfileImage] = useState(
    resumeData?.profileImage || data?.profileImage || null
  );

  const { uploading, uploadFile } = useFileUpload();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      const uploadedUrl = await uploadFile(selectedFile);
      setSelectedProfileImage(uploadedUrl);
      console.log("Uploaded File URL:", uploadedUrl);
    } catch (error) {
      console.error("Failed to upload file:", error.message);
      toast.error("Failed to upload image");
    }
  };

  const handleProfileImageChange = async (e) => {
    await handleFileChange(e);
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      profileImage: resumeData?.profileImage || data?.profileImage || "",
      name: resumeData?.name || data?.name || "",
      title: resumeData?.title || data?.title || "",
      email: resumeData?.email || data?.email || "",
      phone: resumeData?.phone || data?.phone || "",
      location: resumeData?.location || data?.location || "",
      about: resumeData?.about || data?.about || "",
      education: resumeData?.education?.length
        ? resumeData.education
        : data?.education?.length
        ? data.education
        : [{ school: "", degree: "", field: "", start: "", end: "" }],
      experience: resumeData?.experience?.length
        ? resumeData.experience
        : data?.experience?.length
        ? data.experience
        : [
            {
              company: "",
              title: "",
              location: "",
              start: "",
              end: "",
              description: [""],
            },
          ],
      skills: resumeData?.skills?.length
        ? resumeData.skills
        : data?.skills?.length
        ? data.skills
        : [{ category: "", items: [""] }],
      projects: resumeData?.projects?.length
        ? resumeData.projects
        : data?.projects?.length
        ? data.projects
        : [{ name: "", description: "", technologies: [""], link: "" }],
      social: resumeData?.social?.length
        ? resumeData.social
        : data?.social?.length
        ? data.social
        : [{ platform: "", url: "" }],
    },
  });

  const onSubmit = (data) => {
    console.log("resume data", data);

    // Ensure arrays are initialized properly
    const formattedData = {
      ...data,
      profileImage: selectedProfileImage,
      education: data.education || [],
      experience: data.experience || [],
      skills: data.skills || [],
      projects: data.projects || [],
      social: data.social || [],
    };

    // Update resume data in context
    updateResumeData(formattedData);

    // Show success feedback
    setIsSaved(true);
    toast.success("Resume data saved successfully!");
  };

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control: form.control, name: "education" });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({ control: form.control, name: "experience" });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control: form.control, name: "skills" });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control: form.control, name: "projects" });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({ control: form.control, name: "social" });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-[#1C9AAF]">
            Personal Information
          </h2>

          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload profile image"
                    onChange={(e) => {
                      field.onChange(e);
                      handleProfileImageChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  {selectedProfileImage ? (
                    <div className="mt-2">
                      <img
                        src={selectedProfileImage}
                        alt="Profile preview"
                        className="w-16 h-16 rounded-full object-cover border"
                      />
                    </div>
                  ) : (
                    "Upload your profile image"
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
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
                  <FormLabel>Professional Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="San Francisco, CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>About Me</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a brief introduction about yourself..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#1C9AAF]">Education</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendEducation({
                  school: "",
                  degree: "",
                  field: "",
                  start: "",
                  end: "",
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Education
            </Button>
          </div>

          {educationFields.map((field, index) => (
            <div key={field.id} className="border rounded-md p-4 mb-4 relative">
              <div className="absolute top-2 right-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  disabled={educationFields.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name={`education.${index}.school`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School/University</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="University of California, Berkeley"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="Bachelor of Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.field`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field of Study</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name={`education.${index}.start`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Year</FormLabel>
                        <FormControl>
                          <Input placeholder="2020" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`education.${index}.end`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Year</FormLabel>
                        <FormControl>
                          <Input placeholder="2024" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#1C9AAF]">
              Work Experience
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendExperience({
                  company: "",
                  title: "",
                  location: "",
                  start: "",
                  end: "",
                  description: [""],
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Experience
            </Button>
          </div>

          {experienceFields.map((field, index) => (
            <div key={field.id} className="border rounded-md p-4 mb-4 relative">
              <div className="absolute top-2 right-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(index)}
                  disabled={experienceFields.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`experience.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Tech Startup Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Software Engineering Intern"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.location`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Remote" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name={`experience.${index}.start`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input placeholder="Jun 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`experience.${index}.end`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input placeholder="Aug 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="text-sm font-medium">
                    Responsibilities/Achievements
                  </FormLabel>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const currentDesc =
                        form.getValues(`experience.${index}.description`) || [];
                      form.setValue(`experience.${index}.description`, [
                        ...currentDesc,
                        "",
                      ]);
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Point
                  </Button>
                </div>

                {form
                  .watch(`experience.${index}.description`)
                  ?.map((_, descIndex) => (
                    <div
                      key={`exp-desc-${index}-${descIndex}`}
                      className="flex items-center mb-2"
                    >
                      <FormField
                        control={form.control}
                        name={`experience.${index}.description.${descIndex}`}
                        render={({ field }) => (
                          <FormItem className="flex-1 mr-2">
                            <FormControl>
                              <Input
                                placeholder="Developed and maintained features..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const currentDesc = form.getValues(
                            `experience.${index}.description`
                          );
                          if (currentDesc.length > 1) {
                            const newDesc = [...currentDesc];
                            newDesc.splice(descIndex, 1);
                            form.setValue(
                              `experience.${index}.description`,
                              newDesc
                            );
                          }
                        }}
                        disabled={
                          form.watch(`experience.${index}.description`)
                            ?.length <= 1
                        }
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#1C9AAF]">Skills</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSkill({ category: "", items: [""] })}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Skill Category
            </Button>
          </div>

          {skillFields.map((field, index) => (
            <div key={field.id} className="border rounded-md p-4 mb-4 relative">
              <div className="absolute top-2 right-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(index)}
                  disabled={skillFields.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <FormField
                control={form.control}
                name={`skills.${index}.category`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Programming Languages" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="text-sm font-medium">Skills</FormLabel>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const currentItems =
                        form.getValues(`skills.${index}.items`) || [];
                      form.setValue(`skills.${index}.items`, [
                        ...currentItems,
                        "",
                      ]);
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Skill
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {form.watch(`skills.${index}.items`)?.map((_, itemIndex) => (
                    <div
                      key={`skill-item-${index}-${itemIndex}`}
                      className="flex items-center"
                    >
                      <FormField
                        control={form.control}
                        name={`skills.${index}.items.${itemIndex}`}
                        render={({ field }) => (
                          <FormItem className="flex-1 mr-2">
                            <FormControl>
                              <Input placeholder="JavaScript" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const currentItems = form.getValues(
                            `skills.${index}.items`
                          );
                          if (currentItems.length > 1) {
                            const newItems = [...currentItems];
                            newItems.splice(itemIndex, 1);
                            form.setValue(`skills.${index}.items`, newItems);
                          }
                        }}
                        disabled={
                          form.watch(`skills.${index}.items`)?.length <= 1
                        }
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#1C9AAF]">Projects</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendProject({
                  name: "",
                  description: "",
                  technologies: [""],
                  link: "",
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Project
            </Button>
          </div>

          {projectFields.map((field, index) => (
            <div key={field.id} className="border rounded-md p-4 mb-4 relative">
              <div className="absolute top-2 right-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(index)}
                  disabled={projectFields.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name={`projects.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Student Portfolio Platform"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`projects.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A web platform for students to showcase their projects..."
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`projects.${index}.link`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username/project"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-sm font-medium">
                      Technologies Used
                    </FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const currentTech =
                          form.getValues(`projects.${index}.technologies`) ||
                          [];
                        form.setValue(`projects.${index}.technologies`, [
                          ...currentTech,
                          "",
                        ]);
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Technology
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {form
                      .watch(`projects.${index}.technologies`)
                      ?.map((_, techIndex) => (
                        <div
                          key={`tech-${index}-${techIndex}`}
                          className="flex items-center"
                        >
                          <FormField
                            control={form.control}
                            name={`projects.${index}.technologies.${techIndex}`}
                            render={({ field }) => (
                              <FormItem className="flex-1 mr-2">
                                <FormControl>
                                  <Input placeholder="React" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const currentTech = form.getValues(
                                `projects.${index}.technologies`
                              );
                              if (currentTech.length > 1) {
                                const newTech = [...currentTech];
                                newTech.splice(techIndex, 1);
                                form.setValue(
                                  `projects.${index}.technologies`,
                                  newTech
                                );
                              }
                            }}
                            disabled={
                              form.watch(`projects.${index}.technologies`)
                                ?.length <= 1
                            }
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#1C9AAF]">Social Links</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSocial({ platform: "", url: "" })}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Social Link
            </Button>
          </div>

          {socialFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end"
            >
              <FormField
                control={form.control}
                name={`social.${index}.platform`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <FormControl>
                      <Input placeholder="GitHub" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`social.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mb-1"
                  onClick={() => removeSocial(index)}
                  disabled={socialFields.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end items-center gap-2 mt-8">
          <Button
            type="submit"
            className="px-6 py-2 bg-[#1C9AAF] hover:bg-[#157A8C]"
          >
            Save Resume
          </Button>
          {isSaved && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>Resume saved successfully!</span>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}

export default ResumeForm;
