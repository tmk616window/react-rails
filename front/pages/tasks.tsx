import React, { useEffect, useContext, useState } from "react";
import {getTasks} from '../src/api/task/GetTasks'
import Image from 'next/image'
import Logo from '../img/logo.png'
import {Task, ProlLanguage} from '../src/type/interfaces'
import Link from 'next/link';
import {displayImage} from '../src/api/common/DisplayImage'
import  {api}  from '../src/contexts/api'

export const  TaskList = () => {
  const[tasks, setTasks] = useState<any>([])
  useEffect( () => {
    (async() => {
      const gtasks = await getTasks()
      if(gtasks.status == 200) {
        setTasks(gtasks.data.tasks)
      }
    })()
  }, []);

  return (
      <div >
        <ul className="list-group">
        <h1>一覧</h1>
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
