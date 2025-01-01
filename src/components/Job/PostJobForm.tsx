"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast, Toaster } from "sonner";
import { AppDispatch, RootState } from "@/store/store";
import { postJob } from "@/store/api/jobSlice";

const formSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  companyName: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  EmploymentType: z.enum([
    "Full Time",
    "Part Time",
    "Contract",
    "Internship",
    "Freelance",
  ]),
  category: z.string().min(1, "Category is required"),
  experienceLevel: z.enum([
    "Fresh Graduate",
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "1-2 Years",
    "2-3 Years",
    "3-4 Years",
    "3-5 Years",
    "6-9 Years",
  ]),
  educationRequirement: z.enum([
    "Any",
    "High School",
    "Diploma",
    "Bachelors",
    "Masters",
    "PhD",
  ]),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  deadline: z.string().min(1, "Deadline is required"),
  contactEmail: z.string().email("Invalid email address"),
  companyWebsite: z.string().url("Invalid URL"),
  applicationProcess: z.string().min(1, "Application process is required"),
  workSchedule: z.string().min(1, "Work schedule is required"),
  tags: z.array(z.string()),
});

const JobPostingForm = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { error, isLoading } = useSelector((state: RootState) => state.jobs);
  const jwtToken = user?.data?.token;
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      description: "",
      companyName: "",
      location: "",
      EmploymentType: "Full Time",
      category: "",
      experienceLevel: "Entry Level",
      educationRequirement: "Bachelors",
      skills: [],
      deadline: "",
      contactEmail: "",
      companyWebsite: "",
      applicationProcess: "On this website",
      workSchedule: "",
      tags: [],
    },
  });

  const onSubmit = async (data) => {
    await dispatch(postJob({ jobsData: data, token: jwtToken }));
    try {
      const result = await dispatch(
        postJob({ jobsData: data, token: jwtToken })
      );

      if (postJob.fulfilled.match(result)) {
        toast.success("Job Posted Sucessfully!");
        setLoading(false);
      } else {
        toast.error(`${error?.error} access, please login!`);
      }
    } catch (error) {}
  };

  const renderFormField = (name: string, label: string, type = "text", options?: string[] | null) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {options ? (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === "textarea" ? (
              <Textarea
                placeholder={`Enter ${label.toLowerCase()}`}
                {...field}
              />
            ) : (
              <Input
                type={type}
                placeholder={`Enter ${label.toLowerCase()}`}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <Toaster />
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Job Details</TabsTrigger>
                <TabsTrigger value="company">Company Info</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                {renderFormField("jobTitle", "Job Title")}
                {renderFormField("description", "Description", "textarea")}
                {renderFormField("location", "Location")}
                {renderFormField(
                  "EmploymentType",
                  "Employment Type",
                  "select",
                  [
                    "Full Time",
                    "Part Time",
                    "Contract",
                    "Internship",
                    "Freelance",
                  ]
                )}
              </TabsContent>
              <TabsContent value="details" className="space-y-4">
                {renderFormField("category", "Category")}
                {renderFormField(
                  "experienceLevel",
                  "Experience Level",
                  "select",
                  [
                    "Fresh Graduate",
                    "Entry Level",
                    "Mid Level",
                    "Senior Level",
                    "1-2 Years",
                    "2-3 Years",
                    "3-4 Years",
                    "3-5 Years",
                    "6-9 Years",
                  ]
                )}
                {renderFormField(
                  "educationRequirement",
                  "Education Requirement",
                  "select",
                  [
                    "Any",
                    "High School",
                    "Diploma",
                    "Bachelors",
                    "Masters",
                    "PhD",
                  ]
                )}
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="JavaScript, Node.js, React, MongoDB"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                .split(",")
                                .map((skill) => skill.trim())
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {renderFormField(
                  "deadline",
                  "Application Deadline",
                  "datetime-local"
                )}
                {renderFormField("workSchedule", "Work Schedule")}
              </TabsContent>
              <TabsContent value="company" className="space-y-4">
                {renderFormField("companyName", "Company Name")}
                {renderFormField("contactEmail", "Contact Email", "email")}
                {renderFormField("companyWebsite", "Company Website", "url")}
                {renderFormField(
                  "applicationProcess",
                  "Application Process",
                  "select",
                  [
                    "On this website",
                    "On company website",
                    "Via email",
                    "Direct in person",
                    "Other",
                  ]
                )}
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="software, engineering, senior"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value.split(",").map((tag) => tag.trim())
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            {isLoading ? (
              <Button type="submit" className="w-full">
                Submitting Job Posting
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Submit Job Posting
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JobPostingForm;
