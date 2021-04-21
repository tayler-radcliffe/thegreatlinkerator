import React, { useState, useEffect } from 'react';
import Link from './Link';
import LinkForm from './LinkForm';
import { Button } from '@material-ui/core';
import '../style.css';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Divider } from '@material-ui/core';

import {
  getLinks
} from '../api';

const App = () => {

  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openLinkForm, setOpenLinkForm] = useState(false);
  const [searchLinks, setSearchLinks] = useState([]);
  const [sortLinks, setSortLinks] = useState([]);

  useEffect(() => {
    try {
      Promise.all([getLinks()]).then(([{ data }]) => {
        setLinks(data);
        setSearchLinks(data)
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const showLinkForm = () => {
    if (openLinkForm === false) {
      setOpenLinkForm(true)
    } else setOpenLinkForm(false)
  }

  const onSearchLinks = (searchTerm) => {
    setSearchLinks(links.filter((link) => {
      const linkName = link.url.toLowerCase();
      const linkTags = link.tags.map((tag) => tag.name.toLowerCase())

      return linkName.includes(searchTerm.toLowerCase()) ||
        linkTags.includes(searchTerm.toLowerCase())
    }))
  }

  const handleClick = () => {
    setSortLinks(!sortLinks);
    const sortedLinks = links.sort((a, b) => {
      if (sortLinks) {
        return b.count - a.count
      } else {
        return a.count - b.count
      }
    })
    setLinks(sortedLinks);
    setSearchLinks(sortedLinks);
  }


  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'

    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    search: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      marginTop: '350px',
      borderRadius: theme.shape.borderRadius,
      border: 'solid black',
      borderWidth: '1px',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'default',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="App" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '50px', marginBottom: '100px' }}>

      <div className={classes.root}>
        <h1 style={{ fontSize: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '15%' }}>
          THE GREAT LINKERATOR
          </h1>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            value={searchTerm}
            onChange={async (e) => {
              setSearchTerm(e.target.value);
              onSearchLinks(searchTerm);
            }}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </div>


      <div >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px', flexDirection: 'column' }}>
          <Button
            className='button'
            color='primary'
            variant='contained'
            onClick={showLinkForm}
          >{openLinkForm ? 'Hide' : 'Add a Link'}</Button>

          <LinkForm openLinkForm={openLinkForm}
            setOpenLinkForm={setOpenLinkForm}
            setLinks={setLinks} links={links} />
          <br></br>


          <Button
            className='button'
            color='primary'
            variant='contained'
            onClick={handleClick}
          >{sortLinks ? 'Sort by most popular' : 'Sort by least popular'}</Button>
        </div>
        <br></br>
        <br></br>


        <div style={{
          backgroundColor: '#E0E1E0',
          width: '750px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px',
          border: 'solid darkgray',
          borderWidth: '2px',
          borderRadius: '10px'
        }}>
          {searchLinks ? searchLinks.map((link, idx) =>
            <Link link={link} links={links} key={idx} setLinks={setLinks} setSearchLinks={setSearchLinks}
              searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchLinks={onSearchLinks} />) : <div>Use the button to save a new link</div>}

        </div>
      </div>

    </div>
  );
}

export default App;