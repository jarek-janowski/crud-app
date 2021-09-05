
interface CurrentResourceListItemProps {
    item: {
        id: number,
        title: string,
        body: string,
    },
    deleteSelectedData: (id: number) => void,
    openModal: (id: number) => void,
}
 
const CurrentResourceListItem: React.FC<CurrentResourceListItemProps> = ({ item, deleteSelectedData, openModal }) => {
    
    return ( 
        <li className="list-item">
            <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
            </div>
            <div>
                <button onClick={() => openModal(item.id)}>Edit</button>
                <button onClick={() => deleteSelectedData(item.id)}>Delete</button>
            </div>
        </li>
     );
}
 
export default CurrentResourceListItem;
