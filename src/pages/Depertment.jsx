import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UpdateNameForm } from "../components/Form/UpdateNameForm";
import { UpdateDescriptionForm } from "../components/Form/UpdateDescriptionForm";
import { DeleteNameForm } from "../components/Form/DeleteNameForm";
import { URL } from "./Departments";

export function Department() {
  const [department, setDepartment] = useState({});
  const [state, setState] = useState("loading");
  
  const { slug } = useParams();
  
  async function fetchData() {
    try {
      const response = await fetch(`${URL}${slug}`);
      
      if (!response.ok) {
        throw new Error("not ok");
      }
      
      const json = await response.json();
      setDepartment(json);
      setState("data");
    } catch (e) {
      setState("error");
      console.log(e);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  function tester(){
    console.log('sækja gögn')
    fetchData();
  }

  if (state === "error") {
    return <p>Villa við að sækja deild.</p>;
  }

  if (state === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <Link
          to={{
            pathname: `courses/`,
          }}
        >
          {department.title}
        </Link>
        <UpdateNameForm callback={tester} />
        <p>{department.description}</p>
        <UpdateDescriptionForm callback={tester}/>
        <DeleteNameForm callback={tester}/>
      </section>
      <div>
      </div>
    </>
  );
}

export default Department;
