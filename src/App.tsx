import { useState, useEffect } from 'react'
import './App.scss';
import CurrentResourceListItem from './components/CurrentResourceListItem';

const App = () => {

  const [apiData, setApiData] = useState([] as any)
  const [currentResource, setCurrentResource] = useState('posts');

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


  return (
    <div className="App">
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
