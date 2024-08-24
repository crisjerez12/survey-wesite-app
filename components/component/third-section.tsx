"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { QUESTIONS } from "@/lib/constants";
import { useState } from "react";

// Define the type for a single question
type Question = {
  order: number;
  question: string;
  response?: string; // Optional because it may not be filled initially
};

// Define the type for the props
interface ThirdSectionProps {
  onSection: (section: number) => void;
}

export function ThirdSection({ onSection }: ThirdSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState(QUESTIONS);
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Track the selected option
  console.log(selectedOptions);
  const handleNextQuestion = (item: string) => {
    setSelectedOption(item); // Update the selected option

    // Delay the state update and question navigation by 0.2 seconds
    setTimeout(() => {
      setSelectedOptions((prev) => {
        const updated = [...prev];
        updated[currentQuestion].response = item;
        return updated;
      });
      setTimeout(() => {
        if (currentQuestion < QUESTIONS.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedOption(null); // Update the selected option
        }
      }, 500);
    }, 200);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) onSection(1);
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{`${QUESTIONS[currentQuestion].order}: ${QUESTIONS[currentQuestion].question}`}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {[
              "Strongly-Agree",
              "Agree",
              "Neutral",
              "Disagree",
              "Strongly-Disagree",
            ].map((optionItem) => (
              <Button
                key={optionItem}
                onClick={() => handleNextQuestion(optionItem)}
                className={`${
                  selectedOption === optionItem ? "bg-black" : ""
                } capitalize`}
              >
                {optionItem}
              </Button>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousQuestion}>
              Previous
            </Button>
            {currentQuestion === QUESTIONS.length - 1 && selectedOption ? (
              <Dialog>
                <DialogTrigger>
                  <Button className="inline-flex bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 rounded-lg">
                    Submit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      We will submit your response.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-between">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Go Back
                      </Button>
                    </DialogClose>
                    <Button onClick={() => onSection(4)}>Submit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <Button disabled>Submit</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
