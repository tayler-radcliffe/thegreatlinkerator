import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { createLink, getLinks } from '../api';
import '../style.css';
import swal from 'sweetalert';

const LinkForm = ({openLinkForm, setOpenLinkForm, setLinks}) => {

    const [linkUrl, setLinkUrl] = useState('');
    const [linkComment, setLinkComment] = useState('');
    const [linkTags, setLinkTags] = useState('');


if(openLinkForm === true) {
    return (
        <form className='form' onSubmit={async(e) => {
            e.preventDefault();
            const date = new Date();
            await createLink(linkUrl, linkComment, date, linkTags)
            swal("Success", "Your link was added!", "success" )
            setLinkUrl('');
            setLinkComment('');
            setLinkTags('');
            setOpenLinkForm(false);

        }}>
            <TextField 
                id="outlined-basic" 
                label="Link URL" 
                variant="outlined" 
                onChange={(e) => setLinkUrl(e.target.value)}
                />
            <TextField 
                id="outlined-basic" 
                label="Comment" 
                variant="outlined" 
                onChange={(e) => setLinkComment(e.target.value)}
                />
            <TextField 
                id="outlined-helperText"
                label="Tags" 
                variant="outlined" 
                helperText='Use a comma to seperate tags'
                onChange={(e) => setLinkTags(e.target.value)}
                />
            <Button
                className='button'
                variant='contained'
                color='secondary'
                type='submit'
                >Add Link</Button>

        </form>
    )} else return (
        <div></div>
    )
}

export default LinkForm;