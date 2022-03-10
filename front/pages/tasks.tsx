import React, { useEffect, useState } from "react";
import {getTasks} from '../src/api/task/GetTasks'
import Image from 'next/image'
import Logo from '../img/logo.png'
import {Task, ProLang} from '../src/type/interfaces'
import Link from 'next/link';
import {displayImage} from '../src/api/common/DisplayImage'
//サーバーサイドレンダリング
export async function getServerSideProps() {
  const tasks = (await getTasks()).data
  console.log(tasks)
  return {
    props: {
      tasks: tasks,
    }
  }
}


export const TaskList = (props:any) => {
  // const[tasks, setTasks] = useState<Task[]>([])

  const tasks = props.tasks.tasks

    return (
      <div >
        <ul className="list-group">
          {tasks.map((task:Task ,index:number)=> (
            <Link href={{ pathname: '/task', query: { id: task.id } }}>
            <li key={index} className="list-group-item list-group-item-primary list-item" >
              <div className="item-image">
                <img src={displayImage(`https://enjob.work/${task.logoImage?.url}`)} alt="..." width = "250" height="250" className="logo-image" />
              </div>
              <div className="item-content">
                <h1>{task.title}</h1>
                <p>ポートフォリオ概要</p>
                <p className="description">{task.description}</p>
                <p>使用技術</p>
                <div className="langArticle">
                {task.prolongs.map((proLang:ProLang ,index:number)=> (  
                  <span className="article" key={index}>{proLang.lange}</span>
                ))}
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
