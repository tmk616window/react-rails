import {useState, useEffect} from 'react'
import {getProLangs} from '../../api/prolang/GetProLang'
import {ProLang, User} from '../../type/interfaces'
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
  
  interface ProLangParam{
    proL: ProLang[]
    id: number
    user: User
    setProlangs: any
  }

 const TaskProlangs:React.FC<ProLangParam> = ({proL, id, user, setProlangs}) => {  
      const [form, setForm] = useState<string>("")
      const [proLangs, setProLangs] = useState<ProLang[]>(proL)
      const _uid = Cookies.get("_uid")

      const destroyContent = async (index:number, proLang:ProLang) => {
        destroyProLang(proLangs[index].id)
        proLangs.splice(index, 1)
        setProlangs(proLangs.filter((x:ProLang) => x !== proLang)) 
      }
        
      const addContent = async () => {
        const prolong = (await createProLang(form, id)).data.prolong
        setProLangs([...proLangs, prolong]);
        setForm("")
        };


        const aproLangs = () => {
          if (user.email === _uid) {
            return (
              <>
                {proLangs.map((p:ProLang, index:number) =>
                    <p key={index} className="article">{p.lange}< IconButton onClick={() =>destroyContent(index, p)}><DeleteIcon fontSize="small"/></IconButton></p>
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
                {proL.map((p:ProLang, index:number) =>
                    <p key={index} className="article">{p.lange}</p>
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