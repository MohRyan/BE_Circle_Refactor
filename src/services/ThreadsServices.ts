import { threadId } from "worker_threads";
import db from "../db";
import { Threads } from "../entities";
import { Ithreads } from "../interfaces/index";

export const getThreads = async () => {
  return await db.thread.findMany({
    where: {
      threadId: null,
    },
    include: {
      image: {
        select: {
          image: true,
        },
      },
      author: {
        select: {
          id: true,
          full_name: true,
          username: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
      like: {
        select: {
          threadId: true,
        },
      },
      _count: {
        select: {
          replies: true,
          like: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};
export const getPostAt = async () => {
  return await db.thread.findMany({
    where: {
      threadId: null,
    },
    select: {
      posted_at: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const getThread = async (id: number) => {
  return await db.thread.findFirst({
    where: {
      id,
      threadId: null,
    },
    include: {
      image: {
        select: {
          image: true,
        },
      },
      author: {
        select: {
          full_name: true,
          username: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          replies: true,
          like: true,
        },
      },
      like: {
        select: {
          threadId: true,
        },
      },
      replies: {
        select: {
          content: true,
          posted_at: true,
          userId: true,
          author: {
            select: {
              full_name: true,
              username: true,
              profile: {
                select: {
                  avatar: true,
                },
              },
            },
          },
          image: true,
        },
      },
    },
  });
};

export const getThreadByUserId = async (userId: number) => {
  return await db.thread.findMany({
    where: {
      userId,
      threadId: null,
    },
    include: {
      image: {
        select: {
          image: true,
        },
      },
      author: {
        select: {
          id: true,
          full_name: true,
          username: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const getThreadById = async (id: number) => {
  console.log("🚀 ~ getThreadById ~ id:", id);
  return await db.thread.findMany({
    where: {
      userId: id,
    },
    include: {
      image: {
        select: {
          image: true,
        },
      },
      author: {
        select: {
          id: true,
          full_name: true,
          username: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const createThread = async (
  payload: Ithreads,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  const thread = await db.thread.create({
    data: {
      ...payload,
      threadId: payload.threadId ? +payload.threadId : null,
    },
  });

  console.log(files.image);
  if (files.image) {
    await db.threadImage.createMany({
      data: files.image.map((image) => ({
        image: image.filename,
        threadId: thread.id,
      })),
    });
  }

  return thread;
};

export const deleteThread = async (idThread: number, userId: number) => {
  const existedThread = await db.thread.findFirst({
    where: {
      id: idThread,
    },
  });

  if (!existedThread) {
    throw new Error("Thread Not Found");
  }

  if (existedThread.userId !== userId) {
    throw new Error("You don't have permission to delete this thread");
  }

  await db.thread.delete({
    where: {
      id: idThread,
    },
  });

  await db.threadImage.deleteMany({
    where: {
      threadId: idThread,
    },
  });

  return true;
};

export const getReplies = async (threadId: number) => {
  return await db.thread.findMany({
    where: {
      threadId,
    },
    include: {
      image: {
        select: {
          image: true,
        },
      },
      _count: {
        select: {
          replies: true,
          like: true,
        },
      },
    },
  });
};
