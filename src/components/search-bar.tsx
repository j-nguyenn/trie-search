"use client"

import { TrieTree } from "@/app/utils/trie-tree";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Separator } from "./ui/separator";


export default function SearchBar({ corpus }: { corpus: string[] }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTree, setSearchTree] = useState(new TrieTree(corpus));


  useEffect(() => {
    if (corpus.length > 0) {
      setSearchTree(new TrieTree(corpus));
    }
  }, [corpus]);

  useEffect(() => {
    if (searchTerm.length > 2) {
      searchTree.insert(searchTerm);
    }
  }, [searchTerm, searchTree]);


  const searchResults = useMemo(() => {

    if (searchTerm.length > 0) {
      return searchTree.complete(searchTerm);
    }
    return [];
  }, [searchTerm, searchTree]);

  return (
    <div>
      <div className="flex items-center">
        <Search className="pr-2"></Search>
        <Input
          placeholder="Search ..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}>
        </Input>
      </div>
      {searchResults.length > 0 ? (
        <ul className="flex flex-col list-none p-3">
          {searchResults.map((result, i) => {
            return (
              <li key={i} className="mt-2">
                <Separator />
                <a
                  href="#"
                  className="text-gray-800 flex items-center w-auto p-2 rounded-lg no-underline cursor-pointer transition-all duration-300 hover:bg-gray-200"
                >
                  {result}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
