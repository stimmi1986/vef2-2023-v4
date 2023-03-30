import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { URL } from "./Departments";

import { ButtonOnClick } from "../components/Button/ButtonOnClick"
import { ButtonOnSubmitTitle } from '../components/Button/ButtonOnSubmitTitle'
import { ButtonOnSubmitDescription } from '../components/Button/ButtonOnSubmitDescription'


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
          <h2>{department.title}</h2>
        </Link>
        <p>{department.description}</p><br />
        <ButtonOnSubmitTitle callback={tester} method={'PATCH'}  fetchUrl={`${URL}${slug}`}  buttonName={'breyta nafn á deild'} errorName={'villa við að breyta nafni á deild'} nameOfClass={'prim'} inputName={'Breyta nafn á deild'} />
        <ButtonOnSubmitDescription callback={tester} method={'PATCH'} fetchUrl={`${URL}${slug}`}  buttonName={'breyta upplýsingum um deild '} errorName={'villa við að breyta upplýsingum'} nameOfClass={'prim'} inputName={'Breyta upplýsingum um deild'} />
        <ButtonOnClick  callback={tester} method={'DELETE'} fetchUrl={`${URL}${slug}`} buttonName={'viltu eyða Deild'} errorName={'deild'} nameOfClass={'sec'}  />
      </section>
      <div>
      </div>
    </>
  );
}

export default Department;
