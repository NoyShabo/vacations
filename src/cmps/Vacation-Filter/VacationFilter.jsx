import './VacationFilter.scss';
import { FiSearch } from "react-icons/fi";

export function VacationFilter({filterBy,handelChangeFilter }) {
    
    const {filterNameOrLocation} = filterBy;
    return (
        <section className='filter-cmp'>
            <section className='inputContainer'>
                <input onChange={(ev)=>handelChangeFilter(ev)} className='searchInput' value={filterNameOrLocation} type="search" placeholder='Search by name or location' name="filterNameOrLocation" id="filterNameOrLocation" />
                <FiSearch className='searchIconInInput ' />
            </section>
            <button className='searchBtn'><FiSearch className='searchIconBtn' /></button>
        </section>
    );
}

