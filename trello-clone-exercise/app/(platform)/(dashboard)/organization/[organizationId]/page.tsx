import { Board } from "./board";
import { Form } from "./form";

import { db } from "@/lib/db";

const OrganizatioIdPage = async () => {

  const boards = await db.board.findMany();

  return(
    <div className="flex flex-col spacy-y-4">
        <Form />
      <div className="space-y-2">
        {boards.map((board) => (
          <Board key={board.id} title={board.title} id={board.id}/>
        ))}

      </div>
    </div>
  );
};

export default OrganizatioIdPage;
