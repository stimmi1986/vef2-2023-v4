/*import { useEffect, useState } from "react";

export const URL = process.env.REACT_APP_API_URL;

export function Dep() {
  const [departments, setDepartments] = useState([{}]);
  
  useEffect(() => {
    async function fetchData() {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error("not ok");
        }

        const json = await response.json();
        setDepartments(json);
    } 

    fetchData();  
  }, []);

    console.log('departments: ', departments)

};

return(
  
  return (
    <section>
      <h2>{titleName}</h2>
      {state === "empty" && <p>engar deildir</p>}
      {state === "error" && <p>villa við að sækja deildir</p>}
      {state === "loading" && <p>Loading...</p>}
      <ul>
        {state === "data" &&
          departments.map((department, i) => {
            return (
              <div key={i}>
                <li>
                <Link
                  to={{
                    pathname: `/departments/${departments}/`,
                  }}
                >
                  {department.title}
                  {console.log(departments)}
                </Link>
                <Dep />
                </li>                
              </div>
            );
          })}
      </ul>
      <DepartmentForm />
    </section>
  );
};
)
*/