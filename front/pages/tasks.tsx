import React, { useEffect, useContext } from "react";
import { AuthContext } from "./_app"
import {getTasks} from '../src/api/task/GetTasks'
import Image from 'next/image'
import Logo from '../img/logo.png'
import {Task, ProLang} from '../src/type/interfaces'
import Link from 'next/link';
import {displayImage} from '../src/api/common/DisplayImage'
import  api  from '../src/contexts/api'

//サーバーサイドレンダリング
export async function getServerSideProps() {
  const tasks = (await api.get('/api/session')).data
  

  return {
    props: {
      tasks: tasks,
    }
  }
}


export const TaskList = (props:any) => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
    useEffect(() => {
      const tasks = api.get('/api/session')
      console.log(tasks)  
    console.log(isSignedIn, currentUser)
  }, []);



    return (
      <div >
        {/* <ul className="list-group">
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
                </div>
              </div>
            </li>
            </Link>
          ))}
        </ul> */}
      </div>
    );
  }

export default TaskList;
