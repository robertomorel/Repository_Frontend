import React, { useState, useEffect } from "react";
import api from './services/api';

import Repo from './components/repository';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get('/repositories')
      .then(response => {
        setRepositories(response.data)
      });
  }, []);

  async function handleAddRepository() {
    try {
      const res = await api.post('/repositories', {
        title: `Novo Repositório ${Date.now()}`,
        url: 'https://github.com/robertomorel',
        owner: 'Roberto Morel'
      });
      const newRepo = res.data;
      setRepositories([...repositories, newRepo]);
    } catch (err) {
      alert(`Register failed. Details: "${err}".`);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(r => r.id !== id));
    } catch (err) {
      alert(`Fail to detele repository. Details: "${err}".`);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <Repo
            key={repo.id}
            repo={repo}
            onDelete={handleRemoveRepository} />
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;