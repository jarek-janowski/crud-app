interface CurrentResourceListItemProps {
    item: {
        title: string,
        body: string,
    }
}
 
const CurrentResourceListItem: React.FC<CurrentResourceListItemProps> = ({ item }) => {
    
    return ( 
        <li className="list-item">
            <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
            </div>
            <div>
                <button onClick={() => {}}>Edit</button>
                <button onClick={() => {}}>Delete</button>
            </div>
        </li>
     );
}
 
export default CurrentResourceListItem;
