import './assets/scss/global.scss';
import './VacationApp.scss'
import vacationsData from './data/Vacations.json'
import { VacationList } from './cmps/Vacation-List/VacationList';
import { useState } from 'react';
import { VacationFilter } from './cmps/Vacation-Filter/VacationFilter';
import { VacationAddEdit } from './cmps/Vacation-Add-Edit/VacationAddEdit';


export function VacationApp() {
  const [vacations, setvacations] = useState(vacationsData);
  const [filterBy, setfilterBy] = useState({filterNameOrLocation:''});
  const [selectedVacationEdit, setselectedVacationEdit] = useState(null);

  const handelChangeFilter = ({target})=>{
      const filed = target.name;
      setfilterBy(prevFilter=>({...prevFilter,[filed]:target.value}));
  }
  
  const onRemoveVacation =(vacationId) =>{
    setvacations([...vacations.filter((vaction)=>vaction._id!==vacationId)]);
  }

  const onClickEditVacation = (vacation)=>{
    setselectedVacationEdit(vacation);
  }

  const onSaveVacation =(vacation)=>{
    if(vacation._id){
      setvacations([...vacations.map((currVaction)=>currVaction._id!==vacation._id?currVaction:vacation)],setselectedVacationEdit(null));
    }
    else{
      vacation._id = 'pa'+Date.now()/1000;
      setvacations([{...vacation},...vacations],setselectedVacationEdit(null));
    }
  }

  const onCancelEditVacation = ()=>{
    setselectedVacationEdit(null);
  }

  const loadVacations =()=>{
    const filterLowerCase = filterBy.filterNameOrLocation.toLocaleLowerCase();
    return vacations.filter(vacation=>
      vacation.name.toLocaleLowerCase().includes(filterLowerCase) 
      || vacation.location.toLocaleLowerCase().includes(filterLowerCase))
  }

  if(!vacations) return <div className="loading">Loading</div>
  return (
    <section className="App">
      <section className='vactions-side-container'>
        <VacationFilter filterBy={filterBy} handelChangeFilter={handelChangeFilter}/>
        <VacationList selectedVacationToEdit={selectedVacationEdit} vacations={loadVacations()} removeVacation={onRemoveVacation} onClickEditVacation={onClickEditVacation} />
      </section>
      <VacationAddEdit onSaveVacation={onSaveVacation} selectedVacationEdit={selectedVacationEdit} onCancelEditVacation={onCancelEditVacation} />
    </section>
  );
}


