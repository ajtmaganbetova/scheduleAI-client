"use client";
import { useState } from "react";
import Link from "next/link";
import { MountainIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LandingPage = () => {
  const [courseAbbr, setCourseAbbr] = useState("");
  const [semester, setSemester] = useState("");

  const handleSendPrompt = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Store input data in localStorage
    localStorage.setItem("courseAbbr", courseAbbr);
    localStorage.setItem("semester", semester);

    // Redirect to builder page
    window.location.href = "/builder";
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
          <form className="flex items-center gap-2" onSubmit={handleSendPrompt}>
            <Input
              value={courseAbbr}
              placeholder="Course abbreviation (e.g. CSCI 152)"
              className="flex-1 rounded-md px-4 py-2 border border-input focus:border-primary focus:ring-1 focus:ring-primary"
              onChange={(e) => setCourseAbbr(e.target.value)}
            />
            <Input
              value={semester}
              placeholder="Term (e.g. Summer 2024)"
              className="flex-1 rounded-md px-4 py-2 border border-input focus:border-primary focus:ring-1 focus:ring-primary"
              onChange={(e) => setSemester(e.target.value)}
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
