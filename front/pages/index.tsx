import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Top from '../src/components/top'
import {execTest} from '../src/api/test'
import {useEffect} from 'react'
import {getProLangs} from '../src/api/prolang/GetProLang'

//サーバーサイドレンダリング
export async function getServerSideProps() {
  const rTasks = (await execTest()).data
  console.log(rTasks)
  return {
    props: {
      rTasks: rTasks,
    }
  }
}


const Home: NextPage =  (props:any) => {
  const rTasks = props.rTasks.task
  console.log(rTasks)
  
  return (
    <>
          <Top rTasks={rTasks}/>
    </>
  )
}

export default Home
