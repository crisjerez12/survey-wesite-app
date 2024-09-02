"use client";
import { FirstSection } from "@/components/component/first-section";
import { FourthSection } from "@/components/component/fourth-section";
import { SecondSection } from "@/components/component/second-section";
import { ThirdSection } from "@/components/component/third-section";
import { useState, useEffect } from "react";

async function submitResponse(data: any) {
  try {
    const res = await fetch("/api/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export default function Home() {
  const [section, setSection] = useState(1);
  const [response, setResponse] = useState<any>({});

  useEffect(() => {
    const value = localStorage.getItem("response");
    if (value) {
      setSection(4);
    }
  }, []);

  useEffect(() => {
    if (section === 4) {
      if (Object.keys(response).length > 0) {
        submitResponse(response);
        localStorage.setItem("response", JSON.stringify(response));
      }
    }
  }, [section, response]);

  return (
    <main>
      {section === 1 && (
        <FirstSection onResponse={setResponse} onSection={setSection} />
      )}
      {section === 2 && (
        <SecondSection onResponse={setResponse} onSection={setSection} />
      )}
      {section === 3 && (
        <ThirdSection onResponse={setResponse} onSection={setSection} />
      )}
      {section === 4 && <FourthSection />}
    </main>
  );
}
