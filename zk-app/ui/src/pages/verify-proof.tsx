import Sidebar from "@/components/Sidebar";
import { RequirementsFormInput } from "@/util";
import { useState } from "react";

export default function VerifyProofs({ submitVerifyProofs }: { submitVerifyProofs: (requirementsJson: string) => void }) {
  let [requirementsJson, setRequirementsJson] = useState("");

  return (
    <form
      className="main-form"
      onSubmit={(e: any) => {
        submitVerifyProofs(requirementsJson)
        e.preventDefault();
      }}
    >


      <div className="organization-id mt-5">
        <h3>Requirements JSON</h3>
        <input
          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="condition-1"
          type="text"
          placeholder="{...}"
          onChange={(e) => {
            setRequirementsJson(e.target.value);
          }}
        ></input>
      </div>

      <div className='mt-16'>
        <button
          className="button-main right hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Verify proof
        </button>
      </div>
    </form>
  );
};
