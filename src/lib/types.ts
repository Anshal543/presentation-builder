import { Prisma } from "@prisma/client";

export type PrismaUser = Prisma.UserGetPayload<{
  include: { PurchasedProjects: true };
}>;
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

export interface LayoutGroup {
  name: string;
  layouts: Layout[];
}

export interface Layout {
  name: string;
  icon: React.FC;
  type: string;
  component: LayoutSlides;
  layoutType: string;
}

export interface ComponentGroup {
  name: string;
  components: Component[];
}

interface Component {
  name: string;
  icon: string;
  type: string;
  component: ContentItem;
  componentType: string;
}

/*
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
*/

/*
[
  {
    id: "e4c6b1b5-3f52-4c8d-a7f9-9e2d6cbb1f8d",
    type: "imageAndText",
    content: {
      id: "8a4f4c0d-5f45-4aa3-b9eb-b2dbe9f6e7d2",
      name: "Column",
      type: "column",
      content: [
        {
          id: "b76d11c2-efc6-4e8a-a742-8c4e4e4fd4b0",
          name: "Image and text",
          type: "resizable-column",
          content: [
            {
              id: "f1b8d0a4-9ec4-4da4-b9d2-3d0e72f8c8a1",
              name: "Column",
              type: "column",
              content: [
                {
                  id: "3e1d7b9d-9c3d-4f4e-a8fd-4a6f0c4b1e5a",
                  alt: "An abstract representation of database management with interconnected nodes and a central server",
                  name: "Image",
                  type: "image",
                  content:
                    "https://ucarecdn.com/bd774507-4b32-40df-adfc-73fa442bed38/",
                  className: "p-3",
                },
              ],
            },
            {
              id: "9f8d1c2e-6f52-4e9b-9c9e-7e2d6f8b2dc3",
              name: "Column",
              type: "column",
              content: [
                {
                  id: "8b2f1c3d-9e4a-4ea9-b8fd-7f0d9c6b1e8f",
                  name: "Heading1",
                  type: "heading1",
                  content: "A Database Management System (DBMS)",
                  placeholder: "Heading1",
                },
                {
                  id: "3e9b1c2d-7f4a-4c8d-a8e9-b7f0d2c1e8f1",
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "A DBMS is software that enables users to define, create, maintain, and control access to databases.",
                  placeholder: "Start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
          className: "border",
        },
      ],
    },
    className: "min-h-[300px] p-8 mx-auto flex justify-center items-center",
    slideName: "What is DBMS?",
  },
  {
    id: "9b3c8f4d-6e8a-42b1-a9f1-2d7f8c1e9d6b",
    type: "accentLeft",
    content: {
      id: "f8b9e1c2-7d4a-4c8e-b9f0-2d6b7e4c1e9a",
      name: "Column",
      type: "column",
      content: [
        {
          id: "2e9b1c7d-4a6f-42b8-a9f0-7d6b1e4c8f2a",
          name: "Resizable column",
          type: "resizable-column",
          content: [
            {
              id: "4e8a1c9b-7f6d-4b2a-a9f1-8c2d7f6b1e9c",
              alt: "Data being organized and analyzed in a digital interface",
              name: "Image",
              type: "image",
              content:
                "https://ucarecdn.com/bff39f9b-ece9-4d2d-b4f7-f3912eeb3dcf/",
            },
            {
              id: "1c9b7f6d-4e8a-4f2b-a6f1-9c2d7e8b1f9d",
              name: "Column",
              type: "column",
              content: [
                {
                  id: "7d4a6f8c-1e9b-4b2a-a9f0-2c8f1e6d9b7f",
                  name: "Heading1",
                  type: "heading1",
                  content: "Purpose of DBMS",
                  placeholder: "Heading1",
                },
                {
                  id: "4a7d6f8b-1e9c-4b2a-a8f0-2c9b1e6d7f8a",
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "DBMS provides a systematic and organized way of storing, managing, and retrieving data efficiently.",
                  placeholder: "Start typing here",
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
    slideName: "Purpose of DBMS",
  },
  {
    id: "8f6d9b7e-1e4c-4a2b-a9f0-2c9b1f8d7e6a",
    type: "threeColumns",
    content: {
      id: "9b7e6a1c-4f8d-4a2b-a6f1-7d9e4c8b2f1a",
      name: "Column",
      type: "column",
      content: [
        {
          id: "6d9b7e1c-4f8a-4b2a-a9f0-7e6a4c1f9b2d",
          name: "Title",
          type: "title",
          content: "Types of Database Management Systems",
          placeholder: "Untitled Card",
        },
        {
          id: "2f8b7e1d-4a6c-49b2-a9f0-1c9e7d6a4b8f",
          name: "Text and image",
          type: "resizable-column",
          content: [
            {
              id: "4c9b7e6a-1f8d-4b2a-a6f1-7e8a4d1f9b2c",
              name: "Paragraph",
              type: "paragraph",
              content: "Hierarchical DBMS",
              placeholder: "Start typing...",
            },
            {
              id: "7f6a4b8d-1e9c-4a2b-a6f1-9e7c4d1f8b2a",
              name: "Paragraph",
              type: "paragraph",
              content: "Network DBMS",
              placeholder: "Start typing...",
            },
            {
              id: "9b8f6a4c-1e7d-4a2b-a9f0-6e4c1f9b7d2a",
              name: "Paragraph",
              type: "paragraph",
              content: "Relational DBMS",
              placeholder: "Start typing...",
            },
            {
              id: "7e6a4b9f-1c8d-4a2b-a6f1-9b7d4c1f8e2a",
              name: "Paragraph",
              type: "paragraph",
              content: "Object-oriented DBMS",
              placeholder: "Start typing...",
            },
          ],
          className: "border",
        },
      ],
    },
    className: "p-4 mx-auto flex justify-center items-center",
    slideName: "Types of DBMS",
  },
  {
    id: "7f9e6b1c-4a2d-4b8f-a9f0-2c6a1e7d4b9f",
    type: "twoColumnsWithHeadings",
    content: {
      id: "9e7d6a4b-1f8c-4a2b-a9f0-6b1c4f9e7d2a",
      name: "Column",
      type: "column",
      content: [
        {
          id: "6a4b9e7d-1f8c-4a2b-a9f0-7d1c4f9e6b2a",
          name: "Title",
          type: "title",
          content: "Key Components of a DBMS",
          placeholder: "Untitled Card",
        },
        {
          id: "4b9e6a1c-7f8d-4a2b-a9f0-1e7d6c4b9f2a",
          name: "Text and image",
          type: "resizable-column",
          content: [
            {
              id: "1f7d9e6b-4a8c-4b2a-a9f0-6a4c7e9b1d2a",
              name: "Column",
              type: "column",
              content: [
                {
                  id: "e7d6a4b9-1c8f-4a2b-a9f0-7c4b1f9e6d2a",
                  name: "Heading3",
                  type: "heading3",
                  content: "Database Engine",
                  placeholder: "Heading 3",
                },
                {
                  id: "9f7d6b1e-4a8c-4b2a-a6f1-7e4c1b9f6d2a",
                  name: "Paragraph",
                  type: "paragraph",
                  content: "Handles data storage, retrieval, and update.",
                  placeholder: "Start typing...",
                },
              ],
            },
            {
              id: "6b4e7a9f-1c8d-4b2a-a9f0-7d2e9c4b6f1a",
              name: "Column",
              type: "column",
              content: [
                {
                  id: "1d7e6a4b-9f8c-4a2b-a6f1-7c9b4e1f7d2a",
                  name: "Heading3",
                  type: "heading3",
                  content: "Query Processor",
                  placeholder: "Heading 3",
                },
                {
                  id: "9e6a4b1f-7d8c-4a2b-a9f0-6b7c1e9f4d2a",
                  name: "Paragraph",
                  type: "paragraph",
                  content: "Executes user queries efficiently.",
                  placeholder: "Start typing...",
                },
              ],
            },
          ],
          className: "border",
        },
      ],
    },
    className: "p-4 mx-auto flex justify-center items-center",
    slideName: "Components of DBMS",
  },
  {
    id: "9e7d6a4c-1f8b-4a2b-a9f0-2b1c4f9e7d6a",
    type: "textAndImage",
    content: {
      id: "4a8b1e9d-6c7b-4a2f-a9f0-6b1f7d2c9e4a",
      name: "Column",
      type: "column",
      content: [
        {
          id: "1e7d9b6a-4f8c-4a2b-a9f0-7c4b6f1e9d2a",
          name: "Text and image",
          type: "resizable-column",
          content: [
            {
              id: "4a7e9b6f-1c8d-4a2b-a9f0-6b7d1f9c4e2a",
              name: "",
              type: "column",
              content: [
                {
                  id: "9b6a4e7d-1f8c-4a2b-a6f1-7d1c4b9f6e2a",
                  name: "Heading1",
                  type: "heading1",
                  content: "Advantages of DBMS",
                  placeholder: "Heading1",
                },
                {
                  id: "1f9e6a7d-4b8c-4a2b-a9f0-6c7b1e4f9d2a",
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "DBMS offers data integrity, security, backup and recovery, and reduced data redundancy.",
                  placeholder: "Start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
            {
              id: "7d9e6a1f-4c8b-4a2b-a9f0-6b1c7e4f9d2a",
              name: "Column",
              type: "column",
              content: [
                {
                  id: "4e7d9b6a-1c8f-4a2b-a6f1-9b1c4f7e6d2a",
                  alt: "A secure database icon with a shield and checkmark symbolizing integrity and security",
                  name: "Image",
                  type: "image",
                  content:
                    "https://ucarecdn.com/fef2a8ee-c417-4bd9-bc9a-151cff3ca09a/",
                  className: "p-3",
                },
              ],
            },
          ],
          className: "border",
        },
      ],
    },
    className: "min-h-[300px] p-8 mx-auto flex justify-center items-center",
    slideName: "Advantages of DBMS",
  },
  {
    id: "6d7f9e4b-1c8a-4a2b-a9f0-2b1e9c4f7d6a",
    type: "twoColumns",
    content: {
      id: "9e6b1f7d-4a8c-4b2a-a9f0-7c4d6e1b9f2a",
      name: "Column",
      type: "column",
      content: [
        {
          id: "1f9e7d6b-4a8c-4a2b-a9f0-7c4b6e1f9d2a",
          name: "Title",
          type: "title",
          content: "Examples of DBMS Software",
          placeholder: "Untitled Card",
        },
        {
          id: "6b1f9e7d-4c8a-4b2b-a6f0-7d4e1c9b6f2a",
          name: "Text and image",
          type: "resizable-column",
          content: [
            {
              id: "9b6f1e7d-4a8c-4a2b-a9f0-6c7d4e1b9f2a",
              name: "",
              type: "paragraph",
              content: "MySQL",
              placeholder: "Start typing...",
            },
            {
              id: "7d4e6b9f-1c8a-4a2b-a6f0-9b1c4f7e6a2b",
              name: "",
              type: "paragraph",
              content: "Oracle Database",
              placeholder: "Start typing...",
            },
            {
              id: "4b9e7d6a-1f8c-4a2b-a9f0-6b1c7e4f9d2a",
              name: "",
              type: "paragraph",
              content: "Microsoft SQL Server",
              placeholder: "Start typing...",
            },
            {
              id: "9e1f7d6b-4a8c-4a2b-a6f0-7c4b9f6e2a1d",
              name: "",
              type: "paragraph",
              content: "PostgreSQL",
              placeholder: "Start typing...",
            },
          ],
          className: "border",
        },
      ],
    },
    className: "p-4 mx-auto flex justify-center items-center",
    slideName: "Examples of DBMS",
  },
];
*/

