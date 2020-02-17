import React, {useState} from 'react';

const Repo = ({ repo }) => {
  const [hidden, setHidden] = useState(true);
  let language = "", langColor="#fff";

  const toggleDetail = () => {
    setHidden(!hidden);
  }

  if (repo.primaryLanguage) {
    language = repo.primaryLanguage.name;
    langColor = repo.primaryLanguage.color;
  }

  return (
    <li className="repo" onClick={toggleDetail}>
      <div className="name-owner">
        <span className="name">{repo.name}</span>
        by {repo.owner.login || ""}
      </div>
      <div className={'detail ' + (hidden ? 'hidden' : '')}>
        <div className="description">
          {repo.description || ""}
        </div>
        <div className="url">
          <a href={repo.url}>{repo.url}</a>
        </div>
        <div className="summary">
          <span className="followers">
            {repo.watchers.totalCount || 0} followers
          </span>
          <span className="language">
            <span className="mark" style={{ backgroundColor: langColor}}></span>
            {language}
          </span>
        </div>
      </div>
    </li>  
  );
}

export default Repo;
