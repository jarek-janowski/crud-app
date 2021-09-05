
interface AddDataProps {
    addData: () => void,
    titleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    bodyInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    titleInput: string,
    bodyInput: string
}
 
const AddData: React.FC<AddDataProps> = ({
    addData, 
    titleInputChange,
    bodyInputChange,
    titleInput,
    bodyInput
}) => {

    const handleOnSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        addData();
        
    }
    

    return (
        <form className="form">
            <input className="form__input" value={titleInput} type="text" placeholder="title" onChange={titleInputChange}/>
            <input className="form__input" value={bodyInput} type="text" placeholder="body" onChange={bodyInputChange}/>
            <button className="form__button" onClick={handleOnSubmit}>Add Data</button>
        </form> 
     );
}
 
export default AddData;
