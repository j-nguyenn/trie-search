import SearchBar from "@/components/search-bar";
import raw from './utils/corpus.txt';

const getCorpus = async (): Promise<string[]> => {
  try {
    return raw.split('\n')
  }
  catch (error) {
    console.error(error);
    return [];
  }

}
export default async function Home() {
  const corpus = await getCorpus();

  return (
    <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-[500px]">
          <SearchBar corpus={corpus} />
        </div>
      </main>
    </div>
  );
}
