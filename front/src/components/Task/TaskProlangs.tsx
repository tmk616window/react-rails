import {useState, useEffect} from 'react'
import {getProLangs} from '../../api/prolang/GetProLang'
import {ProlLanguage, User} from '../../type/interfaces'
import {destroyProLang} from '../../api/prolang/DestroyProLang'
import Cookies from 'js-cookie'
import {getTask} from '../../api/task/GetTask'
import Image from 'next/image'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    TextField,
    IconButton,
    Grid
} from '@material-ui/core';
import {createProLang} from '../../api/prolang/CreateProLang'
import DeleteIcon from '@material-ui/icons/Delete';
interface Props{
  proLanguages: ProlLanguage[]
  taskId: number
  taskUser: User | undefined
  setProLanguages: any
  currentUser: User
}
const TaskProlangs:React.FC<Props> = ({proLanguages, taskId, taskUser, setProLanguages, currentUser}) => {
  const [proLangs, setProLangs] = useState<ProlLanguage[]>(proLanguages)
  useEffect( () => {
    setProLangs(proLanguages)
  }, []);
console.log("proLanguages", proLanguages)
const [form, setForm] = useState<string>("")

const destroyContent = async (index:number, proLanguage:ProlLanguage) => {
  destroyProLang(proLangs[index].id)
  proLangs.splice(index, 1)
  setProLangs(proLangs.filter((x:ProlLanguage) => x !== proLanguage)) 
}

const addContent = async () => {
  const prolong = (await createProLang(form, taskId)).data.prolong
  setProLangs([...proLangs, prolong]);
  setForm("")
};

const aproLangs = () => {
  if (taskUser?.email === taskUser?.email) {
    return (
    <>
      {proLangs.map((proLanguage:ProlLanguage, index:number) =>
        <p key={index} className="article">{proLanguage.language}< IconButton onClick={() =>destroyContent(index, proLanguage)}><DeleteIcon fontSize="small"/></IconButton></p>
      )}
      <Divider />
      <CardActions>
        <input value={form} onChange={(e) => setForm(e.target.value)}/>
        <Button onClick={() =>addContent()}>追加</Button>
      </CardActions>
    </>
    );
  } else {
    return (
    <>
      {proLanguages.map((proLanguage:ProlLanguage, index:number) =>
        <p key={index} className="article">{proLanguage.language}</p>
      )}
    </>
    );
  }
};

return (
  <>
    <Card>
      <CardContent>
      <h4>プログラミング言語</h4>
        {aproLangs()}
        
      </CardContent>
    </Card>
  </>
  )
};
  
  
export default TaskProlangs