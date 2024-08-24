"use client";
import { FirstSection } from "@/components/component/first-section";
import { FourthSection } from "@/components/component/fourth-section";
import { SecondSection } from "@/components/component/second-section";
import { ThirdSection } from "@/components/component/third-section";
import { useState } from "react";

export default function Home() {
  const [section, setSection] = useState(1);

  return (
    <main>
      {section === 1 && <FirstSection onSection={setSection} />}
      {section === 2 && <SecondSection onSection={setSection} />}
      {section === 3 && <ThirdSection onSection={setSection} />}
      {section === 4 && <FourthSection />}
    </main>
  );
}
