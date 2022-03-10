import Post from '../../img/post.jpg'
import Ranking from '../../img/ranking.jpg'
import Hire from '../../img/hire.jpg'
import Image from 'next/image'
import Link from 'next/link';
import {execTest} from '../api/test'
import {useEffect} from 'react'
import {Task} from '../type/interfaces'
import {getProLangs} from '../api/prolang/GetProLang'
import Cookies from 'js-cookie'
import {displayImage} from '../api/common/DisplayImage'


interface RankingParam{
    rTasks: Task[]
  }
  

const Top:React.FC<RankingParam> = ({rTasks}) => {
    const _access_token = Cookies.get("_access_token")
    const _client = Cookies.get("_client")
    const _uid = Cookies.get("_uid")      


  return (
    <div className="App">
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="" />
                <meta name="author" content="" />
                <title>Agency - Start Bootstrap Theme</title>
                <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
            </head>
            <body id="page-top">
                <header className="masthead">
                    <div className="container">
                        <div className="masthead-subheading">エンジョブへようこそ</div>
                        <div className="masthead-heading text-uppercase">ポートフォリオ見せようぜ！</div>
                        <a className="btn btn-primary btn-xl text-uppercase" href="#services">エンジョブとは</a>
                    </div>
                </header>
                <section className="page-section" id="services">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-heading text-uppercase">エンジョブとは</h2>
                            <h3 className="section-subheading text-muted">自分が作った作ったポートフォリオを投稿して評価してもらうサービスです。<br/>これからポートフォリオを作る方の参考になります。<br/>人事の目に止まれば採用の可能性あり！</h3>
                        </div>
                        <div className="row text-center">
                            <div className="col-md-4">
                                <h4 className="my-3">ポートフォリオ投稿</h4>
                                <Image src={Post} alt="..." width = "300" height="200" />
                                <p className="text-muted">ポートフォリオを投稿しこれから作る人の参考になります。</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className="my-3">ポートフォリオランキング</h4>
                                <Image src={Ranking} alt="..." width = "300" height="200" />
                                <p className="text-muted">ポートフォリオを評価してもらいランキングをつけます。</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className="my-3">企業にアピール</h4>
                                <Image src={Hire} alt="..." width = "300" height="200" />
                                <p className="text-muted">投稿した作品が企業さんの目に止まるかも！！</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="page-section bg-light" id="portfolio">
                    <div className="container">
                        <div className="text-center">
                        <h2 className="section-heading text-uppercase">ポートフォリオランキング</h2>
                        </div>
                        <div className="container">
                            <div className="row">

                                {rTasks.map((task:Task, index:number) => 
                                    <div className="col-md-4" key={index}>
                                        <p>{index + 1}位</p>
                                        <div className="card card-1">
                                        <img src={displayImage(`https://enjob.work/${task.logoImage?.url}`)} alt="..." width="100%" height="200%"  />   
                                        {/* <Image alt="alt" src={displayImage(`https://enjob.work/${task.logoImage?.url}`)}  /> */}
                                        <div className="cardContent">
                                            <h3>タイトル：{task.title}</h3>
                                            {task.prolongs.map((proLang:any ,index:number)=> (  
                                                <span className="article" key={index}>{proLang.lange}</span>
                                                ))}
                                        </div>
                                        <h4>{task.user.email}</h4>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="page-section bg-light" id="team">
                
                {_access_token && _client && _uid
                    ? <a className="taskButton btn" href="/tasks">他のポートフォリオを見る</a>
                    : <a className="taskButton btn" href="/login">他のポートフォリオを見る</a>
                }

                </section>
                <footer className="footer py-4">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-4 text-lg-start">Copyright &copy; Your Website 2021</div>
                            <div className="col-lg-4 my-3 my-lg-0">
                                <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <div className="col-lg-4 text-lg-end">
                                <a className="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                                <a className="link-dark text-decoration-none" href="#!">Terms of Use</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    </div>
  );
}

export default Top