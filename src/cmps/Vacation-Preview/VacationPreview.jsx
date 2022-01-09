import "./VacationPreview.scss"
import { MdLocationOn } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

export function VacationPreview({vacation, removeVacation, onClickEditVacation }) {
    return (
        <section className='vacation-preview' >
            <section className='card'>
                <div className="container-image-buttons">
                     <img src={vacation.imageUrl} alt="" />
                    <button onClick={()=>removeVacation(vacation._id)} className="deleteBtnContainer"><AiFillDelete className="btnIcon"/></button>
                    <button onClick={()=>onClickEditVacation(vacation)} className="editBtnContainer"><MdModeEdit className="btnIcon"/></button>
                </div>
           
                      
            <h3 className="title textOverFlow">{vacation.name}</h3>
            <div className="flex">
                <h3 className="locationContainerH3 textOverFlow"><MdLocationOn  className="location-icon"/><span className="location ">{vacation.location}</span></h3>
                <h3 className="price textOverFlow">{(+vacation.price).toLocaleString()}</h3>
            </div>
            
            </section>
        </section>
    );
}

