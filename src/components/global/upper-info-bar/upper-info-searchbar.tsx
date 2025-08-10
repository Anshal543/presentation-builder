// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";

// const SearchBar = () => {
//   return (
//     <div className="min-w-[55%] relative flex items-center border rounded-full bg-primary-90">
//       <Button
//         type="submit"
//         size="sm"
//         variant="ghost"
//         className="absolute left-0 h-full rounded-l-none bg-transparent hover:bg-transparent"
//       >
//         <Search className="h-4 w-4" />
//         <span className="sr-only">Search</span>
//       </Button>
//       <Input
//         type="text"
//         placeholder="Search by title"
//         className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 ml-6"
//       />
//     </div>
//   );
// };

// export default SearchBar;


"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("title") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("title", value);
    } else {
      params.delete("title");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="min-w-[55%] relative flex items-center border rounded-full bg-primary-90"
    >
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className="absolute left-0 h-full rounded-l-none bg-transparent hover:bg-transparent"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
      <Input
        type="text"
        placeholder="Search by title"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 ml-6"
      />
    </form>
  );
};

export default SearchBar;

