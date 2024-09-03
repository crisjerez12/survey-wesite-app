"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
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

interface OptionButtonProps {
  option: string;
  isSelected: boolean;
  onClick: () => void;
}
interface ThirdSectionProps {
  onSection: (section: number) => void;
  onResponse: (updateFn: (prev: any) => any) => void;
}

const OPTIONS = [
  "Strongly-Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly-Disagree",
];

const OptionButton: React.FC<OptionButtonProps> = memo(function OptionButton({
  option,
  isSelected,
  onClick,
}) {
  return (
    <Button
      onClick={onClick}
      className={`${
        isSelected ? "bg-blue-900 text-white" : "bg-blue-100 text-blue-900"
      } capitalize`}
    >
      {option}
    </Button>
  );
});
export function ThirdSection({ onSection, onResponse }: ThirdSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState(QUESTIONS);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleNextQuestion = useCallback(
    (item: string) => {
      if (isProcessing) return;

      setIsProcessing(true);
      setSelectedOption(item);

      setTimeout(() => {
        setSelectedOptions((prev) => {
          const updated = [...prev];
          updated[currentQuestion].response = item;
          return updated;
        });

        if (currentQuestion < QUESTIONS.length - 1) {
          setTimeout(() => {
            setCurrentQuestion((prev) => prev + 1);
            setSelectedOption(null);
            setIsProcessing(false);
          }, 300); // Delay before moving to next question
        } else {
          setIsProcessing(false);
        }
      }, 500); // Delay to show selection
    },
    [currentQuestion, isProcessing]
  );

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestion === 0) onSection(2);
    else setCurrentQuestion((prev) => prev - 1);
  }, [currentQuestion, onSection]);

  const handleSubmit = useCallback(() => {
    onResponse((prev: any) => ({
      ...prev,
      thirdSection: selectedOptions,
    }));
    onSection(4);
  }, [onResponse, onSection, selectedOptions]);

  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

  const currentQuestionData = useMemo(
    () => QUESTIONS[currentQuestion],
    [currentQuestion]
  );

  return (
    <div className="flex flex-col h-screen bg-blue-50">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">{`${currentQuestionData.order}: ${currentQuestionData.question}`}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {OPTIONS.map((option) => (
              <OptionButton
                key={option}
                option={option}
                isSelected={selectedOption === option}
                onClick={() => handleNextQuestion(option)}
              />
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={isProcessing}
              className="text-blue-900 border-blue-900"
            >
              Previous
            </Button>
            {isLastQuestion && selectedOption ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="inline-flex bg-blue-900 px-4 py-2 text-sm font-medium text-white rounded-lg"
                    disabled={isProcessing}
                  >
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
                    <Button onClick={handleSubmit}>Submit</Button>
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
