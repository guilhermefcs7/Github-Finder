import React from "react";

import classes from "./PersonalProjects.module.css";

import { Link, useParams } from "react-router-dom";

import { PersonalUserInfo } from "../types/personal-info";

function PersonalProjects() {
  const { login } = useParams();

  const [userData, setUserData] = React.useState([]);

  console.log(login);

  React.useEffect(() => {
    async function fetchUserData() {
      const res = await fetch(
        `https://api.github.com/users/${login}/repos?sort=stars&per_page=10`
      );

      const data = await res.json();

      console.log(data);

      setUserData(data);
    }

    fetchUserData();
  }, []);

  return (
    <>
      <div className={classes.personal}>
        <div className={classes.backButton}>
          <Link to={"/"}>Voltar</Link>
        </div>
        <h2>Explore os repositórios do usuário: {login}</h2>
        <div className={classes.container}>
          <div className={classes.container_box}>
            {userData.map((user: PersonalUserInfo) => (
              <div className={classes.personal_repo_box}>
                <div className={classes.title}>{user.name}</div>
                <div className={classes.personalInfo}>
                  Linguagem utilizada:
                  {user.language ? user.language : "Desconhecido"}
                </div>
                <div className={classes.personalInfo}>
                  Estrelas: {user.stargazers_count}
                </div>
                <div className={classes.personalInfo}>
                  Forks: {user.forks_count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalProjects;
