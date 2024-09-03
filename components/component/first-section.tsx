"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { REGIONS } from "@/lib/constants";

const surveySchema = z.object({
  clientType: z.string().min(1, "Client type is required"),
  gender: z.string().min(1, "Gender is required"),
  age: z.string().min(1, "Age is required"),
  region: z.string().min(1, "Region is required"),
  serviceAvailed: z.string().min(1, "Service availed is required"),
});

type SurveySchema = z.infer<typeof surveySchema>;

interface FirstSectionProps {
  onResponse: (updateFn: (prev: any) => any) => void;
  onSection: (section: number) => void;
}

const SELECT_OPTIONS = {
  clientType: [
    { value: "citizen", label: "Citizen" },
    { value: "business", label: "Business" },
    { value: "government", label: "Government" },
  ],
  gender: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ],
};

const SelectField: React.FC<{
  name: keyof SurveySchema;
  placeholder: string;
  options: { value: string; label: string }[];
  setValue: (name: keyof SurveySchema, value: string) => void;
}> = ({ name, placeholder, options, setValue }) => (
  <Select onValueChange={(value) => setValue(name, value)}>
    <SelectTrigger className="bg-blue-100 text-blue-900">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map(({ value, label }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export function FirstSection({ onResponse, onSection }: FirstSectionProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<SurveySchema>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SurveySchema> = (firstSection) => {
    onResponse((prev) => ({ ...prev, firstSection }));
    onSection(2);
  };

  return (
    <div className="flex flex-col h-screen bg-blue-50">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 space-y-6 bg-blue-100">
          <h2 className="text-2xl font-bold text-blue-900">Survey</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <SelectField
              name="clientType"
              placeholder="Client Type"
              options={SELECT_OPTIONS.clientType}
              setValue={setValue}
            />

            <SelectField
              name="gender"
              placeholder="Gender"
              options={SELECT_OPTIONS.gender}
              setValue={setValue}
            />

            <div className="grid gap-2">
              <Label htmlFor="age" className="text-blue-900">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                className="bg-blue-100 text-blue-900"
                {...register("age")}
              />
            </div>

            <SelectField
              name="region"
              placeholder="Region of Residence"
              options={REGIONS.map((region) => ({
                value: region,
                label: region,
              }))}
              setValue={setValue}
            />

            <div className="grid gap-2">
              <Label htmlFor="service" className="text-blue-900">
                Service Availed
              </Label>
              <Input
                id="service"
                type="text"
                placeholder="Enter the service availed"
                className="bg-blue-100 text-blue-900"
                {...register("serviceAvailed")}
              />
            </div>

            <Button
              type="submit"
              disabled={!isValid}
              className="w-full bg-blue-900 text-white"
            >
              Proceed
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
