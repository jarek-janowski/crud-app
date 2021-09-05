import './CurrentResourceListItem.scss'

interface CurrentResourceListItemProps {
    item: {
        id: number,
        title: string,
        completed: boolean,
        body: string,
        url: string,
        thumbnailUrl: string,
        email: string,
        name: string,
        username: string
    },
    deleteSelectedData: (id: number) => void,
    openModal: (id: number) => void,
    currentResource: string
}
 
const CurrentResourceListItem: React.FC<CurrentResourceListItemProps> = ({ item, deleteSelectedData, openModal, currentResource }) => {
    
    let body = undefined
    let title = undefined
    let email = undefined
    let fullName = undefined

    if(currentResource === 'posts' || 
        currentResource === 'albums' || 
        currentResource === 'photos' ||
        currentResource === 'todos'
    ){
        title = <h4 className="list-item__title">title: {item.title}</h4>
    }

    if(currentResource === 'comments' || currentResource === 'posts'){
        body = <p className="list-item__body">body: {item.body}</p>
    }

    if(currentResource === 'comments' || currentResource === 'users'){
        email = <p>email: {item.email}</p>
    }
    if(currentResource === 'comments' || currentResource === 'users'){
        fullName = <h3>name: {item.name}</h3>
    }

    return ( 
        <li className="list-item">
            <div>
                {title}
                {fullName}
                {currentResource === 'users' && <p>userName: {item.username} </p>}
                {email}
                {body}
                {currentResource === 'todos' && <input type="checkbox" checked={item.completed} readOnly/>}
                {currentResource === 'photos' && <img style={{width: 150}} src={item.url} alt={item.title}/> }
                {currentResource === 'photos' && <img style={{width: 100}} src={item.thumbnailUrl} alt={item.title} className="list-item__thumbnail"/> }
            </div>
            {currentResource && <div>
                <button onClick={() => openModal(item.id)}>Edit</button>
                <button onClick={() => deleteSelectedData(item.id)}>Delete</button>
            </div>}
        </li>
     );
}
 
export default CurrentResourceListItem;
