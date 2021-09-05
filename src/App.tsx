import { useState, useEffect } from 'react'
import './App.scss';
import CurrentResourceListItem from './components/CurrentResourceListItem';
import AddData from './components/AddData';
import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4())
const App = () => {

  const [apiData, setApiData] = useState([] as any)
  const [currentResource, setCurrentResource] = useState('');

  const [titleInput, setTitleInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${currentResource}/?_limit=100`)
      .then(res => res.json())
      .then(data => setApiData(data))
  }, [currentResource]);

  const handleAddData = () => {
    currentResource && fetch(`https://jsonplaceholder.typicode.com/${currentResource}`, {
      method: 'POST',
      body: JSON.stringify({
        id: apiData.length + 1,
        title: titleInput,
        body: bodyInput,
        
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then((res) => {
      if(res.status !== 201){
        return
      }
      return res.json();
    })
    .then((data) => {
      setApiData([data, ...apiData])
      setTitleInput('')
      setBodyInput('')
    })
    .catch((err) => {
      console.log(err)
    })
    
  }

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

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value)
  }

  const handleBodyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBodyInput(e.target.value)
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
      <AddData 
        addData={handleAddData} 
        titleInputChange={handleTitleInputChange}
        bodyInputChange={handleBodyInputChange}
        titleInput={titleInput}
        bodyInput={bodyInput}
      />
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
