import { Task, ProlLanguage } from "../../type/interfaces";
import { Card } from "@material-ui/core";

interface Props {
  task: Task;
}

const TaskTopCard: React.FC<Props> = ({ task }) => {
  return (
    <>
      <div className="card card-1">
        <img
          src={`http://localhost:8080/${task?.image?.url}`}
          alt="..."
          width="100%"
          height="200%"
        />
        <div className="cardContent">
          <h3>タイトル：{task.title}</h3>
          {task.pro_languages.map((proLang: ProlLanguage, index: number) => (
            <span className="article" key={index}>
              {proLang.language}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskTopCard;
