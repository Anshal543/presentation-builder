export interface Slide {
  id: string;
  slideName: string;
  type: string;
  content: ContentItem;
  slideOrder: number;
  className?: string;
}

export type ContentType =
  | "column"
  | "resizable-column"
  | "text"
  | "paragraph"
  | "image"
  | "table"
  | "multiColumn"
  | "blank"
  | "imageAndText"
  | "heading1"
  | "heading2"
  | "heading3"
  | "title"
  | "heading4"
  | "table"
  | "blockquote"
  | "numberedList"
  | "bulletedList"
  | "code"
  | "link"
  | "quote"
  | "divider"
  | "calloutBox"
  | "todoList"
  | "bulletList"
  | "codeBlock"
  | "customButton"
  | "table"
  | "tableOfContents";

export interface ContentItem {
  id: string;
  type: ContentType;
  name: string;
  content: ContentItem[] | string | string[] | string[][];
  initialRows?: number;
  initialColumns?: number;
  restrictToDrop?: boolean;
  columns?: number;
  placeholder?: string;
  className?: string;
  alt?: string;
  callOutType?: "success" | "warning" | "info" | "question" | "caution";
  link?: string;
  code?: string;
  language?: string;
  bgColor?: string;
  isTransparent?: boolean;
}

export interface Theme {
  name: string;
  fontFamily: string;
  fontColor: string;
  backgroundColor: string;
  slideBackgroundColor: string;
  accentColor: string;
  gradientBackground?: string;
  sidebarColor?: string;
  navbarColor?: string;
  type: "light" | "dark";
}

export interface OutlineCard {
  title: string;
  id: string;
  order: number;
}

export interface LayoutSlides {
  slideName: string;
  content: ContentItem;
  className?: string;
  type: string;
}

