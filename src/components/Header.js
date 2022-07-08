import React from 'react';
import { Link, link } from 'react-router-dom';

import { useSelector } from 'react-redux';

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