/*
content: '```json\n' +
    '[\n' +
    '  {\n' +
    '    "id": "e4c6b1b5-3f52-4c8d-a7f9-9e2d6cbb1f8d",\n' +
    '    "slideName": "What is DBMS?",\n' +
    '    "type": "imageAndText",\n' +
    '    "className": "min-h-[300px] p-8 mx-auto flex justify-center items-center",\n' +
    '    "content": {\n' +
    '      "id": "8a4f4c0d-5f45-4aa3-b9eb-b2dbe9f6e7d2",\n' +
    '      "type": "column",\n' +
    '      "name": "Column",\n' +
    '      "content": [\n' +
    '        {\n' +
    '          "id": "b76d11c2-efc6-4e8a-a742-8c4e4e4fd4b0",\n' +
    '          "type": "resizable-column",\n' +
    '          "name": "Image and text",\n' +
    '          "className": "border",\n' +
    '          "content": [\n' +
    '            {\n' +
    '              "id": "f1b8d0a4-9ec4-4da4-b9d2-3d0e72f8c8a1",\n' +
    '              "type": "column",\n' +
    '              "name": "Column",\n' +
    '              "content": [\n' +
    '                {\n' +
    '                  "id": "3e1d7b9d-9c3d-4f4e-a8fd-4a6f0c4b1e5a",\n' +
    '                  "type": "image",\n' +
    '                  "name": "Image",\n' +
    '                  "className": "p-3",\n' +
    '                  "content": "https://via.placeholder.com/800x400?text=DBMS+Concept",\n' +
    '                  "alt": "An abstract representation of database management with interconnected nodes and a central server"\n' +
    '                }\n' +
    '              ]\n' +
    '            },\n' +
    '            {\n' +
    '              "id": "9f8d1c2e-6f52-4e9b-9c9e-7e2d6f8b2dc3",\n' +
    '              "type": "column",\n' +
    '              "name": "Column",\n' +
    '              "content": [\n' +
    '                {\n' +
    '                  "id": "8b2f1c3d-9e4a-4ea9-b8fd-7f0d9c6b1e8f",\n' +
    '                  "type": "heading1",\n' +
    '                  "name": "Heading1",\n' +
    '                  "content": "A Database Management System (DBMS)",\n' +
    '                  "placeholder": "Heading1"\n' +
    '                },\n' +
    '                {\n' +
    '                  "id": "3e9b1c2d-7f4a-4c8d-a8e9-b7f0d2c1e8f1",\n' +
    '                  "type": "paragraph",\n' +
    '                  "name": "Paragraph",\n' +
    '                  "content": "A DBMS is software that enables users to define, create, maintain, and control access to databases.",\n' +
    '                  "placeholder": "Start typing here"\n' +
    '                }\n' +
    '              ],\n' +
    '              "className": "w-full h-full p-8 flex justify-center items-center",\n' +
    '              "placeholder": "Heading1"\n' +
    '            }\n' +
    '          ]\n' +
    '        }\n' +
    '      ]\n' +
    '    }\n' +
    '  },\n' +
    '  {\n' +
    '    "id": "9b3c8f4d-6e8a-42b1-a9f1-2d7f8c1e9d6b",\n' +
    '    "slideName": "Purpose of DBMS",\n' +
    '    "type": "accentLeft",\n' +
    '    "className": "min-h-[300px]",\n' +
    '    "content": {\n' +
    '      "id": "f8b9e1c2-7d4a-4c8e-b9f0-2d6b7e4c1e9a",\n' +
    '      "type": "column",\n' +
    '      "name": "Column",\n' +
    '      "restrictDropTo": true,\n' +
    '      "content": [\n' +
    '        {\n' +
    '          "id": "2e9b1c7d-4a6f-42b8-a9f0-7d6b1e4c8f2a",\n' +
    '          "type": "resizable-column",\n' +
    '          "name": "Resizable column",\n' +
    '          "restrictToDrop": true,\n' +
    '          "content": [\n' +
    '            {\n' +
    '              "id": "4e8a1c9b-7f6d-4b2a-a9f1-8c2d7f6b1e9c",\n' +
    '              "type": "image",\n' +
    '              "name": "Image",\n' +
    '              "content": "https://via.placeholder.com/600x400?text=Data+Management",\n' +
    '              "alt": "Data being organized and analyzed in a digital interface"\n' +
    '            },\n' +
    '            {\n' +
    '              "id": "1c9b7f6d-4e8a-4f2b-a6f1-9c2d7e8b1f9d",\n' +
    '              "type": "column",\n' +
    '              "name": "Column",\n' +
    '              "content": [\n' +
    '                {\n' +
    '                  "id": "7d4a6f8c-1e9b-4b2a-a9f0-2c8f1e6d9b7f",\n' +
    '                  "type": "heading1",\n' +
    '                  "name": "Heading1",\n' +
    '                  "content": "Purpose of DBMS",\n' +
    '                  "placeholder": "Heading1"\n' +
    '                },\n' +
    '                {\n' +
    '                  "id": "4a7d6f8b-1e9c-4b2a-a8f0-2c9b1e6d7f8a",\n' +
    '                  "type": "paragraph",\n' +
    '                  "name": "Paragraph",\n' +
    '                  "content": "DBMS provides a systematic and organized way of storing, managing, and retrieving data efficiently.",\n' +
    '                  "placeholder": "Start typing here"\n' +
    '                }\n' +
    '              ],\n' +
    '              "className": "w-full h-full p-8 flex justify-center items-center",\n' +
    '              "placeholder": "Heading1"\n' +
    '            }\n' +
    '          ]\n' +
    '        }\n' +
    '      ]\n' +
    '    }\n' +
    '  },\n' +
    '  {\n' +
    '    "id": "8f6d9b7e-1e4c-4a2b-a9f0-2c9b1f8d7e6a",\n' +
    '    "slideName": "Types of DBMS",\n' +
    '    "type": "threeColumns",\n' +
    '    "className": "p-4 mx-auto flex justify-center items-center",\n' +
    '    "content": {\n' +
    '      "id": "9b7e6a1c-4f8d-4a2b-a6f1-7d9e4c8b2f1a",\n' +
    '      "type": "column",\n' +
    '      "name": "Column",\n' +
    '      "content": [\n' +
    '        {\n' +
    '          "id": "6d9b7e1c-4f8a-4b2a-a9f0-7e6a4c1f9b2d",\n' +
    '          "type": "title",\n' +
    '          "name": "Title",\n' +
    '          "content": "Types of Database Management Systems",\n' +
    '          "placeholder": "Untitled Card"\n' +
    '        },\n' +
    '        {\n' +
    '          "id": "2f8b7e1d-4a6c-49b2-a9f0-1c9e7d6a4b8f",\n' +
    '          "type": "resizable-column",\n' +
    '          "name": "Text and image",\n' +
    '          "className": "border",\n' +
    '          "content": [\n' +
    '            {\n' +
    '              "id": "4c9b7e6a-1f8d-4b2a-a6f1-7e8a4d1f9b2c",\n' +
    '              "type": "paragraph",\n' +
    '              "name": "Paragraph",\n' +
    '              "content": "Hierarchical DBMS",\n' +
    '              "placeholder": "Start typing..."\n' +
    '            },\n' +
    '            {\n' +
    '              "id": "7f6a4b8d-1e9c-4a2b-a6f1-9e7c4d1f8b2a",\n' +
    '              "type": "paragraph",\n' +
    '              "name": "Paragraph",\n' +
    '              "content": "Network DBMS",\n' +
    '              "placeholder": "Start typing..."\n' +
    '            },\n' +
    '            {\n' +
    '              "id": "9b8f6a4c-1e7d-4a2b-a9f0-6e4c1f9b7d2a",\n' +
    '              "type": "paragraph",\n' +
    '              "name": "Paragraph",\n' +
    '              "content": "Relational DBMS",\n' +
    '              "placeholder": "Start typing..."\n' +
    '            },\n' +
    '            {\n' +
    '              "id": "7e6a4b9f-1c8d-4a2b-a6f1-9b7d4c1f8e2a",\n' +
    '              "type": "paragraph",\n' +
    '              "name": "Paragraph",\n' +
    '              "content": "Object-oriented DBMS",\n' +
    '              "placeholder": "Start typing..."\n' +
    '            }\n' +
    '          ]\n' +
    '        }\n' +
    '      ]\n' +
    '    }\n' +
    '  },\n' +
    '  {\n' +
    '    "id": "7f9e6b1c-4a2d-4b8f-a9f0-2c6a1e7d4b9f",\n' +
    '    "slideName": "Components of DBMS",\n' +
    '    "type": "twoColumnsWithHeadings",\n' +
    '    "className": "p-4 mx-auto flex justify-center items-center",\n' +
    '    "content": {\n' +
    '      "id": "9e7d6a4b-1f8c-4a2b-a9f0-6b1c4f9e7d2a",\n' +
    '      "type": "column",\n' +
    '      "name": "Column",\n' +
    '      "content": [\n' +
    '        {\n' +
    '          "id": "6a4b9e7d-1f8c-4a2b-a9f0-7d1c4f9e6b2a",\n' +
    '          "type": "title",\n' +
    '          "name": "Title",\n' +
    '          "content": "Key Components of a DBMS",\n' +
    '          "placeholder": "Untitled Card"\n' +
    '        },\n' +
    '        {\n' +
    '          "id": "4b9e6a1c-7f8d-4a2b-a9f0-1e7d6c4b9f2a",\n' +
    '          "type": "resizable-column",\n' +
    '          "name": "Text and image",\n' +
    '          "className": "border",\n' +
    '          "content": [\n' +
    '            {\n' +
    '              "id": "1f7d9e6b-4a8c-4b2a-a9f0-6a4c7e9b1d2a",\n' +
    '              "type": "column",\n' +
    '              "name": "Column",\n' +
    '              "content": [\n' +
    '                {\n' +
    '                  "id": "e7d6a4b9-1c8f-4a2b-a9f0-7c4b1f9e6d2a",\n' +
    '                  "type": "heading3",\n' +
    '                  "name": "Heading3",\n' +
    '                  "content": "Database Engine",\n' +
    '                  "placeholder": "Heading 3"\n' +
    '                },\n' +
    '                {\n' +
    '                  "id": "9f7d6b1e-4a8c-4b2a-a6f1-7e4c1b9f6d2a",\n' +
    '                  "type": "paragraph",\n' +
    '                  "name": "Paragraph",\n' +
    '                  "content": "Handles data storage, retrieval, and update.",\n' +
    '                  "placeholder": "Start typing..."\n' +
    '                }\n' +
    '              ]\n' +
    '            },\n' +
    '            {\n' +
    '              "id": "6b4e7a9f-1c8d-4b2a-a9f0-7d2e9c4b6f1a",\n' +
    '              "type": "column",\n' +
    '              "name": "Column",\n' +
    '              "content": [\n' +
    '                {\n' +
    '                  "id": "1d7e6a4b-9f8c-4a2b-a6f1-7c9b4e1f7d2a",\n' +
    '                  "type": "heading3",\n' +
    '                  "name": "Heading3",\n' +
    '                  "content": "Query Processor",\n' +
    '                  "placeholder": "Heading 3"\n' +
    '                },\n' +
    '                {\n' +
    '                  "id": "9e6a4b1f-7d8c-4a2b-a9f0-6b7c1e9f4d2a",\n' +
    '                  "type": "paragraph",\n' +
    '                  "name": "Paragraph",\n' +
    '                  "content": "Executes user queries efficiently.",\n' +
    '                  "placeholder": "Start typing..."\n' +
    '                }\n' +
    '              ]\n' +
    '            }\n' +
    '          ]\n' +
    '        }\n' +
    '      ]\n' +
    '    }\n' +
    '  },\n' +
    '  {\n' +
    '    "id": "9e7d6a4c-1f8b-4a2b-a9f0-2b1c4f9e7d6a",\n' +
    '    "slideName": "Advantages of DBMS",\n' +
    '    "type": "textAndImage",\n' +
    '    "className": "min-h-[300px] p-8 mx-auto flex justify-center items-center",\n' +
    '    "content": {\n' +
    '      "id": "4a8b1e9d-6c7b-4a2f-a9f0-6b1f7d2c9e4a",\n' +
    '      "type": "column",\n' +
    '      "name": "Column",\n' +
    '      "content": [\n' +
    '        {\n' +
    '          "id": "1e7d9b6a-4f8c-4a2b-a9f0-7c4b6f1e9d2a",\n' +
    '          "type": "resizable-column",\n' +
    '          "name": "Text and image",\n' +
    '          "className": "border",\n' +
    '          "content": [\n' +
    '            {\n' +
    '              "id": "4a7e9b6f-1c8d-4a2b-a9f0-6b7d1f9c4e2a",\n' +
    '              "type": "column",\n' +
    '              "name": "",\n' +
    '              "content": [\n' +
    '                {\n' +
    '                  "id": "9b6a4e7d-1f8c-4a2b-a6f1-7d1c4b9f6e2a",\n' +
    '                  "type": "heading1",\n' +
    '                  "name": "Heading1",\n' +
    '                  "content": "Advantages of DBMS",\n' +
    '                  "placeholder": "Heading1"\n' +
    '                },\n' +
    '                {\n' +
    '                  "id": "1f9e6a7d-4b8c-4a2b-a9f0-6c7b1e4f9d2a",\n' +
    '                  "type": "paragraph",\n' +
    '                  "name": "Paragraph",\n' +
    '                  "content": "DBMS offers data integrity, security, backup and recovery, and reduced data redundancy.",\n' +
    '                  "placeholder": "Start typing here"\n' +
    '                }\n' +
    '              ],\n' +
    '              "className": "w-full h-full p-8 flex justify-center items-center",\n' +
    '              "placeholder": "Heading1"\n' +
    '            },\n' +
    '            {\n' +
    '              "id": "7d9e6a1f-4c8b-4a2b-a9f0-6b1c7e4f9d2a",\n' +
    '              "type": "column",\n' +
    '              "name": "Column",\n' +
    '              "content": [\n' +
    '                {\n' +
    '                  "id": "4e7d9b6a-1c8f-4a2b-a6f1-9b1c4f7e6d2a",\n' +
    '                  "type": "image",\n' +
    '                  "name": "Image",\n' +
    '                  "className": "p-3",\n' +
    '                  "content": "https://via.placeholder.com/700x400?text=Advantages+o'
*/
