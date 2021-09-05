import { useState, useEffect } from 'react'
import './App.scss';
import CurrentResourceListItem from './components/CurrentResourceListItem';

const App = () => {

  const [apiData, setApiData] = useState([] as any)
  const [currentResource, setCurrentResource] = useState('');

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${currentResource}/?_limit=100`)
      .then(res => res.json())
      .then(data => setApiData(data))
  }, [currentResource]);

  const handleDeleteSelectedData = (id: number) => {

    fetch(`https://jsonplaceholder.typicode.com/${currentResource}/${id}`, {
      method: 'DELETE',
    })
    .then((res) => {
      if (res.status !== 200){
        return
      }
      setApiData(apiData.filter((item: any) => {
        return item.id !== id;
      }))
    })
  }

  const handleSelectResource = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentResource(e.target.value)
  }

  return (
    <div className="App">
      <label className="app__label">Choose a resource:
        <select className="app__select" onChange={handleSelectResource}>
          <option value="">--Please choose an option--</option>
          <option value="posts">/posts</option>
          <option value="comments">/comments</option>
          <option value="albums">/albums</option>
          <option value="photos">/photos</option>
          <option value="todos">/todos</option>
          <option value="users">/users</option>
        </select>
      </label>
      {currentResource && <ul style={{padding: 0}}>
        {apiData.map((item: any) => (
          <CurrentResourceListItem 
            key={item.id}
            item={item}
            deleteSelectedData={handleDeleteSelectedData} 
          />
        ))}
      </ul>}
    </div>
  );
}

export default App;
