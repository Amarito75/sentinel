import prismadb from "@/lib/prismadb";

export async function getEmails(userId: string) {
  const emails = await prismadb.email.findMany({
    where: {
      user: {
        userId: userId,
      },
    },
  });

  return emails;
}
