"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SurveyState {
  first: string;
  second: string;
  third: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

interface SecondSectionProps {
  onSection: (section: number) => void;
  onResponse: (updateFn: (prev: any) => any) => void;
}

const INITIAL_STATE: SurveyState = { first: "0", second: "0", third: "0" };

const SELECT_OPTIONS: Record<keyof SurveyState, SelectOption[]> = {
  first: [
    {
      value: "1",
      label: "I know what a CC is and I saw this office's CC.",
    },
    {
      value: "2",
      label: "I know what a CC is but I did NOT see this office's CC.",
    },
    {
      value: "3",
      label: "I learned of the CC only when I saw this office's CC.",
    },
    {
      value: "4",
      label: "I do not know what a CC is and I did not see one in this office.",
    },
  ],
  second: [
    { value: "1", label: "Easy to see" },
    { value: "2", label: "Somewhat easy to see" },
    { value: "3", label: "Difficult to see" },
    { value: "4", label: "Not visible at all" },
    { value: "5", label: "N/A" },
  ],
  third: [
    { value: "1", label: "Helped very much" },
    { value: "2", label: "Somewhat helped" },
    { value: "3", label: "Did not help" },
    { value: "4", label: "N/A" },
  ],
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
}) => (
  <div className="space-y-2">
    <Label className="text-blue-900">{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-blue-100 text-blue-900">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-w-sm ">
        <SelectItem disabled value="0">
          Select an option
        </SelectItem>
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export const SecondSection: React.FC<SecondSectionProps> = ({
  onSection,
  onResponse,
}) => {
  const [state, setState] = useState<SurveyState>(INITIAL_STATE);

  const handleChange = (field: keyof SurveyState) => (value: string) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const isResponseValid =
    state.first === "4" || Object.values(state).every((val) => val !== "0");

  const handleSubmit = () => {
    onResponse((prev) => ({ ...prev, secondSection: state }));
    onSection(3);
  };

  return (
    <div className="flex flex-col h-screen bg-blue-50">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="mx-auto md:max-w-md max-w-sm p-2 md:p-0 bg-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">
              Customer Awareness Survey
            </CardTitle>
            <CardDescription className="text-blue-700">
              Please answer the following questions about your awareness and
              perception of the Citizen&apos;s Charter(CC) in this office.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <SelectField
              label="Which of the following best describes your awareness of a CC?"
              value={state.first}
              onChange={handleChange("first")}
              options={SELECT_OPTIONS.first}
            />
            {state.first !== "4" && (
              <>
                <SelectField
                  label="If aware of CC (answered 1-3 in CC1), would you say that the CC of this office was...?"
                  value={state.second}
                  onChange={handleChange("second")}
                  options={SELECT_OPTIONS.second}
                />
                <SelectField
                  label="If aware of CC (answered codes 1-3 in CC1), how much did the CC help you in your transaction?"
                  value={state.third}
                  onChange={handleChange("third")}
                  options={SELECT_OPTIONS.third}
                />
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => onSection(1)}
              className="text-blue-900 border-blue-900"
            >
              Previous
            </Button>
            <Button
              disabled={!isResponseValid}
              onClick={handleSubmit}
              className="bg-blue-900 text-white"
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
