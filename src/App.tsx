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
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [photoUrlInput,setPhotoUrlInput] = useState('');
  const [ThumbnailUrlInput, setThumbnailUrlInput] = useState('');
  const [userNameInput, setUserNameInput] = useState('');
  const [checkbox, setCheckbox] = useState(false);

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
        completed: checkbox,
        title: titleInput,
        body: bodyInput,
        email: emailInput,
        name: nameInput,
        url: photoUrlInput,
        thumbnailUrl: ThumbnailUrlInput,
        username: userNameInput
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
      setTitleInput('');
      setBodyInput('');
      setEmailInput('');
      setNameInput('');
      setPhotoUrlInput('');
      setThumbnailUrlInput('');
      setUserNameInput('');
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
        email: emailInput,
        name: nameInput,
        url: photoUrlInput,
        thumbnailUrl: ThumbnailUrlInput,
        completed: checkbox,
        username: userNameInput
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
        thumbnailUrl: data.thumbnailUrl,
        username: data.username
      }
      setApiData(newArray);
      setTitleInput('');
      setBodyInput('');
      setEmailInput('');
      setNameInput('');
      setPhotoUrlInput('');
      setThumbnailUrlInput('');
      setUserNameInput('');
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
  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value)
}

const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value)
}

const handlePhotoUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoUrlInput(e.target.value)
}

const handleThumbnailUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnailUrlInput(e.target.value)
}

const handleCheckboxChange = () => {
    setCheckbox(!checkbox)
}

const handleUserNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUserNameInput(e.target.value)
}

  return (
    <div className="app">
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
      <a target="_blank" rel="noopener noreferrer" href={`https://jsonplaceholder.typicode.com/${currentResource}`} className="app__link">https://jsonplaceholder.typicode.com/<span>{currentResource}</span></a>
      <AddData 
        addData={handleAddData} 
        titleInputChange={handleTitleInputChange}
        bodyInputChange={handleBodyInputChange}
        titleInput={titleInput}
        bodyInput={bodyInput}
        currentResource={currentResource}
        emailInputChange={handleEmailInputChange}
        nameInputChange={handleNameInputChange}
        photoUrlInputChange={handlePhotoUrlInputChange}
        thumbnailUrlInputChange={handleThumbnailUrlInputChange}
        userNameInputChange={handleUserNameInputChange}
        checkboxChange={handleCheckboxChange}
        checkbox={checkbox}
      />
      {currentResource && <ul className="app__list">
        {apiData.map((item: any) => (
          <CurrentResourceListItem 
            key={item.id}
            item={item}
            deleteSelectedData={handleDeleteSelectedData}
            openModal={handleOpenModal}
            currentResource={currentResource} 
          />
        ))}
      </ul>}
      {showModal && <EditModal 
        editSelectedData={handleEditSelectedData}
        closeModal={handleCloseModal}
        titleInputChange={handleTitleInputChange}
        bodyInputChange={handleBodyInputChange}
        emailInputChange={handleEmailInputChange}
        nameInputChange={handleNameInputChange}
        photoUrlInputChange={handlePhotoUrlInputChange}
        thumbnailUrlInputChange={handleThumbnailUrlInputChange}
        userNameInputChange={handleUserNameInputChange}
        checkboxChange={handleCheckboxChange}
        checkbox={checkbox}
        currentResource={currentResource}
      />}
    </div>
  );
}

export default App;
