import { BoardList } from "./_components/board-list";
import { Info } from "./_components/info";

import { Separator } from "@/components/ui/separator";


const OrganizatioIdPage = async () => {

  return(
    <div className="w-ful mb-20">
      <Info />
      <Separator className="my-4"/>
      <div className="px-2 md:px4">
        <BoardList />
      </div>
    </div>
  );

};

export default OrganizatioIdPage;
