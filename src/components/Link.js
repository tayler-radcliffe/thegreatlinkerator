import React from 'react';
import { updateCount } from '../api';
import '../style.css';

const Link = ({searchTerm, link, onSearchLinks, setSearchTerm}) => {


    function refreshPage() {
        window.location.reload(false);
      }

    const handleClick = async () => {
        await updateCount(link.id);
        refreshPage();
    }


    return (
        <div className='links'>
            <br></br>
            <a href={link.url} target="about:blank" onClick={handleClick}>{link.url}</a>
            <h3>Click Count: {link.count}</h3>
            <h3>Comment: {link.comment}</h3>
            <h3>Date Added: {link.date}</h3>
            <h3>Tags: {link.tags.map((tag) => <p>{tag.name}</p>)}
            </h3>
            <br></br>

        </div>
    )
}

export default Link;