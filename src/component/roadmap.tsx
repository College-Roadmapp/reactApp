import React,{ useState, useEffect, Component, MouseEvent } from 'react';
import '../osu.css';
import AppDisplay from '../App';
import CollegeDropDownMenu from '../App';
import MajorDropDownMenu from '../App';
import OptionDropDownMenu from '../App';
import TermAddingClassesDropdown from '../App';


function Roadmap() {
    return(
        <div>
            <div className = "dropDownMenu">
                {<CollegeDropDownMenu/>}
                {<MajorDropDownMenu/>}
                {<OptionDropDownMenu/>}
            </div>
            {<AppDisplay/>}
            {<TermAddingClassesDropdown/>}
        </div>
    )
}

export default Roadmap;