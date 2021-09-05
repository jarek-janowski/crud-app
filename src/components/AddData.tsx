import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
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
    bodyInput: string,
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

    let schema = yup.object().shape({})

    if(currentResource === 'posts') {
        schema = yup.object().shape({
            title: yup.string().required(),
            body: yup.string().required()
        })
    }

    if(currentResource === 'comments') {
        schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(), 
            body: yup.string().required()
        })
    }

    if(currentResource === 'albums') {
        schema = yup.object().shape({
            title: yup.string().required(),
        })
    }

    if(currentResource === 'photos') {
        schema = yup.object().shape({
            title: yup.string().required(),
            photoUrl: yup.string().required(),
            thumbnailUrl: yup.string().required()
        })
    }

    if(currentResource === 'users') {
        schema = yup.object().shape({
            name: yup.string().required(),
            username: yup.string().required(),
            email: yup.string().email().required(), 
        })
    }

    
    
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    })
    


    let body = undefined
    let title = undefined
    let email = undefined
    let FullName = undefined

    if(currentResource === 'posts' || 
        currentResource === 'albums' || 
        currentResource === 'photos' ||
        currentResource === 'todos'
    ){  
        title = 
        <div>
        <input className="form__input" name="title" value={titleInput} type="text" placeholder="title" onChange={titleInputChange} ref={register as any}/>
        <span className="form__errors">{errors.title?.message}</span>
        </div>
    }

    if(currentResource === 'comments' || currentResource === 'posts'){
        body =
        <div>
            <input className="form__input" name="body" value={bodyInput} type="text" placeholder="body" onChange={bodyInputChange} ref={register as any}/>
            <span className="form__errors">{errors.body?.message}</span>
        </div> 
    }

    if(currentResource === 'comments' || currentResource === 'users'){
        email = 
        <div>
            <input className="form__input" name="email" type="email" placeholder="email" onChange={emailInputChange} ref={register as any}/> 
            <span className="form__errors">{errors.email?.message}</span>
        </div>
    }
    if(currentResource === 'comments' || currentResource === 'users'){
        FullName =
        <div>
            <input  className="form__input" name="name" type="text" placeholder="name" onChange={nameInputChange} ref={register as any}/>
            <span className="form__errors">{errors.name?.message}</span>
        </div> 
    }
    
    const submitForm = () => {
        addData();
    }


    return (
        <form onSubmit={handleSubmit(submitForm)} className="form">
            {title}
            {body}
            {FullName}
            {currentResource === 'users' && 
                <div>
                    <input className="form__input" name="username" type="text" placeholder="user name" onChange={userNameInputChange} ref={register as any}/>
                    <span className="form__errors">{errors.username?.message}</span>
                </div>
            }
            {email}
            {currentResource === 'photos' &&
                <div>
                    <input className="form__input" name="photoUrl" type="url" placeholder="photo url" onChange={photoUrlInputChange} ref={register as any}/>
                    <span className="form__errors">{errors.photoUrl?.message}</span>
                </div> 
            }
            {currentResource === 'photos' &&
                <div>
                    <input className="form__input" name="thumbnailUrl" type="url" placeholder="thumbnail url" onChange={thumbnailUrlInputChange} ref={register as any}/> 
                    <span className="form__errors">{errors.thumbnailUrl?.message}</span>
                </div> 
            }
            {currentResource === 'todos' && <input className="form__input" type="checkbox" checked={checkbox} onChange={checkboxChange} ref={register as any}/>}
            {currentResource && <button className="form__button">Add Data</button>}
        </form> 
     );
}
 
export default AddData;
