import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ChildCareIcon from '@material-ui/icons/ChildCare';
import { fade, makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import SubjectIcon from '@material-ui/icons/Subject';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const Header = (props) => {
    const currentUser = useSelector(state => state.user.currentUser)

    const handleLoginRender = (isLoggedIn) => {
        if (isLoggedIn) {
            return (
                <div>


                </div>
            )
        } else {
            return (
                <div>
                    <Link></Link>
                    <Link></Link>
                </div>
            )
        }
    }

    const handleSearchChange = (e) => {
        e.preventDefault()
        props.setSearchContent(e.target.value)
    }

  return (
    <div>
        <Link></Link>
        <ul>
            <div>
                <div>
                    <SearchIcon />
                </div>

                <InputBase
                placeholder="Search..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search'}}
                onChange={(e) => handleSearchChange(e)}
                />
            </div>
                <ShowChartIcon className = {classes.supplementaryIcon} />
                <Link></Link>
                <CreateIcon className = {classes.supplementaryIcon} />
                <Link></Link>
                <CreateIcon className = {classes.supplementaryIcon} />
                <Link></Link>
                <SubjectIcon className = {classes.supplementaryIcon} />
                <Link></Link>
                { handleLoginRender(localStorage.getItem('auth_key') !== 'undefined')}
        </ul>
    </div>

  )
}

export default Header;