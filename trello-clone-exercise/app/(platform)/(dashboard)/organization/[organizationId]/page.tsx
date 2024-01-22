import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";

const OrganizatioIdPage = () => {
  return(
    <div>
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"/>
          <Button type="submit">
            Submit
          </Button>
      </form>
    </div>
  );
};

export default OrganizatioIdPage;
