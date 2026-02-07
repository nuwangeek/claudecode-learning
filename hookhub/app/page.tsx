import { Header } from "@/components/Header";
import { HookBrowser } from "@/components/HookBrowser";
import { Footer } from "@/components/Footer";
import { hooks } from "@/lib/data/hooks";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <HookBrowser hooks={hooks} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
