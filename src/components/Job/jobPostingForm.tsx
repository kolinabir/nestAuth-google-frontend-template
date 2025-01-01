'use client'
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { postJob } from '@/redux/jobSlice';

const formSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  companyName: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  EmploymentType: z.enum(["Full Time",
  "Part Time",
  "Contract",
  "Internship",
  "Freelance"]),
  category: z.string().min(1, "Category is required"),
  experienceLevel: z.enum([ "Fresh Graduate",
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "1-2 Years",
    "2-3 Years",
    "3-4 Years",
    "3-5 Years",
    "6-9 Years"]),
  educationRequirement: z.enum([ "Any",
    "High School",
    "Diploma",
    "Bachelors",
    "Masters",
    "PhD"]),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  deadline: z.string().min(1, "Deadline is required"),
  contactEmail: z.string().email("Invalid email address"),
  companyWebsite: z.string().url("Invalid URL"),
  applicationProcess: z.string().min(1, "Application process is required"),
  workSchedule: z.string().min(1, "Work schedule is required"),
  tags: z.array(z.string()),
});



const JobPostingForm = () => {
  const { isAuthenticated, user,token } = useSelector(
    (state: RootState) => state.auth
  );


  const jwtToken=user?.data?.token


  const dispatch=useDispatch<AppDispatch>()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      description: "",
      companyName: "",
      location: "",
      EmploymentType: "Full-Time",
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

  const onSubmit =async (data) => {
    console.log(data);
   

  await dispatch(postJob({jobsData:data,token:jwtToken})).then(() => {
       console.log("dispatched");
   })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Senior Software Engineer" {...field} />
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
                <Textarea placeholder="Job description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Tech Innovators" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
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

        <FormField
          control={form.control}
          name="EmploymentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Full Time">Full Time</SelectItem>
                  <SelectItem value="Part Time">Part Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Software Development" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experienceLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Fresh Graduate">Fresh Graduate</SelectItem>
                  <SelectItem value="Entry Level">Entry Level</SelectItem>
                  <SelectItem value="Mid Level">Mid Level</SelectItem>
                  <SelectItem value="Senior Level">Senior Level</SelectItem>
                  <SelectItem value="1-2 Years">1-2 Years</SelectItem>
                  <SelectItem value="2-3 Years">2-3 Years</SelectItem>
                  <SelectItem value="3-4 Years">3-4 Years</SelectItem>
                  <SelectItem value="3-5 Years">3-5 Years</SelectItem>
                  <SelectItem value="6-9 Years">6-9 Years</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="educationRequirement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education Requirement</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education requirement" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Any">Any</SelectItem>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Bachelors">Bachelors</SelectItem>
                  <SelectItem value="Masters">Masters</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>

                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="JavaScript, Node.js, React, MongoDB" {...field} onChange={(e) => field.onChange(e.target.value.split(',').map(skill => skill.trim()))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Deadline</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="hr@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Website</FormLabel>
              <FormControl>
                <Input placeholder="https://www.company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="applicationProcess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Process</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Apply On Website" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="On this website">On this website</SelectItem>
                  <SelectItem value="On company website">On company website</SelectItem>
                  <SelectItem value="Via email">Via email</SelectItem>
                  <SelectItem value="Direct in person">Direct in person</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>

                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workSchedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Schedule</FormLabel>
              <FormControl>
                <Input placeholder="Monday to Friday, 9 am to 5 pm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="software, engineering, senior" {...field} onChange={(e) => field.onChange(e.target.value.split(',').map(tag => tag.trim()))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit Job Posting</Button>
      </form>
    </Form>
  );
};

export default JobPostingForm;