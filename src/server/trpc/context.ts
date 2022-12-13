import type { inferAsyncReturnType } from "@trpc/server";
import type { createSolidAPIHandlerContext } from "solid-start-trpc";
import { prisma } from "~/server/db/client";
import { authenticator } from "../auth";

export const createContextInner = async (
  opts: createSolidAPIHandlerContext
) => {
  const user = await authenticator.isAuthenticated(opts.req);
  return {
    ...opts,
    prisma,
    user,
  };
};

export const createContext = async (opts: createSolidAPIHandlerContext) => {
  return await createContextInner(opts);
};

export type IContext = inferAsyncReturnType<typeof createContext>;
