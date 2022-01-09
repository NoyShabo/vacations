import { VacationPreview } from '../Vacation-Preview/VacationPreview';
import './VacationList.scss'

export const VacationList = ({vacations,removeVacation, onClickEditVacation, selectedVacationToEdit}) => {

    const isVacationSelected =(VacationIdx)=>{
        return (selectedVacationToEdit&&  VacationIdx == selectedVacationToEdit._id )? 'orange' : '';
    }


    if(!vacations) return <div className="loading">Loading</div>
    if(!vacations.length) return (<div className="notFoundVacations"><div className="msg">Vacation not found :(</div></div>)
    return (
        <section className="vacation-list">
            <ul className='grid-vacations'>
                {vacations.map((vacation,idx)=> 
                (<li key={vacation._id+idx} className={isVacationSelected(vacation._id)} ><VacationPreview  removeVacation={removeVacation} vacation={vacation} onClickEditVacation={onClickEditVacation} /></li>))
            }
            </ul>
        </section>
    );
};