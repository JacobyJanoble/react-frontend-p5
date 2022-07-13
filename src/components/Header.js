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
import { AccordionSummary } from '@material-ui/core';

const useStyles= makeStyles((theme) => ({
    header: {
        display: 'flex',
        color: 'black',
        backgroundColor: 'white',
    },
    topRibbon: {
        display: 'flex'
    },
    userStateButtons: {
        marginLeft: theme.spacing(15),
        display: 'flex'
    },
    ribbonItems: {
        color: 'black',
        fontSize: '18px',
        textDecoration: 'none',
        marginTop: theme.spacing(.7)
    },
    ribbonItemList: {
        display: 'flex',
        paddingInlineStart: '20px',
      },
      sortingRibbon: {
        display: 'block',
        marginLeft: theme.spacing(5)
      },
      inputRoot: {
        color: 'inherit',
        // backgroundColor: '#EFEFEF'
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        // transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //   width: '12ch',
        //   '&:focus': {
        //     width: '20ch',
        //   },
        // },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
        border: '1px solid',
        borderColor: '#EDEDED'
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black'
      },
      readitLogoText: {
        display: 'flex',
        color: 'black',
        textDecoration: 'none',
        fontSize: '25px',
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(1.7)
      },
      readitLogo: {
        display: 'flex',
        color: 'white',
        textDecoration: 'none',
        backgroundColor: theme.palette.error.main,
        marginRight: theme.spacing(1)
        // fontSize: 'large',
      },
      supplementaryIcon: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(.7),
        marginRight: theme.spacing(.5)
      },
      userStateRibbonItems: {
        marginRight: theme.spacing(2),
        color: 'black',
        fontSize: '18px',
        textDecoration: 'none',
        marginTop: theme.spacing(.7)
      }
}));



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


