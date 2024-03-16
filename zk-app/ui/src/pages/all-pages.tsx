import { RequirementsFormInput } from "@/util";
import NewReport from "./index";
import NewRequest from "./new-request";
import Organization from "./organization";

export default function AllPages() {
  return (
    <div>
      <NewReport/>
      <NewRequest submitRequest={function (x: RequirementsFormInput): void {
        throw new Error("Function not implemented.");
      } }/>
      <Organization/>
    </div>
  )
}
