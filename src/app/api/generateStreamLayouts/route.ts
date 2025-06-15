import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
// import { OpenAIStream, StreamingTextResponse } from "ai"; // Your helper for streaming responses
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { v4 as uuidv4 } from "uuid";
import { ContentType } from "@/lib/types";
// import { openai } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json();
    console.log("🟢 Generating layouts for project:", projectId);

    const project = await client.project.findUnique({
      where: { id: projectId, isDeleted: false },
    });

    if (!project || !project.outlines || project.outlines.length === 0) {
      return NextResponse.json(
        { error: "Project not found or has no outlines" },
        { status: 404 }
      );
    }

    console.log("🟢 Project found:", project);
    const existingLayouts = [
      {
        id: uuidv4(),
        slideName: "Blank card",
        type: "blank-card",
        className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
        content: {
          id: uuidv4(),
          type: "column" as ContentType,
          name: "Column",
          content: [
            {
              id: uuidv4(),
              type: "title" as ContentType,
              name: "Title",
              content: "",
              placeholder: "Untitled Card",
            },
          ],
        },
      },

      {
        id: uuidv4(),
        slideName: "Accent left",
        type: "accentLeft",
        className: "min-h-[300px]",
        content: {
          id: uuidv4(),
          type: "column" as ContentType,
          name: "Column",
          restrictDropTo: true,
          content: [
            {
              id: uuidv4(),
              type: "resizable-column" as ContentType,
              name: "Resizable column",
              restrictToDrop: true,
              content: [
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  content:
                    "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Title",
                },
                {
                  id: uuidv4(),
                  type: "column" as ContentType,
                  name: "Column",
                  content: [
                    {
                      id: uuidv4(),
                      type: "heading1" as ContentType,
                      name: "Heading1",
                      content: "",
                      placeholder: "Heading1",
                    },
                    {
                      id: uuidv4(),
                      type: "paragraph" as ContentType,
                      name: "Paragraph",
                      content: "",
                      placeholder: "start typing here",
                    },
                  ],
                  className:
                    "w-full h-full p-8 flex justify-center items-center",
                  placeholder: "Heading1",
                },
              ],
            },
          ],
        },
      },

      {
        id: uuidv4(),
        slideName: "Accent Right",
        type: "accentRight",
        className: "min-h-[300px]",
        content: {
          id: uuidv4(),
          type: "column" as ContentType,
          name: "Column",
          content: [
            {
              id: uuidv4(),
              type: "resizable-column" as ContentType,
              name: "Resizable column",
              restrictToDrop: true,
              content: [
                {
                  id: uuidv4(),
                  type: "column" as ContentType,
                  name: "Column",
                  content: [
                    {
                      id: uuidv4(),
                      type: "heading1" as ContentType,
                      name: "Heading1",
                      content: "",
                      placeholder: "Heading1",
                    },
                    {
                      id: uuidv4(),
                      type: "paragraph" as ContentType,
                      name: "Paragraph",
                      content: "",
                      placeholder: "start typing here",
                    },
                  ],
                  className:
                    "w-full h-full p-8 flex justify-center items-center",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  restrictToDrop: true,
                  content:
                    "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Title",
                },
              ],
            },
          ],
        },
      },

      {
        id: uuidv4(),
        slideName: "Image and text",
        type: "imageAndText",
        className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
        content: {
          id: uuidv4(),
          type: "column" as ContentType,
          name: "Column",
          content: [
            {
              id: uuidv4(),
              type: "resizable-column" as ContentType,
              name: "Image and text",
              className: "border",
              content: [
                {
                  id: uuidv4(),
                  type: "column" as ContentType,
                  name: "Column",
                  content: [
                    {
                      id: uuidv4(),
                      type: "image" as ContentType,
                      name: "Image",
                      className: "p-3",
                      content:
                        "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      alt: "Title",
                    },
                  ],
                },
                {
                  id: uuidv4(),
                  type: "column" as ContentType,
                  name: "Column",
                  content: [
                    {
                      id: uuidv4(),
                      type: "heading1" as ContentType,
                      name: "Heading1",
                      content: "",
                      placeholder: "Heading1",
                    },
                    {
                      id: uuidv4(),
                      type: "paragraph" as ContentType,
                      name: "Paragraph",
                      content: "",
                      placeholder: "start typing here",
                    },
                  ],
                  className:
                    "w-full h-full p-8 flex justify-center items-center",
                  placeholder: "Heading1",
                },
              ],
            },
          ],
        },
      },

      {
        id: uuidv4(),
        slideName: "Text and image",
        type: "textAndImage",
        className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
        content: {
          id: uuidv4(),
          type: "column" as ContentType,
          name: "Column",
          content: [
            {
              id: uuidv4(),
              type: "resizable-column" as ContentType,
              name: "Text and image",
              className: "border",
              content: [
                {
                  id: uuidv4(),
                  type: "column" as ContentType,
                  name: "",
                  content: [
                    {
                      id: uuidv4(),
                      type: "heading1" as ContentType,
                      name: "Heading1",
                      content: "",
                      placeholder: "Heading1",
                    },
                    {
                      id: uuidv4(),
                      type: "paragraph" as ContentType,
                      name: "Paragraph",
                      content: "",
                      placeholder: "start typing here",
                    },
                  ],
                  className:
                    "w-full h-full p-8 flex justify-center items-center",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "column" as ContentType,
                  name: "Column",
                  content: [
                    {
                      id: uuidv4(),
                      type: "image" as ContentType,
                      name: "Image",
                      className: "p-3",
                      content:
                        "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      alt: "Title",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },

      {
        id: uuidv4(),
        slideName: "Two columns",
        type: "twoColumns",
        className: "p-4 mx-auto flex justify-center items-center",
        content: {
          id: uuidv4(),
          type: "column" as ContentType,
          name: "Column",
          content: [
            {
              id: uuidv4(),
              type: "title" as ContentType,
              name: "Title",
              content: "",
              placeholder: "Untitled Card",
            },
            {
              id: uuidv4(),
              type: "resizable-column" as ContentType,
              name: "Text and image",
              className: "border",
              content: [
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "Start typing...",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "Start typing...",
                },
              ],
            },
          ],
        },
      },

      {
        id: uuidv4(),
        slideName: "Two columns with headings",
        type: "twoColumnsWithHeadings",
        className: "p-4 mx-auto flex justify-center items-center",
        content: {
          id: uuidv4(),
          type: "column" as ContentType,
          name: "Column",
          content: [
            {
              id: uuidv4(),
              type: "title" as ContentType,
              name: "Title",
              content: "",
              placeholder: "Untitled Card",
            },
            {
              id: uuidv4(),
              type: "resizable-column" as ContentType,
              name: "Text and image",
              className: "border",
              content: [
                {
                  id: uuidv4(),
                  type: "column" as ContentType,
                  name: "Column",
                  content: [
                    {
                      id: uuidv4(),
                      type: "heading3" as ContentType,
                      name: "Heading3",
                      content: "",
                      placeholder: "Heading 3",
                    },
                    {
                      id: uuidv4(),
                      type: "paragraph" as ContentType,
                      name: "Paragraph",
                      content: "",
                      placeholder: "Start typing...",
                    },
                  ],
                },
                {
                  id: uuidv4(),
                  type: "column" as ContentType,
                  name: "Column",
                  content: [
                    {
                      id: uuidv4(),
                      type: "heading3" as ContentType,
                      name: "Heading3",
                      content: "",
                      placeholder: "Heading 3",
                    },
                    {
                      id: uuidv4(),
                      type: "paragraph" as ContentType,
                      name: "Paragraph",
                      content: "",
                      placeholder: "Start typing...",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },

      {
        id: uuidv4(),
        slideName: "Three column",
        type: "threeColumns",
        className: "p-4 mx-auto flex justify-center items-center",
        content: {
          id: uuidv4(),
          type: "column" as ContentType,
          name: "Column",
          content: [
            {
              id: uuidv4(),
              type: "title" as ContentType,
              name: "Title",
              content: "",
              placeholder: "Untitled Card",
            },
            {
              id: uuidv4(),
              type: "resizable-column" as ContentType,
              name: "Text and image",
              className: "border",
              content: [
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "",
                  content: "",
                  placeholder: "Start typing...",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "",
                  content: "",
                  placeholder: "Start typing...",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "",
                  content: "",
                  placeholder: "Start typing...",
                },
              ],
            },
          ],
        },
      },
    ];
    const prompt = `
  1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
    2. Use diverse and engaging designs, ensuring each layout is unique.
    3. Adhere to the structure of existing layouts but add new styles or components if needed.
    4. Fill placeholder data into content fields where required.
    5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
    6. Ensure proper formatting and schema alignment for the output JSON.

    ### Example Layouts:
    ${JSON.stringify(existingLayouts, null, 2)}

    ### Outline Array:
    ${JSON.stringify(project.outlines)}

    For each entry in the outline array, generate:
    - A unique JSON layout with creative designs.
    - Properly filled content, including placeholders for image components.
    - Clear and well-structured JSON data.
    For Images
    - The alt text should describe the image clearly and concisely.
    - Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
    - Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
    - Avoid using terms like "image of" or "picture of," and instead focus directly on the content and meaning.

    Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.`;

    // Call the OpenAI API with streaming enabled
    // const response = await openai.chat.completions.create({
    //   model: "chatgpt-4o-latest",
    //   messages: [{ role: "user", content: prompt }],
    //   stream: true,
    // });

    // console.log("🟢 OpenAI API response:", response);

    // // Create a streaming response that pipes the OpenAI API output.
    // const stream = OpenAIStream(response as any, {
    //   async onCompletion(completion) {
    //     console.log("🟢 Streaming layouts generation completion:", completion);
    //     // On stream completion, parse and save the generated slides to the database.
    //   },
    // });

    // console.log("🟢 Streaming layouts generation started", stream);
    // return new StreamingTextResponse(stream);

    const { textStream } = streamText({
      model: openai("chatgpt-4o-latest"),
      messages: [{ role: "user", content: prompt }],
    });
    // // console.log("🟢 Streaming layouts generation started", textStream);

    // return stream.toDataStreamResponse();

    // const { textStream } = streamText({
    //   model: openai("gpt-4o"),
    //   messages: [{ role: "user", content: prompt }],
    // });

    // const encoder = new TextEncoder();

    // const stream = new ReadableStream({
    //   async start(controller) {
    //     const reader = textStream.getReader();
    //     let slideIndex = 1;
    //     let buffer = "";

    //     while (true) {
    //       const { value, done } = await reader.read();
    //       if (done) break;

    //       buffer += value;

    //       // Emit slide on double line break or similar logic
    //       const parts = buffer.split("\n\n");
    //       buffer = parts.pop() ?? "";

    //       for (const slide of parts) {
    //         const payload =
    //           JSON.stringify({
    //             title: `Slide ${slideIndex++}`,
    //             content: slide.trim(),
    //           }) + "\n";

    //         controller.enqueue(encoder.encode(payload));
    //       }
    //     }

    //     // Emit final slide
    //     if (buffer.trim()) {
    //       const payload =
    //         JSON.stringify({
    //           title: `Slide ${slideIndex++}`,
    //           content: buffer.trim(),
    //         }) + "\n";

    //       controller.enqueue(encoder.encode(payload));
    //     }

    //     controller.close();
    //   },
    // });

    // return new Response(stream, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const encoder = new TextEncoder();

    // const stream = new ReadableStream({
    //   async start(controller) {
    //     const reader = textStream.getReader();
    //     let buffer = "";

    //     while (true) {
    //       const { value, done } = await reader.read();
    //       if (done) break;

    //       buffer += value;

    //       // If response contains multiple slides, split by `}` boundary (very naive but ok for now)
    //       const parts = buffer.split("}\n");
    //       buffer = parts.pop() ?? "";

    //       for (const part of parts) {
    //         const jsonText = (part + "}").replace(/```json|```/g, "").trim();

    //         try {
    //           const parsed = JSON.parse(jsonText);

    //           const slide = {
    //             id: uuidv4(),
    //             ...parsed,
    //           };

    //           const line = JSON.stringify(slide) + "\n";
    //           controller.enqueue(encoder.encode(line));
    //         } catch (err) {
    //           console.error("Skipping invalid chunk", jsonText);
    //         }
    //       }
    //     }

    //     controller.close();
    //   },
    // });

    // return new Response(stream, {
    //   headers: {
    //     "Content-Type": "application/x-ndjson",
    //   },
    // });

    const { readable, writable } = new TransformStream({
      async transform(chunk, controller) {
        try {
          // Convert chunk to string if it isn't already
          const chunkStr =
            typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk);

          // Clean the chunk
          // More aggressive cleaning and formatting
          const cleanedChunk = chunkStr.replace(/^\d+:\s*"/gm, '"'); // Remove numbered lines

          // Only send non-empty chunks
          if (cleanedChunk) {
            // Format as NDJSON (newline-delimited JSON)
            controller.enqueue(`${cleanedChunk}`);
          }
        } catch (error) {
          console.error("Error processing chunk:", error);
        }
      },
    });

    // Pipe the AI stream through our cleaner
    textStream.pipeTo(writable).catch(console.error);

    // Return the transformed stream
    return new Response(readable, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in generateStreamLayouts endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
