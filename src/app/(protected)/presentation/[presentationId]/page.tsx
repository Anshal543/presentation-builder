// "use client";
// import { getProjectById } from "@/actions/project";
// import { useToast } from "@/hooks/use-toast";
// import { themes } from "@/lib/constants";
// import { useSlideStore } from "@/store/useSlideStore";
// import { Loader2 } from "lucide-react";
// import { useTheme } from "next-themes";
// import { redirect, useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import Navbar from "./_components/Navbar/Navbar";
// import LayoutPreview from "./_components/editor-sidebar/leftsidebar/LayoutPreview";
// import Editor from "./_components/editor/Editor";
// import EditorSidebar from "./_components/editor-sidebar/rightsidebar";

// const Page = () => {
//   const params = useParams();
//   const { setTheme } = useTheme();
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(true);
//   const [imageLoading, setImageLoading] = useState(true);

//   const {
//     setSlides,
//     setProject,
//     currentTheme,
//     setCurrentTheme,
//     resetSlideStore,
//   } = useSlideStore();
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getProjectById(params.presentationId as string);
//         if (res.status !== 200 || !res.data) {
//           toast({
//             title: "Error",
//             description: "Unable to fetch project",
//             variant: "destructive",
//           });
//           redirect("/dashboard");
//         }
//         const findTheme = themes.find(
//           (theme) => theme.name === res.data.themeName
//         );
//         setCurrentTheme(findTheme || themes[0]);
//         setTheme(findTheme?.type === "dark" ? "dark" : "light");
//         setProject(res.data);
//         setSlides(JSON.parse(JSON.stringify(res.data.slides)));
//       } catch (error) {
//         console.error("Error fetching slides:", error);
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred",
//           variant: "destructive",
//         });
//         redirect("/dashboard");
//       } finally {
//         setIsLoading(false);
//         setImageLoading(false);
//       }
//     })();
//   }, []);
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="w-8 animate-spin text-primary" />
//       </div>
//     );
//   }
//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="min-h-screen flex flex-col">
//         <Navbar presentationId={params.presentationId as string} />

//         <div
//           className="flex-1 flex overflow-hidden pt-16"
//           style={{
//             color: currentTheme.accentColor,
//             fontFamily: currentTheme.fontFamily,
//             backgroundColor: currentTheme.backgroundColor,
//           }}
//         >
//           <LayoutPreview loading={isLoading} />
//           <div className="flex-1 ml-64 pr-16">
//             <Editor
//               isEditable={true}
//               loading={isLoading}
//               imageLoading={imageLoading}
//             />
//           </div>
//           <EditorSidebar />
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default Page;

"use client";
import React, { useEffect, useState } from "react";
import EditorSidebar from "./_components/editor-sidebar/rightsidebar";
import Editor from "./_components/editor/Editor";
import { useSlideStore } from "@/store/useSlideStore";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LayoutPreview from "./_components/editor-sidebar/leftsidebar/LayoutPreview";
import { redirect, useParams } from "next/navigation";
import { getProjectById, updateSlides } from "@/actions/project";
import { useToast } from "@/hooks/use-toast";
import Navbar from "./_components/Navbar/Navbar";
import { useTheme } from "next-themes";
import { themes } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { generateImages } from "@/actions/chatgpt";
import { Slide } from "@/lib/types";

