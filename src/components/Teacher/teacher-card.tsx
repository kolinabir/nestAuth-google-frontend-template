
import Link from "next/link";
import { Star, Users, Briefcase, GraduationCap, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TypeTeacher } from "@/lib/types";



export function TeacherCard({ teacher }: {teacher:TypeTeacher}) {

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="border-b bg-muted/40 p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={teacher.picture} alt={teacher.name} />
            <AvatarFallback>
              {teacher.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold leading-none">
              {teacher.name}
            </h3>
            <p className="text-sm font-medium text-muted-foreground">
              {teacher.designation}
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>{teacher.department}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="w-fit">
            <GraduationCap className="mr-1 h-3 w-3" />
            {teacher.Faculty}
          </Badge>
          <Badge variant="outline" className="w-fit">
            <Mail className="mr-1 h-3 w-3" />
            {teacher.email}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="text-2xl font-semibold">
              {teacher.totalScore}
            </span>
            <span className="text-sm text-muted-foreground">/ 65</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {teacher.reviewCount} review{teacher.reviewCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <Progress value={teacher.totalScore * 20} className="h-2 w-full" />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center justify-between">
                <span>Subject Knowledge</span>
                <span className="font-medium">
                  {teacher.avgReview.subjectKnowledge}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Average rating for subject knowledge</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center justify-between">
                <span>Communication</span>
                <span className="font-medium">
                  {teacher.avgReview.clarityAndCommunication}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Average rating for clarity and communication</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center justify-between">
                <span>Engagement</span>
                <span className="font-medium">
                  {teacher.avgReview.studentEngagement}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Average rating for student engagement</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-muted/40 p-4">
        <Link href={`/teacher/${teacher._id}`} passHref>
          <Button variant="outline">View Profile</Button>
        </Link>
        <Link href={`/teacher/addReview/${teacher._id}`} passHref>
          <Button>Add Review</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
