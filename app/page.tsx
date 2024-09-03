"use client";
import { FirstSection } from "@/components/component/first-section";
import { FourthSection } from "@/components/component/fourth-section";
import { SecondSection } from "@/components/component/second-section";
import { ThirdSection } from "@/components/component/third-section";
import { useState, useEffect, useCallback } from "react";

interface ResponseData {
  [key: string]: any;
}

const submitResponse = async (data: ResponseData) => {
  try {
    const res = await fetch("/api/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default function Home() {
  const [section, setSection] = useState<number>(1);
  const [response, setResponse] = useState<ResponseData>({});

  useEffect(() => {
    const storedResponse = localStorage.getItem("response");
    if (storedResponse) {
      setResponse(JSON.parse(storedResponse));
      setSection(4);
    }
  }, []);

  const handleResponseSubmission = useCallback(async () => {
    if (section === 4 && Object.keys(response).length > 0) {
      try {
        await submitResponse(response);
        localStorage.setItem("response", JSON.stringify(response));
      } catch (error) {
        console.error("Failed to submit response:", error);
      }
    }
  }, [section, response]);

  useEffect(() => {
    handleResponseSubmission();
  }, [handleResponseSubmission]);

  const handleResponse = useCallback((newResponse: ResponseData) => {
    setResponse((prevResponse) => ({ ...prevResponse, ...newResponse }));
  }, []);

  const handleSection = useCallback((newSection: number) => {
    setSection(newSection);
  }, []);

  return (
    <main>
      {section === 1 && (
        <FirstSection onResponse={handleResponse} onSection={handleSection} />
      )}
      {section === 2 && (
        <SecondSection onResponse={handleResponse} onSection={handleSection} />
      )}
      {section === 3 && (
        <ThirdSection onResponse={handleResponse} onSection={handleSection} />
      )}
      {section === 4 && <FourthSection />}
    </main>
  );
}