[
  {
    id: "f8c9d9f9-7c3f-4f51-8b34-3b97b8bbf4d2",
    type: "blank-card",
    content: {
      id: "e8bd8c2b-8e3f-4c45-97f7-6f3c8b9b7c5a",
      name: "Column",
      type: "column",
      content: [
        {
          id: "71ca6645-4bfb-4f9f-bc4f-7d40b8c7c9e4",
          name: "Title",
          type: "title",
          content: "Understanding Web Development",
          placeholder: "Untitled Card",
        },
      ],
    },
    className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    slideName: "Blank card",
  },
  {
    id: "a9bfb812-3d1e-4f7b-9d84-2e3b7f9c1b34",
    type: "accentLeft",
    content: {
      id: "4a9f8c47-9c7f-4d3e-b6f2-9e7b8f9d8c4a",
      name: "Column",
      type: "column",
      content: [
        {
          id: "b8f7c4d3-9c2e-4a9f-b8f7-d2c4a9e3b7f9",
          name: "Resizable column",
          type: "resizable-column",
          content: [
            {
              id: "d2f9c8b7-4a9f-9b8f-7c4d-2e3b7f9c9e4a",
              alt: "HTML, CSS, and JavaScript code snippets displayed on a monitor",
              name: "Image",
              type: "image",
              content:
                "https://oaidalleapiprodscus.blob.core.windows.net/private/org-bZEPwOvZk1zAOjdQ1rLuAuKv/user-yuS4mzSuGAP8YJFLBYPrOqdh/img-MvyYPnL7njoAolXqTX5dlPcn.png?st=2025-03-17T10%3A32%3A52Z&se=2025-03-17T12%3A32%3A52Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-16T17%3A26%3A25Z&ske=2025-03-17T17%3A26%3A25Z&sks=b&skv=2024-08-04&sig=DgI0YiN3ZEA4EqPgQbYigHo0HOY6V1niIwNVjncEWUE%3D",
            },
            {
              id: "f7c9b8d4-2e3b-4a9f-b8f7-9c4a3d7e9f8b",
              name: "Column",
              type: "column",
              content: [
                {
                  id: "7f9c8b4d-3a2e-4b9f-bf7c-9d4a2e3c7f9b",
                  name: "Heading1",
                  type: "heading1",
                  content: "Fundamentals of Web Development",
                  placeholder: "Heading1",
                },
                {
                  id: "9b8f7c4d-3a9f-2e3b-4f9c-7d4a2e3b7f9c",
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Learn the foundational building blocks of web development including HTML, CSS, and JavaScript.",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
          restrictToDrop: true,
        },
      ],
      restrictDropTo: true,
    },
    className: "min-h-[300px]",
    slideName: "Accent left",
  },
  {
    id: "c4a9f7b8-3d2e-4f9c-b8f7-9c7e4d2f3a9f",
    type: "imageAndText",
    content: {
      id: "8c4d7f9b-2e3a-4f9f-b8f7-9d4a3e9f7b8c",
      name: "Column",
      type: "column",
      content: [
        {
          id: "9d8f7c4b-3a9f-4e2b-bf9c-7d4a9e3b7f9d",
          alt: "A developer working on React.js with a laptop and coffee on a desk",
          name: "Image",
          type: "image",
          content:
            "https://oaidalleapiprodscus.blob.core.windows.net/private/org-bZEPwOvZk1zAOjdQ1rLuAuKv/user-yuS4mzSuGAP8YJFLBYPrOqdh/img-a8L3d73mzbsp92Ao1YfxWdaY.png?st=2025-03-17T10%3A32%3A53Z&se=2025-03-17T12%3A32%3A53Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-16T15%3A52%3A47Z&ske=2025-03-17T15%3A52%3A47Z&sks=b&skv=2024-08-04&sig=XBMlUc1ZCUbSRTKhCR80tT7Px//b19Q4d2eoUe54D2I%3D",
        },
        {
          id: "7f9c4d3b-2e9f-4b8f-b7c3-9d4a2e3b7f9c",
          name: "Heading2",
          type: "heading2",
          content: "Learn React.js",
          placeholder: "Heading2",
        },
        {
          id: "f7c9b8d4-2e3b-4a9f-bf7c-9d4a3e9f7b8c",
          name: "Paragraph",
          type: "paragraph",
          content:
            "React.js enables the creation of dynamic and interactive user interfaces for building engaging front-end applications.",
          placeholder: "start typing here",
        },
      ],
    },
    className: "min-h-[400px]",
    slideName: "Image and Text",
  },
  {
    id: "e9b7f8c4-3d2a-4f9b-b8f7-9d4a3e7b9f8c",
    type: "twoColumns",
    content: {
      id: "4d9f7c3b-2e4a-9f8b-b7f9-3d7e9b8f4c9a",
      name: "Column",
      type: "column",
      content: [
        {
          id: "d2f9c7b8-3a9f-4b8f-bf7c-9d4a3e9f8b7c",
          name: "Resizable Column Left",
          type: "resizable-column",
          content: [
            {
              id: "9b8f7c4d-2e3a-4f9b-b7f9-3d4a9e3b7f9c",
              name: "Heading3",
              type: "heading3",
              content: "Master Node.js",
              placeholder: "Heading3",
            },
            {
              id: "7c9b8f4d-3a2e-4f9b-b7f9-9d4a3e9b7f8c",
              name: "Paragraph",
              type: "paragraph",
              content:
                "Node.js and Express.js provide robust server-side logic and RESTful APIs for back-end development.",
              placeholder: "start typing here",
            },
          ],
        },
        {
          id: "8f7c9b4d-3a2e-4f9b-bf7c-9d4a3e7b9f8c",
          name: "Resizable Column Right",
          type: "resizable-column",
          content: [
            {
              id: "d7f9c8b4-3a2e-4b8f-b7f9-9d4a3e9b7f8c",
              alt: "A server room with glowing network cables and server racks",
              name: "Image",
              type: "image",
              content:
                "https://oaidalleapiprodscus.blob.core.windows.net/private/org-bZEPwOvZk1zAOjdQ1rLuAuKv/user-yuS4mzSuGAP8YJFLBYPrOqdh/img-3dTlo1F9i6eDZv0Vzv4BIzsg.png?st=2025-03-17T10%3A32%3A50Z&se=2025-03-17T12%3A32%3A50Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-16T15%3A46%3A13Z&ske=2025-03-17T15%3A46%3A13Z&sks=b&skv=2024-08-04&sig=bWZjVdjy1tD9L4LH11xTtS8x1Hb0sed2sYXqUZbxNlo%3D",
            },
          ],
        },
      ],
    },
    className: "min-h-[400px]",
    slideName: "Two Columns",
  },
  {
    id: "3e9b7f8c-4d2a-9f9b-b8f7-7d4a3e9f7b8c",
    type: "threeColumnsWithHeadings",
    content: {
      id: "7c9b8f4d-3a2e-4f9b-b7f9-9d4a3e9b7f8c",
      name: "Column",
      type: "column",
      content: [
        {
          id: "b8f7c4d3-3a9f-4b8f-b7f9-9d4a3e9f8b7c",
          name: "Column 1",
          type: "resizable-column",
          content: [
            {
              id: "9b7f8c4d-2e3a-4f9b-b8f7-9d4a3e9f7c8b",
              name: "Heading2",
              type: "heading2",
              content: "MongoDB Proficiency",
              placeholder: "Heading2",
            },
            {
              id: "7f9c8b4d-3a2e-4f9b-bf7c-9d4a3e9b7c8b",
              name: "Paragraph",
              type: "paragraph",
              content:
                "Design, manage, and interact with NoSQL databases to store structured and unstructured data effectively.",
              placeholder: "start typing here",
            },
          ],
        },
        {
          id: "d7f9c8b4-3a2e-4b8f-b7f9-9d4a3e9f7b8c",
          name: "Column 2",
          type: "resizable-column",
          content: [
            {
              id: "8f7c9b4d-3a2e-4f9b-b7f9-9d4a3e9f7b8c",
              name: "Heading2",
              type: "heading2",
              content: "Integrating MERN Components",
              placeholder: "Heading2",
            },
            {
              id: "9b7f8c4d-2e3a-4f9b-b8f7-9d4a3e9f7c8b",
              name: "Paragraph",
              type: "paragraph",
              content:
                "Connect the front-end and back-end components using API calls and effective state management.",
              placeholder: "start typing here",
            },
          ],
        },
        {
          id: "e9f7c8b4-3a2e-4f9b-b7f9-9d4a3e7c9f8b",
          name: "Column 3",
          type: "resizable-column",
          content: [
            {
              id: "d7f9c8b4-3a2e-4b8f-b7f9-9d4a3e7c9f8b",
              name: "Heading2",
              type: "heading2",
              content: "Deployment & Optimization",
              placeholder: "Heading2",
            },
            {
              id: "7c9b8f4d-3a2e-4f9b-b7f9-9d4a3e7c9f8b",
              name: "Paragraph",
              type: "paragraph",
              content:
                "Deploy MERN applications on cloud platforms with scalability and security best practices.",
              placeholder: "start typing here",
            },
          ],
        },
      ],
    },
    className: "min-h-[400px]",
    slideName: "Three Columns with Headings",
  },
];
