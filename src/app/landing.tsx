"use client";

import { useState } from "react";
import Link from "next/link";
import { MountainIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { MultiValue } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

const courseOptions: OptionType[] = [
  { value: "CSCI 152", label: "CSCI 152" },
  { value: "MATH 162", label: "MATH 162" },
  { value: "PHYS 162", label: "PHYS 162" },
];

const semesterOptions: OptionType[] = [
  { value: "Spring 2024", label: "Spring 2024" },
  { value: "Summer 2024", label: "Summer 2024" },
  { value: "Fall 2024", label: "Fall 2024" },
];

const LandingPage: React.FC = () => {
  const [selectedCourses, setSelectedCourses] = useState<
    MultiValue<OptionType>
  >([]);
  const [selectedSemester, setSelectedSemester] = useState<OptionType | null>(
    null
  );
  const router = useRouter();

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();

    // Extract values from selectedCourses and selectedSemester
    const courseAbbr = selectedCourses.map((course) => course.value);
    const semesterValue = selectedSemester ? selectedSemester.value : "";

    // Store the extracted values in localStorage
    localStorage.setItem("courseAbbr", JSON.stringify(courseAbbr)); // Store as JSON string
    localStorage.setItem("semester", semesterValue);

    router.push("/builder");
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <Link href="#" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">AI Generator</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            className="whitespace-nowrap rounded-md bg-black text-white"
          >
            <Link href={"#"} prefetch={false}>
              Sign in via Registrar
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center flex-1 px-4 md:px-6">
        <div className="space-y-8 text-center">
          <h2 className="text-5xl font-bold">
            Plan your semester{" "}
            <span className="block">effortlessly with SchedulAI</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Input your prompt and let an AI generate a schedule for you
          </p>
        </div>

        <div className="max-w-2xl w-full mt-8">
          <form className="flex flex-col gap-4" onSubmit={handleSendPrompt}>
            <Select
              isMulti
              options={courseOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={selectedCourses}
              onChange={(selected) => setSelectedCourses(selected)}
              placeholder="Select courses"
            />
            <Select
              options={semesterOptions}
              className="basic-single"
              classNamePrefix="select"
              value={selectedSemester}
              onChange={(selected) => setSelectedSemester(selected)}
              placeholder="Select semester"
            />
            <Button
              type="submit"
              className="whitespace-nowrap rounded-md bg-black text-white"
            >
              Generate
            </Button>
          </form>
        </div>
      </div>
      <footer className="bg-muted p-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; Dilnaz Aitmaganbetova. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
