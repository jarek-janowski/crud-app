import './AddData.scss'

interface AddDataProps {
    addData: () => void,
    titleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    bodyInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    currentResource: string,
    emailInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    nameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    photoUrlInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    thumbnailUrlInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    userNameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    checkboxChange: () => void,
    checkbox: boolean,
    titleInput: string,
    bodyInput: string
}
 
const AddData: React.FC<AddDataProps> = ({
    addData, 
    titleInputChange,
    bodyInputChange,
    currentResource,
    titleInput,
    bodyInput,
    emailInputChange,
    nameInputChange,
    photoUrlInputChange,
    thumbnailUrlInputChange,
    checkboxChange,
    checkbox,
    userNameInputChange
}) => {

    const handleOnSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        addData();
        
    }

    let body = undefined
    let title = undefined
    let email = undefined
    let userName = undefined

    if(currentResource === 'posts' || 
        currentResource === 'albums' || 
        currentResource === 'photos' ||
        currentResource === 'todos'
    ){
        title = <input value={titleInput} type="text" placeholder="title" onChange={titleInputChange}/>
    }

    if(currentResource === 'comments' || currentResource === 'posts'){
        body = <input value={bodyInput} type="text" placeholder="body" onChange={bodyInputChange}/>
    }

    if(currentResource === 'comments' || currentResource === 'users'){
        email = <input type="email" placeholder="email" onChange={emailInputChange}/>
    }
    if(currentResource === 'comments' || currentResource === 'users'){
        userName = <input  type="text" placeholder="name" onChange={nameInputChange}/>
    }
    

    return (
        <form className="form">
            {title}
            {body}
            {userName}
            {currentResource === 'users' && <input type="text" placeholder="user name" onChange={userNameInputChange} />}
            {email}
            {currentResource === 'photos' && <input type="url" placeholder="photo url" onChange={photoUrlInputChange} />}
            {currentResource === 'photos' && <input type="url" placeholder="thumbnail url" onChange={thumbnailUrlInputChange} /> }
            {currentResource === 'todos' && <input type="checkbox" checked={checkbox} onChange={checkboxChange}/>}
            {currentResource && <button className="form__button" onClick={handleOnSubmit}>Add Data</button>}
        </form> 
     );
}
 
export default AddData;
