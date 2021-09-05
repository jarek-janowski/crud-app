import './EditModal.scss'

export interface EditModalProps {
    editSelectedData: () => void,
    closeModal: () => void,
    titleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    bodyInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
 
const EditModal: React.FC<EditModalProps> = ({ 
    editSelectedData,
    closeModal,
    titleInputChange,
    bodyInputChange,
 }) => {

    return ( 
        <div className="modal">
            <div className="modal__content">
                <div className="modal__header">
                    <h4 className="modal__title">Edit data</h4>
                </div>
                <div className="modal__body">
                    <input type="text" placeholder="title" onChange={titleInputChange}/>
                    <input type="text" placeholder="body" onChange={bodyInputChange}/>
                </div>
                <div className="modal__footer">
                    <button onClick={() => closeModal()} className="modal__button">Cancel</button>
                    <button onClick={() => editSelectedData()} className="modal__button">Confirm</button>
                </div>
            </div>
        </div>
     );
}
 
export default EditModal;