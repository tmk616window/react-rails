import { useRouter } from 'next/router';
import {useState} from 'react';

export default function Index() {
  const router = useRouter();                //ルーターの取得
  const [keyword, setKeyword] = useState<number>();  //検索キーワード

  // ボタンをクリックしたときの処理
  const clickButton = () => {
    //未入力の時
    if (!keyword) {
      return;
    }
    router.push({
        pathname:"/profile",       //URL
        query: {id :keyword} //検索クエリ
      });
  }

  return (

    <div style={{textAlign: "center", marginTop: ""}}>

    <br/>
    <br/>
    <br/>
    <br/>

      {/* 入力項目 */}
      <input 
        type="text" 
        value={keyword}
        onChange={(e:any) => setKeyword(e.target.value)} 
      />

      {/* ボタン */}
      <button 
        onClick={clickButton}
        disabled={!keyword}>    
        検索
      </button>
    </div>
  )
}
