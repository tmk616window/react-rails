import type { NextPage } from 'next'
import Top from '../src/components/top'
import {execTest} from '../src/api/test'
import {useEffect, useState} from 'react'
import {Task} from '../src/type/interfaces'
import  {api}  from '../src/contexts/api'

const Home: NextPage =  () => {
  return (
    <>
      <Top/>
    </>
  )
}

export default Home
