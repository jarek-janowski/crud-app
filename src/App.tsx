import { useState, useEffect } from 'react'
import './App.scss';
import CurrentResourceListItem from './components/CurrentResourceListItem';
import AddData from './components/AddData';
import EditModal from './components/EditModal'

const App = () => {

  const [apiData, setApiData] = useState([] as any)
  const [currentResource, setCurrentResource] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(0);

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

  const handleEditSelectedData = () => {
    fetch(`https://jsonplaceholder.typicode.com/${currentResource}/${editId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: titleInput,
        body: bodyInput,
      }),
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((res) => {
      if (res.status !== 200){
        return
      }
      return res.json()
    })
    .then((data) => {
      const elementsIndex = apiData.findIndex((item: any) => item.id === editId)
      let newArray = [...apiData]
      newArray[elementsIndex] = {...newArray[elementsIndex], 
        title: data.title, 
        body: data.body,
        completed: data.completed,
        email: data.email,
        name: data.name,
        url: data.url,
        thumbnailUrl: data.thumbnailUrl
      }
      setApiData(newArray);
      setTitleInput('');
      setBodyInput('');
      setShowModal(false);
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

  const handleOpenModal = (id: number) => {
    setShowModal(true)
    setEditId(id)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditId(0)
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
      <p onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="app__link">https://jsonplaceholder.typicode.com/<span>{currentResource}</span></p>
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
            openModal={handleOpenModal} 
          />
        ))}
      </ul>}
      {showModal && <EditModal 
        editSelectedData={handleEditSelectedData}
        closeModal={handleCloseModal}
        titleInputChange={handleTitleInputChange}
        bodyInputChange={handleBodyInputChange}
      />}
    </div>
  );
}

export default App;
