import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const todohere = document.getElementById("todohere");
  const todovalue = document.getElementById("todovalue")

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const togglefinished = (e)=>{
    setshowfinished(!showfinished)
  }


  const savetolocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleedit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newtodos)
    savetolocal()
  }

  const handledelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newtodos)
    savetolocal()
  }

  const handleadd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
    console.log(todos)
    savetolocal()
  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    setTodos(newtodos)
    savetolocal()
  }

  const handlechange = (e) => {
    setTodo(e.target.value)
    savetolocal()
  }

  const handlereset = () => {
    setTodo("");
    setTodos([]);
    localStorage.removeItem("todos");
  }

  return (
    <>
      <nav className='navbar p-2 bg-purple-600 text-white flex justify-between'>
        <div className="navbarhere w-[60vw] m-auto flex justify-between max-sm:w-full max-sm:p-2">
          <div className="nav1 font-bold">
            iTask
          </div>
          <div className="navtwo flex gap-2">
            <div onClick={handlereset} className="nav2 text-[15px] cursor-pointer hover:font-bold transition-all bg-blue-500 hover:bg-blue-600 rounded-full w-20 h-7 flex items-center justify-center">
              Home
            </div>
            <div className="nav3 text-[15px] cursor-pointer hover:font-bold transition-all bg-blue-500 hover:bg-blue-600 rounded-full w-20 h-7 flex items-center justify-center">
              Your Tasks
            </div>
          </div>
        </div>
      </nav>
      <div className="mainbody">
        <div className="mainbodyhere w-[60vw] m-auto bg-purple-300 rounded-2xl mt-4 p-2 max-sm:w-[90vw] max-sm:p-3 max-sm:m-auto max-sm:mt-2 max-sm:h-full">
          <div className="title font-black cursor-default text-[26px] max-sm:text-[20px] text-center w-full">
            iTask - Manage your todos at one place
          </div>
          <div className="subtitle mt-1 items-start text-black font-bold text-[18px] max-sm:text-[14px]">
            Add a Todo
          </div>
          <div className="input flex items-center justify-between gap-2 mt-2 max-sm:flex-col">

            <input onChange={handlechange} value={todo} id='todohere' type="text" placeholder='Enter your todo here' className='p-2 rounded-full w-[30vw] max-sm:w-full outline-none bg-white h-7' />

            <button className='font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full cursor-pointer w-20 h-7 items-center text-center max-sm:w-full' onClick={handleadd}>
              Save
            </button>

          </div>
          <div className="showbtn mt-3">
            <input type='checkbox' checked={showfinished} onChange={togglefinished}></input>
            <label className='pl-1'>Show Finished</label>
          </div>
          <div className="line border mt-3 mb-3 border-gray-400 "></div>

          <div className="yourtodos">
            <div className="todostitle font-bold text-[18px]">
              Your Todos
            </div>
            <div className="hidetodos">
              {todos.length === 0 && <div className="cursor-default text-slate-500">No todos to display</div>}
              {todos.map((item, index) => {
                return (showfinished || !item.iscompleted) && <div key={item.id} className="list justify-between flex">
                  <div className="todobox mt-2">
                    <input type='checkbox' checked={item.iscompleted} name={item.id} id='' onChange={handlecheckbox}></input>
                    <label id='todovalue' className={item.iscompleted ? "line-through" : "ml-1"}>{item.todo}</label>
                  </div>
                  <div className="btns flex gap-2">
                    <button onClick={(e) => handleedit(e, item.id)} className='editbtn h-6 w-6 cursor-pointer'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <rect width="48" height="48" rx="12" fill="#9333EA" />
                        <path
                          d="M16 32H20L31 21C31.8 20.2 31.8 18.9 31 18.1L29.9 17C29.1 16.2 27.8 16.2 27 17L16 28V32Z"
                          fill="white"
                        />

                        <path
                          d="M26.5 17.5L30.5 21.5"
                          stroke="#9333EA"
                          stroke-width="1.8"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                    <button onClick={(e) => { handledelete(e, item.id) }} className='deletebtn h-6 w-6 cursor-pointer'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <rect width="48" height="48" rx="12" fill="#9333EA" />
                        <path
                          d="M18 20H30"
                          stroke="white"
                          stroke-width="2.5"
                          stroke-linecap="round"
                        />

                        <path
                          d="M21 20V17C21 15.9 21.9 15 23 15H25C26.1 15 27 15.9 27 17V20"
                          stroke="white"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />

                        <path
                          d="M22 24V31"
                          stroke="white"
                          stroke-width="2.5"
                          stroke-linecap="round"
                        />

                        <path
                          d="M26 24V31"
                          stroke="white"
                          stroke-width="2.5"
                          stroke-linecap="round"
                        />

                        <path
                          d="M20 20L21 33C21.1 34.1 22 35 23.1 35H24.9C26 35 26.9 34.1 27 33L28 20"
                          stroke="white"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

              })}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
