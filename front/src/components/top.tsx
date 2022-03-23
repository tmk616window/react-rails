import Post from "../../img/post.jpg";
import Ranking from "../../img/ranking.jpg";
import Hire from "../../img/hire.jpg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { Task, ProlLanguage } from "../type/interfaces";
import { displayImage } from "../api/common/DisplayImage";
import { api } from "../contexts/api";
import { AuthContext } from "../../pages/_app";

const Top: React.FC = () => {
  const [rankingTasks, setRankingTasks] = useState<Task[]>([]);
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);

  useEffect(() => {
    api.get("http://localhost:8080/api/ranking").then((res: any) => {
      console.log(currentUser, res.data.tasks);
      setRankingTasks(res.data.tasks);
    });
  }, []);

  return (
    <div className="App">
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="description" content="" />
          <meta name="author" content="" />
          <title>Agency - Start Bootstrap Theme</title>
          <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        </head>
        <body id="page-top">
          <header className="masthead">
            <div className="container">
              <div className="masthead-subheading">エンジョブへようこそ</div>
              <div className="masthead-heading text-uppercase">
                ポートフォリオ見せようぜ！
              </div>
              <a
                className="btn btn-primary btn-xl text-uppercase"
                href="#services"
              >
                エンジョブとは
              </a>
            </div>
          </header>
          <section className="page-section" id="services">
            <div className="container">
              <div className="text-center">
                <h2 className="section-heading text-uppercase">
                  エンジョブとは
                </h2>
                <h3 className="section-subheading text-muted">
                  自分が作った作ったポートフォリオを投稿して評価してもらうサービスです。
                  <br />
                  これからポートフォリオを作る方の参考になります。
                  <br />
                  人事の目に止まれば採用の可能性あり！
                </h3>
              </div>
              <div className="row text-center">
                <div className="col-md-4">
                  <h4 className="my-3">ポートフォリオ投稿</h4>
                  <Image src={Post} alt="..." width="300" height="200" />
                  <p className="text-muted">
                    ポートフォリオを投稿しこれから作る人の参考になります。
                  </p>
                </div>
                <div className="col-md-4">
                  <h4 className="my-3">ポートフォリオランキング</h4>
                  <Image src={Ranking} alt="..." width="300" height="200" />
                  <p className="text-muted">
                    ポートフォリオを評価してもらいランキングをつけます。
                  </p>
                </div>
                <div className="col-md-4">
                  <h4 className="my-3">企業にアピール</h4>
                  <Image src={Hire} alt="..." width="300" height="200" />
                  <p className="text-muted">
                    投稿した作品が企業さんの目に止まるかも！！
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="page-section bg-light" id="portfolio">
            <div className="container">
              <div className="text-center">
                <h2 className="section-heading text-uppercase">
                  ポートフォリオランキング
                </h2>
              </div>
              <div className="container">
                <div className="row">
                  {rankingTasks.map((task: Task, index: number) => (
                    <div className="col-md-4" key={index}>
                      <p>{index + 1}位</p>
                      <div className="card card-1">
                        <img
                          src={`http://localhost:8080/${task?.image?.url}`}
                          alt="..."
                          width="100%"
                          height="200%"
                        />
                        <div className="cardContent">
                          <h3>タイトル：{task.title}</h3>
                          {task.pro_languages.map(
                            (proLang: ProlLanguage, index: number) => (
                              <span className="article" key={index}>
                                {proLang.language}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <footer className="footer py-4">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-4 text-lg-start">
                  Copyright &copy; Your Website 2021
                </div>
                <div className="col-lg-4 my-3 my-lg-0">
                  <a className="btn btn-dark btn-social mx-2" href="#!">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-dark btn-social mx-2" href="#!">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-dark btn-social mx-2" href="#!">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <a className="link-dark text-decoration-none me-3" href="#!">
                    Privacy Policy
                  </a>
                  <a className="link-dark text-decoration-none" href="#!">
                    Terms of Use
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </div>
  );
};

export default Top;
