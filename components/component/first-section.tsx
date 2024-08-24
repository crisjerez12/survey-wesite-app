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

export function FirstSection({ onSection }: any) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Survey</h2>
          </div>
          <div className="grid gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Client Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="citizen">Citizen</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="government">Government</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" placeholder="Enter your age" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Region of Residence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="region1">Region 1</SelectItem>
                <SelectItem value="region2">Region 2</SelectItem>
                <SelectItem value="region3">Region 3</SelectItem>
                <SelectItem value="region4">Region 4</SelectItem>
                <SelectItem value="region5">Region 5</SelectItem>
                <SelectItem value="region6">Region 6</SelectItem>
                <SelectItem value="region7">Region 7</SelectItem>
                <SelectItem value="region8">Region 8</SelectItem>
                <SelectItem value="region9">Region 9</SelectItem>
                <SelectItem value="region10">Region 10</SelectItem>
                <SelectItem value="region11">Region 11</SelectItem>
                <SelectItem value="region12">Region 12</SelectItem>
              </SelectContent>
            </Select>
            <div className="grid gap-2">
              <Label htmlFor="service">Service Availed</Label>
              <Input id="service" placeholder="Enter the service availed" />
            </div>
          </div>
          <Button className="w-full" onClick={() => onSection(2)}>
            Proceed
          </Button>
        </Card>
      </div>
    </div>
  );
}
