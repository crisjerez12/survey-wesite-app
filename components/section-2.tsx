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

export function Section2() {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Customer Awareness Survey</CardTitle>
        <CardDescription>
          Please answer the following questions about your awareness and
          perception of the credit card (CC) in this office.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="cc1">
            Which of the following best describes your awareness of a CC?
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">
                I know what a CC is and I saw this office&apos;s CC.
              </SelectItem>
              <SelectItem value="2">
                I know what a CC is but I did NOT see this office&apos;s CC.
              </SelectItem>
              <SelectItem value="3">
                I learned of the CC only when I saw this office&apos;s CC.
              </SelectItem>
              <SelectItem value="4">
                I do not know what a CC is and I did not see one in this office.
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cc2">
            If aware of CC (answered 1-3 in CC1), would you say that the CC of
            this office was...?
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Easy to see</SelectItem>
              <SelectItem value="2">Somewhat easy to see</SelectItem>
              <SelectItem value="3">Difficult to see</SelectItem>
              <SelectItem value="4">Not visible at all</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cc3">
            If aware of CC (answered codes 1-3 in CC1), how much did the CC help
            you in your transaction?
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Helped very much</SelectItem>
              <SelectItem value="2">Somewhat helped</SelectItem>
              <SelectItem value="3">Did not help</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">Submit</Button>
      </CardFooter>
    </Card>
  );
}
