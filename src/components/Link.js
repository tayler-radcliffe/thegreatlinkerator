import React from 'react';
import { getLinks, updateCount } from '../api';
import '../style.css';

const Link = ({setLinks, link}) => {


    const handleClick = async () => {
        await updateCount(link.id)
        const newLinks = await getLinks();
        setLinks(newLinks);
    }


    return (
        <div className='links'>
            <a href={link.url} target="about:blank" onClick={handleClick}>{link.url}</a>
            <h2>Click Count: {link.count}</h2>
            <h2>Comment: {link.comment}</h2>
            <h2>Tags: 
                {link.tags.map((tag) => 
                    <h1>{tag.name}</h1>)}
            </h2>
        </div>
    )
}

export default Link;