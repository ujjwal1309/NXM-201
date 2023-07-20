import React, { useEffect, useState } from "react";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async() => {
    try{
        let responseDto = await fetch(`https://jsonplaceholder.typicode.com/todos`)
        responseDto = await responseDto.json()
        setTodos(responseDto)
    }
    catch(e){
        throw new Error(e)
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  console.log(todos)

  return (
    <div>
        <h1>My todos</h1>
      {todos.map((el) => (
        <div>
            <h1>{el.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default Home;
