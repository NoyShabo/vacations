import './VacationAddEdit.scss'
import {IoAdd} from 'react-icons/io5'
import {FaTimes} from 'react-icons/fa'
import {GiCheckMark} from 'react-icons/gi'
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function VacationAddEdit({onSaveVacation,selectedVacationEdit, onCancelEditVacation}) {
 
    const emptyVacation = {
            name: "",
            location: "",
            price:"",
            imageUrl:""
    }
    const [vacation, setvacation] = useState({...emptyVacation});

    useEffect(()=>{
        if(selectedVacationEdit){
            const vacationToEdit = JSON.parse(JSON.stringify(selectedVacationEdit));
            setvacation(vacationToEdit);
        }
    },[selectedVacationEdit]);


    const handleChangeInput =({target})=>{
        const field = target.name;
        const value = target.value;
        setvacation(prevVacation=>({...prevVacation, [field]:value}));
    }
    
    const notifyError = (txt) => toast.error(txt);
    
    const save = async (ev)=>{
        ev.preventDefault();        
        if(!vacation.name){
            return notifyError("Field name is required");
        }
        else if(!vacation.location){
            return notifyError("Field location is required");
        }
        else if(!vacation.price){
            return notifyError("Field price is required");
        }
        else if(Number.isNaN(+vacation.price)){
            return notifyError("Price must be a number");
        }
        else if(!vacation.imageUrl){
            vacation.imageUrl = 
            `https://1.bp.blogspot.com/-z-8JiZX8f4A/XvAlTSBF5MI/AAAAAAAAGcs/Iy10Oj5gzmIdH9FhP7qZfdlJdosdSaUhgCLcBGAsYHQ/s640/Vacation%2Bcomes%2Bfrom%2Ba%2BLatin%2Bword%2Bmeaning.jpg`;
        }
            await onSaveVacation(vacation);
            setvacation({...emptyVacation});
    }


    const cancelEdit = (ev)=>{
        ev.preventDefault();
        onCancelEditVacation();
        setvacation({...emptyVacation});
    }

    return (
        <section className="vacation-add-edit">
            <form onSubmit={save}>
                <h2 className='title'>{selectedVacationEdit ? 'Edit a vacation': 'Add a new vacation'}</h2>
                <label htmlFor="name">Name</label><br />
                <input type="text" onChange={handleChangeInput} placeholder='Name' value={vacation.name} name="name" id="name" /><br />
                <label htmlFor="location">Location</label><br />
                <input type="text" onChange={handleChangeInput} placeholder='Location' value={vacation.location} name="location" id="location" /><br />
                <label htmlFor="price">Price</label><br />
                <input type="text" onChange={handleChangeInput} placeholder='Price' value={vacation.price} name="price" id="price" /><br />
                <label htmlFor="imageUrl">Image url</label><br />
                <input type="text" onChange={handleChangeInput} placeholder='Image url' value={vacation.imageUrl} name="imageUrl" id="imageUrl" /><br />
                
                {!selectedVacationEdit && <div className="backgroundImgOnAddVacation"></div>}
                {!selectedVacationEdit && <button className='btn addBtn'><IoAdd className='iconBtn'/></button>}

                {selectedVacationEdit && <button className='btn editBtn'><GiCheckMark className='iconEdit'/></button>}
                {selectedVacationEdit && <button onClick={cancelEdit} className='btn cancelBtn'><FaTimes className='iconCancel'/></button>}
                
            </form>
            <ToastContainer />
        </section>
    );
}

