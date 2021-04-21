import React, { useState, useEffect } from 'react';
import { updateCount, deleteLink, getLinks } from '../api';
import '../style.css';
import { Divider, Button } from '@material-ui/core';
import swal from 'sweetalert';



const Link = ({searchTerm, link, onSearchLinks, setSearchTerm}) => {

    function refreshPage() {
        window.location.reload(false);
      }

    const handleClick = async () => {
        await updateCount(link.id);
        refreshPage();
    }

    const linkId = link.id;

    const handleDelete = async () => {
        await deleteLink(linkId);
        swal('Success', 'Your link has been deleted!', 'success')
       }


    return (
        <div className='links'>
            <br></br>
            <a href={link.url} target="about:blank" onClick={handleClick} style={{fontSize: '35px', textDecoration: 'none'}}>{link.url}</a>
            <div style={{fontSize: '20px'}}><h3>{link.comment}</h3>
            <h3>You've visted this site {link.count} time(s).</h3>
            <h3>Date Added: {link.date}</h3>
            <h3>Tags: {link.tags.map((tag) => <p>{tag.name}</p>)}
            </h3>
            </div>

            <br></br>
            <br></br>
            <Divider />
            <br></br>

        </div>
    )
}

export default Link;