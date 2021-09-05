import './EditModal.scss'

export interface EditModalProps {
    editSelectedData: () => void,
    closeModal: () => void,
    titleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    bodyInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    emailInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    nameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    photoUrlInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    thumbnailUrlInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    userNameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    checkboxChange: () => void,
    checkbox: boolean,
    currentResource: string,
}
 
const EditModal: React.FC<EditModalProps> = ({ 
    editSelectedData,
    closeModal,
    titleInputChange,
    bodyInputChange,
    emailInputChange,
    nameInputChange,
    photoUrlInputChange,
    thumbnailUrlInputChange,
    userNameInputChange,
    checkboxChange,
    checkbox,
    currentResource
 }) => {

    let body = undefined
    let title = undefined
    let email = undefined
    let userName = undefined

    if(currentResource === 'posts' || 
        currentResource === 'albums' || 
        currentResource === 'photos' ||
        currentResource === 'todos'
    ){
        title = <input type="text" placeholder="title" onChange={titleInputChange}/>
    }

    if(currentResource === 'comments' || currentResource === 'posts'){
        body = <input type="text" placeholder="body" onChange={bodyInputChange}/>
    }

    if(currentResource === 'comments' || currentResource === 'users'){
        email = <input type="email" placeholder="email" onChange={emailInputChange}/>
    }
    if(currentResource === 'comments' || currentResource === 'users'){
        userName = <input type="text" placeholder="name" onChange={nameInputChange}/>
    }

    return ( 
        <div className="modal">
            <div className="modal__content">
                <div className="modal__header">
                    <h4 className="modal__title">Edit data</h4>
                </div>
                <form className="modal__body">
                    {title}
                    {body}
                    {userName}
                    {currentResource === 'users' && <input type="text" placeholder="user name" onChange={userNameInputChange} />}
                    {email}
                    {currentResource === 'photos' && <input type="url" placeholder="photo url" onChange={photoUrlInputChange} />}
                    {currentResource === 'photos' && <input type="url" placeholder="thumbnail url" onChange={thumbnailUrlInputChange} /> }
                    {currentResource === 'todos' && <input type="checkbox" checked={checkbox} onChange={checkboxChange}/>}
                </form>
                <div className="modal__footer">
                    <button onClick={() => closeModal()} className="modal__button">Cancel</button>
                    <button onClick={() => editSelectedData()} className="modal__button">Confirm</button>
                </div>
            </div>
        </div>
     );
}
 
export default EditModal;