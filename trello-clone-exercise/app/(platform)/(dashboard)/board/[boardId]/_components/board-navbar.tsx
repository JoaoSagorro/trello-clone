import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

interface BoardNavbarProps {
  id: string;
}


export const BoardNavbar = async ({
  id,
}: BoardNavbarProps) => {

  const { orgId } = auth();

  const board = await db.board.findUnique({
    where: {
      id,
      orgId: orgId!,
    },
  });

  return(
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 text-white">
      Board Navbar!
    </div>
  );
};