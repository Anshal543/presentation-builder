"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { OutlineCard } from "@/lib/types";
import { JsonValue } from "@prisma/client/runtime/library";

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    if (projects.length === 0) {
      return { status: 404, error: "No projects found" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    // Fetch the recent prompts for the user
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });

    if (projects.length === 0) {
      return { status: 404, error: "No recent prompts found" };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }
    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: false,
      },
    });
    if (!updatedProject) {
      return { status: 500, error: "Failed to recover project" };
    }

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }
    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: true,
      },
    });
    if (!updatedProject)
      return { status: 500, error: "Failed to delete project" };
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || !outlines || outlines.length == 0) {
      return { status: 400, error: "Title and outlines are required." };
    }
    const allOutlines = outlines.map((outline) => outline.title);

    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }
    const project = await client.project.create({
      data: {
        title,
        outlines: allOutlines,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: checkUser.user.id,
      },
    });

    if (!project) {
      return { status: 500, error: "Failed to create project" };
    }
    return { status: 200, data: project };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }
    const project = await client.project.findFirst({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      return { status: 404, error: "Project not found" };
    }

    return { status: 200, data: project };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const updateTheme = async (projectId: string, theme: string) => {
  try {
    // Validate input
    if (!projectId || !theme) {
      return { status: 400, error: "Project ID and slides are required." };
    }

    // Update the project with the new slides
    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        themeName: theme,
      },
    });

    if (!updatedProject) {
      return { status: 500, error: "Failed to update slides" };
    }

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const updateSlides = async (projectId: string, slides: JsonValue) => {
  try {
    if (!projectId || !slides) {
      return { status: 400, error: "ProjectId and slide is required" };
    }
    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        slides,
      },
    });
    if (!updatedProject) {
      return { status: 500, error: "cannot update slides" };
    }
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const getDeletedProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    // Fetch the deleted projects for the user
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length === 0) {
      return { status: 200, message: "No deleted projects found", data: [] };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const deleteAllProjects = async (projectIds: string[]) => {
  try {
    console.log("Deleting all projects with IDs:", projectIds);

    // Validate input
    if (!Array.isArray(projectIds) || projectIds.length === 0) {
      return { status: 400, error: "No project IDs provided." };
    }

    // Authenticate user
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated." };
    }

    const userId = checkUser.user.id;

    // Ensure projects belong to the authenticated user
    const projectsToDelete = await client.project.findMany({
      where: {
        id: {
          in: projectIds,
        },
        userId: userId, // Only delete projects owned by this user
      },
    });

    if (projectsToDelete.length === 0) {
      return { status: 404, error: "No projects found for the given IDs." };
    }

    // Delete the projects
    const deletedProjects = await client.project.deleteMany({
      where: {
        id: {
          in: projectsToDelete.map((project) => project.id),
        },
      },
    });

    console.log("Deleted projects count:", deletedProjects.count);

    return {
      status: 200,
      message: `${deletedProjects.count} projects successfully deleted.`,
    };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error." };
  }
};

//get All Sellable projects
export const getSellableProjects = async () => {
  try {
    console.log("Fetching sellable projects");
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    // Fetch the sellable projects
    const projects = await client.project.findMany({
      where: {
        isSellable: true,
      },
    });

    if (projects.length === 0) {
      return { status: 404, error: "No sellable projects found" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};
