import React, { useState, useEffect } from 'react';
import Link from './Link';
import LinkForm from './LinkForm';
import Header from './Header';
import { Button } from '@material-ui/core';
import '../style.css';

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

  console.log(links);

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
  }


  return (
    <div className="App">

      <Header onSearchLinks={onSearchLinks} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <br></br>
      <Button
        className='button'
        color='secondary'
        variant='contained'
        onClick={showLinkForm}
      >{openLinkForm ? 'Hide' : 'Add a Link'}</Button>

      <LinkForm openLinkForm={openLinkForm}
        setOpenLinkForm={setOpenLinkForm}
        setLinks={setLinks} />
        <br></br>


      <Button
        className='button'
        color='secondary'
        variant='contained'
        onClick={handleClick}
      >{sortLinks ? 'Sort by most popular' : 'Sort by least popular'}</Button>

      <br></br>

      {searchLinks ? searchLinks.map((link, idx) =>

        <Link link={link} links={links} key={idx} setLinks={setLinks} setSearchLinks={setSearchLinks}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchLinks={onSearchLinks}/>) : <div>Use the button to save a new link</div>}


    </div>
  );
}

export default App;