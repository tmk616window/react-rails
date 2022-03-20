import {useState} from 'react'
import {ProlLanguage, User} from '../../type/interfaces'
import {destroyProLanguage} from '../../api/prolang/DestroyProLang'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
} from '@material-ui/core';
import {createProLanguage} from '../../api/prolang/CreateProlLanguage'
import DeleteIcon from '@material-ui/icons/Delete';
interface Props{
  proLanguages: ProlLanguage[]
  setProLanguages: any
  taskId: string | string[] | undefined
  taskUser: User | undefined
  currentUser: User
}
const TaskProlangs:React.FC<Props> = ({proLanguages, taskId, taskUser, setProLanguages, currentUser}) => {
const [form, setForm] = useState<string>("")

const destroyContent = async (index:number, proLanguage:ProlLanguage) => {
  destroyProLanguage(proLanguages[index].id)
  proLanguages.splice(index, 1)
  setProLanguages(proLanguages.filter((x:ProlLanguage) => x !== proLanguage)) 
}

const addContent = async () => {
  console.log(form, taskId)
  const proLanguage = (await createProLanguage(form, taskId)).data.pro_Language
  console.log(proLanguage)
  setProLanguages([...proLanguages, proLanguage]);
  setForm("")
};

const aproLangs = () => {
  if (taskUser?.email === currentUser?.email) {
    return (
    <>
      {proLanguages.map((proLanguage:ProlLanguage, index:number) =>
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