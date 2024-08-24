import Image from "next/image";

export function FourthSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mx-auto max-w-md text-center">
        <Image
          src="/thanks.png"
          width="300"
          height="200"
          alt="Thank you"
          className="mb-6 rounded-lg object-fill"
        />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Thank you for the response!
        </h1>
        <p className="mt-4 text-muted-foreground">
          We appreciate you taking the time to provide feedback. Your input
          helps us improve our service.
        </p>
      </div>
    </div>
  );
}
