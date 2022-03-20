import {useState, useEffect} from 'react'
import {Tool, User} from '../../type/interfaces'
import Logo from '../../../img/logo.png'
import Image from 'next/image'
import {destroyTool} from '../../api/tool/DestroyTool'
import Cookies from 'js-cookie'
import {getTask} from '../../api/task/GetTask'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    IconButton,
    Grid
  } from '@material-ui/core';
  import {createTool} from '../../api/tool/CreatTool'
  import DeleteIcon from '@material-ui/icons/Delete';

interface Props{
  tools: Tool[]
  setTools: any
  taskId: string | string[] | undefined
  taskUser: User | undefined
  currentUser: User
}
  
  
 const TaskTools:React.FC<Props> = ({tools, setTools, taskId, taskUser, currentUser}) => {
  const [toolForm, setToolForm] = useState<string>("")

  const deleteContent = async (index:number, tool:Tool) => {
    destroyTool(tools[index].id)
    tools.splice(index, 1)
    setTools(tools.filter((x:Tool) => x !== tool))
  }

  const addContent = async () => {
    const tool = (await createTool(toolForm, taskId)).data.tool
    setTools([...tools, tool])
    setToolForm("")
  };
  
  const atools = () => {
    if (taskUser?.email === taskUser?.email) {
      return (
        <>
          {tools.map((tool:Tool, index:number) =>
            <p key={index} className="toolArticle">{tool.name}< IconButton onClick={() =>deleteContent(index, tool)}><DeleteIcon fontSize="small"/></IconButton></p>
          )}
          <Divider />
          <CardActions>
            <input value={toolForm} onChange={(e) => setToolForm(e.target.value)}/>
            <Button onClick={() =>addContent()}>追加</Button>
          </CardActions>
        </>
      );
    } else {
      return (
        <>
          {tools.map((tool:Tool, index:number) =>
            <p key={index} className="toolArticle">{tool.name}</p>
          )}
        </>
      );
    }
  }
  return (
    <>
    <Card>
      <CardContent>
      <h4>使用ツール</h4>
      {atools()}
     </CardContent>      
    </Card>
    </>
  )
};
  
export default TaskTools
  