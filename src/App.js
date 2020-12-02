import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  
  const [repositories, setRepositories] = useState([]);

  // Listar os projetos cadastrados.
  useEffect(() => {

    api.get('repositories').then(response => {

      // Adiciona na lista projects todos os projetos inseridos.
      setRepositories(response.data);

    });

  // [] indica que isso deve acontecer apenas uma vez.
  }, []);

  async function handleAddRepository() {
 
    const response = await api.post('repositories', {

      title: `Novo projeto - ${Date.now()}`,
      url: `https://`,
      techs: ['Javascript', 'Python']

    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  };

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

      const newRepositories = repositories.filter(

        repository => repository.id !== id 
  
      )

    // Adiciona na lista todos os repositórios, menos o passado pelo id.
    setRepositories(newRepositories);

  }

  return (

    <div>


      <ul data-testid="repository-list">
      <h1> Repositórios </h1>

        { repositories.map(repository =>
          
          <li key = { repository.id }>
          
            { repository.title } 

            <button onClick = {() => handleRemoveRepository(repository.id)}>

              Remover

            </button>

         </li>
        
        )}

      </ul>

      <button onClick = { handleAddRepository }> Adicionar </button>

    </div>

  );

}

export default App;
