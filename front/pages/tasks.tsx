import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "./_app"
import {getTasks} from '../src/api/task/GetTasks'
import Image from 'next/image'
import Logo from '../img/logo.png'
import {Task, ProLang} from '../src/type/interfaces'
import Link from 'next/link';
import {displayImage} from '../src/api/common/DisplayImage'
import  api  from '../src/contexts/api'
import axios from 'axios' 
import useSWR from 'swr';

//サーバーサイドレンダリング
export async function getServerSideProps() {
  const tasks = (await api.get("http://nginx/api/tasks")).data
  return {
    props: {
      task: {data: tasks},
      tasks: tasks,
    }
  }
}


export const TaskList = (props:any) => {
  // const tasks = props
  const[tasks, setTasks] = useState<any>([])
  useEffect(() => {
    api.get("http://localhost:8080/api/tasks")
    .then((res:any) => {
      setTasks(res.data.tasks)
    })
  }, []);
  console.log(tasks)

  return (
      <div >
        <ul className="list-group">
          {tasks.map((task:Task ,index:number)=> (
            <Link href={{ pathname: '/task', query: { id: task.id } }}>
            <li key={index} className="list-group-item list-group-item-primary list-item" >
              <div className="item-content">
                <h1>{task.title}</h1>
                <p>ポートフォリオ概要</p>
                <div className="langArticle">
                </div>
              </div>
            </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }

export default TaskList;