const Page = () => {
  const {
    setSlides,
    setProject,
    currentTheme,
    setCurrentTheme,
    slides,
    resetSlideStore,
  } = useSlideStore();
  const { toast } = useToast();
  const params = useParams();
  const { setTheme } = useTheme();
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setImageLoading(true);
      try {
        const res = await getProjectById(params.presentationId as string);
        setPageLoading(false);
        if (res.status !== 200 || !res.data) {
          setProject(null);
          resetSlideStore();
          toast({
            title: "Error",
            description: "Unable to fetch project",
            variant: "destructive",
          });
          redirect("/dashboard");
        }
        const findTheme = themes.find(
          (theme) => theme.name === res.data.themeName
        );
        console.log("🟢 Theme:", res);
        setCurrentTheme(findTheme || themes[0]);
        setTheme(findTheme?.type === "dark" ? "dark" : "light");
        setProject(res.data);

        const slides = JSON.parse(JSON.stringify(res.data.slides));
        if (res.data.slides && slides.length > 0) {
          console.log("🟢 Setting slides");
          setSlides(slides);
        } else {
          await fetchSlides();
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
        redirect("/dashboard");
      } finally {
        setIsLoading(false);
        setImageLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.presentationId]);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/generateStreamLayouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: params.presentationId }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate slides");
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const cleanedBuffer = buffer
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        console.log("🟢 Buffer:", cleanedBuffer);

        try {
          // if (cleanedBuffer.startsWith("[") && cleanedBuffer.endsWith("]")) {
          const data = JSON.parse(cleanedBuffer);
          buffer = "";
          console.log("🟢 Data:", data);
          if (data?.error) {
            toast({
              title: "Error",
              description: "An unexpected error occurred",
              variant: "destructive",
            });
            redirect("/dashboard");
          }
          setSlides(data);
          console.log("🟢 Saving");
          setIsLoading(false);

          const updateSlide = await updateSlides(
            params.presentationId as string,
            JSON.parse(JSON.stringify(slides))
          );
          if (updateSlide.status === 200 && updateSlide.data) {
            setProject(updateSlide.data);
          }

          await fetchImages(data);
          // }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          if (cleanedBuffer.startsWith("[")) {
            try {
              const repaired = cleanedBuffer.replace(/,(\s*)?$/, "") + "]";
              const data = JSON.parse(repaired);
              setSlides(data);
              cleanedBuffer;
              console.log("🟢 repaired data:", data);
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (innerError) {
              // Wait for more data
              // const lastValidIndex = cleanedBuffer.lastIndexOf("}");
              // if (lastValidIndex !== -1) {
              //   try {
              //     const partial =
              //       cleanedBuffer.slice(0, lastValidIndex + 1) + "]";
              //     const data = JSON.parse(partial);
              //     console.log("🟢 partial data:", data);
              //     setSlides(data);
              //   } catch {
              //     // Wait for more data
              //   }
              // }
            }
          }
        }
      }
      // }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      redirect("/dashboard");
    }
  };

  // const fetchSlides = async () => {
  //   try {
  //     const response = await fetch("/api/generateStreamLayouts", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ projectId: params.presentationId }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to generate slides");
  //     }

  //     if (!response.body) throw new Error("No response body");

  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder("utf-8");
  //     let buffer = "";

  //     const allSlides: any[] = [];

  //     while (true) {
  //       const { value, done } = await reader.read();
  //       if (done) break;

  //       buffer += decoder.decode(value, { stream: true });

  //       // Split on newline, keeping the last partial JSON (if any)
  //       const lines = buffer.split("\n");
  //       buffer = lines.pop() || "";

  //       for (const line of lines) {
  //         const cleanedLine = line
  //           .replace(/```json/g, "")
  //           .replace(/```/g, "")
  //           .trim();

  //         if (!cleanedLine) continue;

  //         try {
  //           const data = JSON.parse(cleanedLine);
  //           console.log("🟢 Parsed slide:", data);
  //           allSlides.push(data);
  //           setSlides((prev) => [...prev, data]); // Show each slide as it arrives
  //         } catch (err) {
  //           console.error("🛑 JSON parse error:", cleanedLine, err);
  //           // Optionally keep trying on next chunk
  //         }
  //       }
  //     }

  //     // Done receiving slides
  //     console.log("✅ All slides received:", allSlides);

  //     setIsLoading(false);

  //     const updateSlide = await updateSlides(
  //       params.presentationId as string,
  //       allSlides
  //     );

  //     if (updateSlide.status === 200 && updateSlide.data) {
  //       setProject(updateSlide.data);
  //     }

  //     await fetchImages(allSlides);
  //   } catch (error) {
  //     console.error("❌ Error:", error);
  //     toast({
  //       title: "Error",
  //       description: "An unexpected error occurred",
  //       variant: "destructive",
  //     });
  //     redirect("/dashboard");
  //   }
  // };

  // const fetchSlides = async () => {
  //   try {
  //     const response = await fetch("/api/generateStreamLayouts", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ projectId: params.presentationId }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to generate slides");
  //     }

  //     if (!response.body) throw new Error("No response body");

  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder("utf-8");

  //     let buffer = "";
  //     const allSlides: Slide[] = [];

  //     while (true) {
  //       const { value, done } = await reader.read();
  //       if (done) break;

  //       buffer += decoder.decode(value, { stream: true });

  //       const lines = buffer.split("\n");
  //       buffer = lines.pop() || "";

  //       for (const line of lines) {
  //         if (!line.trim()) continue;

  //         try {
  //           const data = JSON.parse(line);
  //           console.log("🟢 New slide:", data);
  //           allSlides.push(data);
  //           setSlides([...slides, data]); // Live updates
  //         } catch (err) {
  //           console.error("❌ Failed to parse streamed slide:", line, err);
  //         }
  //       }
  //     }

  //     setIsLoading(false);

  //     const updateSlide = await updateSlides(
  //       params.presentationId as string,
  //       JSON.parse(JSON.stringify(allSlides))
  //     );

  //     if (updateSlide.status === 200 && updateSlide.data) {
  //       setProject(updateSlide.data);
  //     }

  //     await fetchImages(allSlides);
  //   } catch (error) {
  //     console.error("❌ Error:", error);
  //     toast({
  //       title: "Error",
  //       description: "An unexpected error occurred",
  //       variant: "destructive",
  //     });
  //     redirect("/dashboard");
  //   }
  // };

  // const fetchSlides = async () => {
  //   try {
  //     const response = await fetch("/api/generateStreamLayouts", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ projectId: params.presentationId }),
  //     });

  //     if (!response.ok || !response.body) {
  //       throw new Error("Failed to stream slides");
  //     }

  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder("utf-8");
  //     let buffer = "";
  //     const allSlides: any[] = [];

  //     while (true) {
  //       const { value, done } = await reader.read();
  //       if (done) break;

  //       buffer += decoder.decode(value, { stream: true });

  //       const lines = buffer.split("\n");
  //       buffer = lines.pop() || "";

  //       for (const line of lines) {
  //         const cleaned = line.trim();
  //         if (!cleaned) continue;

  //         try {
  //           const slide = JSON.parse(cleaned);
  //           console.log("🟢 New slide:", slide);
  //           allSlides.push(slide);
  //           setSlides((prev) => [...prev, slide]);
  //         } catch (err) {
  //           console.error("❌ Parse error:", cleaned);
  //         }
  //       }
  //     }

  //     setIsLoading(false);

  //     const updateSlide = await updateSlides(
  //       params.presentationId as string,
  //       allSlides
  //     );

  //     if (updateSlide.status === 200 && updateSlide.data) {
  //       setProject(updateSlide.data);
  //     }

  //     await fetchImages(allSlides);
  //   } catch (error) {
  //     console.error("❌ Error:", error);
  //     toast({
  //       title: "Error",
  //       description: "An unexpected error occurred",
  //       variant: "destructive",
  //     });
  //     redirect("/dashboard");
  //   }
  // };

  // const fetchSlides = async () => {
  //   try {
  //     const response = await fetch("/api/generateStreamLayouts", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ projectId: params.presentationId }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to generate slides: ${response.status}`);
  //     }

  //     if (!response.body) throw new Error("No response body");

  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder("utf-8");
  //     let buffer = "";
  //     let jsonComplete = false;
  //     let chunkCount = 0;

  //     console.log("🟢 Starting to receive stream...");

  //     while (true) {
  //       const { value, done } = await reader.read();
  //       if (done) {
  //         console.log("🟢 Stream completed");
  //         break;
  //       }

  //       chunkCount++;
  //       const chunk = decoder.decode(value, { stream: true });
  //       buffer += chunk;

  //       // Clean the buffer
  //       const cleanedBuffer = buffer
  //         .replace(/```json/g, "")
  //         .replace(/```/g, "")
  //         .trim();

  //       console.log(
  //         `🟢 Chunk #${chunkCount} (${chunk.length} chars):`,
  //         cleanedBuffer
  //       );

  //       // Check for complete JSON
  //       try {
  //         if (cleanedBuffer.startsWith("[") && cleanedBuffer.endsWith("]")) {
  //           // Count brackets to ensure complete JSON
  //           const openBrackets = (cleanedBuffer.match(/\[/g) || []).length;
  //           const closeBrackets = (cleanedBuffer.match(/\]/g) || []).length;

  //           if (openBrackets === closeBrackets) {
  //             const data = JSON.parse(cleanedBuffer);
  //             console.log("🟢 Successfully parsed complete JSON:", data);

  //             // Process the data
  //             setSlides(data);
  //             setIsLoading(false);

  //             // Save to database
  //             const updateSlide = await updateSlides(
  //               params.presentationId as string,
  //               data // Use the parsed data directly
  //             );

  //             if (updateSlide.status === 200 && updateSlide.data) {
  //               setProject(updateSlide.data);
  //             }

  //             await fetchImages(data);
  //             jsonComplete = true;
  //             break;
  //           }
  //         }
  //       } catch (error) {
  //         console.log("🟢 JSON not complete yet, waiting for more chunks...");
  //       }
  //     }

  //     // Handle incomplete JSON if stream ended without complete parse
  //     if (!jsonComplete && buffer) {
  //       console.log("🟢 Attempting to parse incomplete buffer");
  //       try {
  //         // Try to repair potentially incomplete JSON
  //         let repairedBuffer = buffer
  //           .replace(/```json/g, "")
  //           .replace(/```/g, "")
  //           .trim();

  //         // Add missing closing bracket if needed
  //         if (repairedBuffer.startsWith("[") && !repairedBuffer.endsWith("]")) {
  //           repairedBuffer += "]";
  //         }

  //         // Remove trailing comma if present
  //         repairedBuffer = repairedBuffer.replace(/,\s*?$/, "");

  //         const data = JSON.parse(repairedBuffer);
  //         console.log("🟢 Repaired JSON:", data);

  //         setSlides(data);
  //         setIsLoading(false);

  //         const updateSlide = await updateSlides(
  //           params.presentationId as string,
  //           data
  //         );

  //         if (updateSlide.status === 200 && updateSlide.data) {
  //           setProject(updateSlide.data);
  //         }

  //         await fetchImages(data);
  //       } catch (error) {
  //         console.error("🟢 Failed to parse even repaired JSON:", error);
  //         throw new Error("Could not parse complete JSON from stream");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast({
  //       title: "Error",
  //       description:
  //         error instanceof Error ? error.message : "Failed to generate slides",
  //       variant: "destructive",
  //     });
  //     redirect("/dashboard");
  //   }
  // };

  // const fetchSlides = async () => {
  //   try {
  //     const response = await fetch("/api/generateStreamLayouts", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ projectId: params.presentationId }),
  //     });

  //     if (!response.ok)
  //       throw new Error(`Failed to generate slides: ${response.status}`);
  //     if (!response.body) throw new Error("No response body");

  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder("utf-8");
  //     let buffer = "";
  //     let jsonComplete = false;

  //     while (true) {
  //       const { value, done } = await reader.read();
  //       if (done) break;

  //       const chunk = decoder.decode(value, { stream: true });
  //       buffer += chunk;

  //       // Process the special "0:" format into proper JSON
  //       const processedBuffer = buffer
  //         .replace(/\d+:\"/g, '"') // Remove line numbers
  //         .replace(/\\n/g, "\n") // Convert escaped newlines
  //         .replace(/\\"/g, '"') // Unescape quotes
  //         .replace(/```json/g, "") // Remove markdown code blocks
  //         .replace(/```/g, "")
  //         .trim();

  //       console.log("🟢 Processing buffer:", processedBuffer);

  //       try {
  //         // Only attempt parsing if we have complete JSON structure
  //         if (
  //           processedBuffer.startsWith("[") &&
  //           processedBuffer.endsWith("]")
  //         ) {
  //           const data = JSON.parse(processedBuffer);
  //           console.log("🟢 Successfully parsed JSON:", data);

  //           setSlides(data);
  //           setIsLoading(false);

  //           const updateSlide = await updateSlides(
  //             params.presentationId as string,
  //             data
  //           );

  //           if (updateSlide.status === 200 && updateSlide.data) {
  //             setProject(updateSlide.data);
  //           }

  //           await fetchImages(data);
  //           jsonComplete = true;
  //           break;
  //         }
  //       } catch (error) {
  //         console.log("🟢 JSON not complete yet, waiting for more chunks...");
  //       }
  //     }

  //     if (!jsonComplete) {
  //       // Final attempt to parse whatever we have
  //       try {
  //         const repairedBuffer =
  //           buffer
  //             .replace(/\d+:\"/g, '"')
  //             .replace(/\\n/g, "\n")
  //             .replace(/\\"/g, '"')
  //             .replace(/([^\]})\s]*)$/, "") // Remove incomplete ending
  //             .replace(/,\s*?$/, "") + // Remove trailing comma
  //           (buffer.trim().endsWith('"') ? '"' : "") + // Complete strings
  //           (buffer.includes("[") ? "]" : ""); // Complete arrays

  //         const data = JSON.parse(repairedBuffer);
  //         console.log("🟢 Repaired JSON:", data);

  //         setSlides(data);
  //         setIsLoading(false);

  //         const updateSlide = await updateSlides(
  //           params.presentationId as string,
  //           data
  //         );

  //         if (updateSlide.status === 200 && updateSlide.data) {
  //           setProject(updateSlide.data);
  //         }

  //         await fetchImages(data);
  //       } catch (finalError) {
  //         console.error("🟢 Final parsing failed:", finalError);
  //         throw new Error("Could not parse complete JSON from stream");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast({
  //       title: "Error",
  //       description:
  //         error instanceof Error ? error.message : "Failed to generate slides",
  //       variant: "destructive",
  //     });
  //     redirect("/dashboard");
  //   }
  // };

  // const fetchSlides = async () => {
  //   try {
  //     const response = await fetch("/api/generateStreamLayouts", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ projectId: params.presentationId }),
  //     });

  //     if (!response.ok)
  //       throw new Error(`Failed to generate slides: ${response.status}`);
  //     if (!response.body) throw new Error("No response body");

  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder("utf-8");
  //     let buffer = "";
  //     let jsonState = {
  //       openBraces: 0,
  //       inString: false,
  //       escapeNext: false,
  //     };

  //     while (true) {
  //       const { value, done } = await reader.read();
  //       if (done) break;

  //       buffer += decoder.decode(value);

  //       // Process using our special delimiter
  //       const chunks = buffer.split("‹›");
  //       buffer = chunks.pop() || ""; // Keep incomplete chunk

  //       for (const chunk of chunks) {
  //         if (!chunk.trim()) continue;

  //         try {
  //           // Track JSON structure state
  //           for (const char of chunk) {
  //             if (jsonState.escapeNext) {
  //               jsonState.escapeNext = false;
  //               continue;
  //             }

  //             if (char === "\\") {
  //               jsonState.escapeNext = true;
  //             } else if (char === '"' && !jsonState.escapeNext) {
  //               jsonState.inString = !jsonState.inString;
  //             } else if (!jsonState.inString) {
  //               if (char === "{" || char === "[") jsonState.openBraces++;
  //               if (char === "}" || char === "]") jsonState.openBraces--;
  //             }
  //           }

  //           // Only parse when we have complete JSON
  //           if (jsonState.openBraces === 0 && chunk.trim()) {
  //             const data = JSON.parse(chunk);
  //             console.log("🟢 Parsed complete JSON:", data);

  //             setSlides(data);
  //             setIsLoading(false);

  //             const updateSlide = await updateSlides(
  //               params.presentationId as string,
  //               data
  //             );

  //             if (updateSlide.status === 200 && updateSlide.data) {
  //               setProject(updateSlide.data);
  //             }

  //             await fetchImages(data);
  //           }
  //         } catch (error) {
  //           console.log("🟢 Building JSON structure...");
  //         }
  //       }
  //     }

  //     // Final attempt with remaining buffer
  //     if (buffer.trim()) {
  //       try {
  //         const data = JSON.parse(buffer);
  //         console.log("🟢 Final JSON parse:", data);
  //         // Update state as above
  //       } catch (error) {
  //         console.error("🟢 Failed to parse final buffer:", buffer);
  //         throw new Error("Incomplete JSON received");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     // Your existing error handling
  //   }
  // };

  const fetchImages = async (slides: Slide[]) => {
    try {
      console.log("🟢 Fetching images...");

      const updatedSlides = await generateImages(slides);
      if (updatedSlides.status !== 200 || !updatedSlides.data) {
        throw new Error("Failed to generate images");
      }

      console.log(
        "🟢 Images generated successfully, updating slides...",
        updatedSlides
      );
      setSlides(updatedSlides.data);

      // Save updated slides in the database
      const updateSlide = await updateSlides(
        params.presentationId as string,
        JSON.stringify(updatedSlides.data)
      );

      if (updateSlide.status === 200 && updateSlide.data) {
        setProject(updateSlide.data);
      }
    } catch (error) {
      console.error("🔴 Error generating images:", error);
      toast({
        title: "Error",
        description: "Failed to generate images",
        variant: "destructive",
      });
    } finally {
      setImageLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        <Navbar presentationId={params.presentationId as string} />

        <div
          className="flex-1 flex overflow-hidden pt-16"
          style={{
            color: currentTheme.accentColor,
            fontFamily: currentTheme.fontFamily,
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <LayoutPreview loading={isLoading} />

          <div className="flex-1 ml-64 pr-16">
            <Editor
              isEditable={true}
              loading={isLoading}
              imageLoading={imageLoading}
            />
          </div>
          <EditorSidebar />
        </div>
      </div>
    </DndProvider>
  );
};

export default Page;

// "```json
// [

//   {
//     "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
//     "slideName": "Introduction to TDD",
//     "type": "imageAndText",
//     "className": "min-h-[200px] p-8 mx-auto flex justify-center items-center",
//     "content": {
//       "id": "12345678-90ab-cdef-1234-567890abcdef",
//       "type": "column",
//       "name": "Column",
//       "content": [
//         {
//           "id": "abcdef12-3456-7890-abcd-ef1234567890",
//           "type": "resizable-column",
//           "name": "Image and text",
//           "className": "border",
//           "content": [
//             {
//               "id": "fedcba98-7654-3210-fedc-ba9876543210",
//               "type": "column",
//               "name": "Column",
//               "content": [
//                 {
//                   "id": "1234abcd-5678-ef90-1234-5678abcdef90",
//                   "type": "image",
//                   "name": "Image",
//                   "className": "p-3",
//                   "content": "https://via.placeholder.com/300x200.png?text=TDD+Introduction",
//                   "alt": "A professional setting with developers discussing Test-Driven Development"
//                 }
//               ]
//             },
//             {
//               "id": "0987fedc-6543-210f-edcb-a9876543210f",
//               "type": "column",
//               "name": "Column",
//               "content": [
//                 {
//                   "id": "abcd1234-ef56-7890-abcd-ef1234567890",
//                   "type": "heading1",
//                   "name": "Heading1",
//                   "content": "Introduce Test-Driven Development (TDD)",
//                   "placeholder": "Heading1"
//                 },
//                 {
//                   "id": "5678abcd-ef90-1234-5678-abcdef901234",
//                   "type": "paragraph",
//                   "name": "Paragraph",
//                   "content": "Test-Driven Development (TDD) is a software development process that relies on the repetition of a very short development cycle: first, the developer writes an (initially failing) automated test case that defines a desired improvement or new function, then produces the minimum amount of code to pass that test, and finally refactors the new code to acceptable standards.",
//                   "placeholder": "start typing here"
//                 }
//               ],
//               "className": "w-full h-full p-8 flex justify-center items-center",
//               "placeholder": "Heading1"
//             }
//           ]
//         }
//       ]
//     }
//   },
//   {
//     "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
//     "slideName": "First Rule of TDD",
//     "type": "textAndImage",
//     "className": "min-h-[200px] p-8 mx-auto flex justify-center items-center",
//     "content": {
//       "id": "23456789-0abc-def1-2345-67890abcdef1",
//       "type": "column",
//       "name": "Column",
//       "content": [
//         {
//           "id": "bcdef123-4567-8901-bcde-f12345678901",
//           "type": "resizable-column",
//           "name": "Text and image",
//           "className": "border",
//           "content": [
//             {
//               "id": "cdef1234-5678-9012-cdef-123456789012",
//               "type": "column",
//               "name": "",
//               "content": [
//                 {
//                   "id": "3456abcd-7890-ef12-3456-7890abcdef12",
//                   "type": "heading1",
//                   "name": "Heading1",
//                   "content": "First Rule of TDD",
//                   "placeholder": "Heading1"
//                 },
//                 {
//                   "id": "6789abcd-ef01-2345-6789-abcdef012345",
//                   "type": "paragraph",
//                   "name": "Paragraph",
//                   "content": "You are not allowed to write any production code unless it is to make a failing test pass. This rule ensures that developers focus on writing only the necessary code to fulfill the test requirements, promoting efficiency and reducing unnecessary code.",
//                   "placeholder": "start typing here"
//                 }
//               ],
//               "className": "w-full h-full p-8 flex justify-center items-center",
//               "placeholder": "Heading1"
//             },
//             {
//               "id": "4567cdef-8901-2345-6789-abcdef012345",
//               "type": "column",
//               "name": "Column",
//               "content": [
//                 {
//                   "id": "7890abcd-ef12-3456-7890-abcdef123456",
//                   "type": "image",
//                   "name": "Image",
//                   "className": "p-3",
//                   "content": "https://via.placeholder.com/300x200.png?text=First+Rule+of+TDD",
//                   "alt": "A developer writing code with a focus on passing tests"
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   },
//   {
//     "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
//     "slideName": "Second Rule of TDD",
//     "type": "twoColumnsWithHeadings",
//     "className": "p-4 mx-auto flex justify-center items-center",
//     "content": {
//       "id": "34567890-1abc-def2-3456-7890abcdef12",
//       "type": "column",
//       "name": "Column",
//       "content": [
//         {
//           "id": "cdef2345-6789-0123-cdef-123456789012",
//           "type": "title",
//           "name": "Title",
//           "content": "Second Rule of TDD",
//           "placeholder": "Untitled Card"
//         },
//         {
//           "id": "5678cdef-9012-3456-7890-abcdef123456",
//           "type": "resizable-column",
//           "name": "Text and image",
//           "className": "border",
//           "content": [
//             {
//               "id": "def34567-8901-2345-def3-456789012345",
//               "type": "column",
//               "name": "Column",
//               "content": [
//                 {
//                   "id": "8901abcd-ef23-4567-8901-abcdef234567",
//                   "type": "heading3",
//                   "name": "Heading3",
//                   "content": "Rule Explanation",
//                   "placeholder": "Heading 3"
//                 },
//                 {
//                   "id": "9012abcd-ef34-5678-9012-abcdef345678",
//                   "type": "paragraph",
//                   "name": "Paragraph",
//                   "content": "You are not allowed to write any more of a test than is sufficient to fail. This rule encourages developers to write minimal tests that are just enough to fail, ensuring that the focus remains on the specific functionality being developed.",
//                   "placeholder": "Start typing..."
//                 }
//               ]
//             },
//             {
//               "id": "0123cdef-4567-8901-2345-abcdef456789",
//               "type": "column",
//               "name": "Column",
//               "content": [
//                 {
//                   "id": "2345abcd-ef45-6789-0123-abcdef567890",
//                   "type": "heading3",
//                   "name": "Heading3",
//                   "content": "Practical Application",
//                   "placeholder": "Heading 3"
//                 },
//                 {
//                   "id": "3456abcd-ef56-7890-1234-abcdef678901",
//                   "type": "paragraph",
//                   "name": "Paragraph",
//                   "content": "By adhering to this rule, developers can avoid over-engineering and ensure that the codebase remains clean and maintainable. It also helps in identifying the exact requirements for the functionality being tested.",
//                   "placeholder": "Start typing..."
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   }
// ]
// ```"
