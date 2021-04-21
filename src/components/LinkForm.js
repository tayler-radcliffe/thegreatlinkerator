import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { createLink, getLinks } from '../api';
import '../style.css';
import swal from 'sweetalert';

const LinkForm = ({ openLinkForm, setOpenLinkForm, setLinks, links }) => {

    const [linkUrl, setLinkUrl] = useState('');
    const [linkComment, setLinkComment] = useState('');
    const [linkTags, setLinkTags] = useState('');

    function refreshPage() {
        window.location.reload(false);
    }
    

    if (openLinkForm === true) {
        return (
            <form className='form' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} onSubmit={async (e) => {
                e.preventDefault();
                const date = new Date();
                await createLink(linkUrl, linkComment, date, linkTags)
                swal("Success", "Your link was added!", "success")
                setLinkUrl('');
                setLinkComment('');
                setLinkTags('');
                setOpenLinkForm(false);
                refreshPage();

            }}>
                <TextField
                    style={{ margin: '10px' }}
                    id="outlined-basic"
                    label="Link URL"
                    variant="outlined"
                    helperText='Please include http:// in your link'
                    onChange={(e) => setLinkUrl(e.target.value)}
                />
                <TextField
                    style={{ margin: '10px' }}
                    id="outlined-basic"
                    label="Comment"
                    variant="outlined"
                    onChange={(e) => setLinkComment(e.target.value)}
                />
                <TextField
                    style={{ margin: '10px' }}
                    id="outlined-helperText"
                    label="Tags"
                    variant="outlined"
                    helperText='Use a space to seperate tags'
                    onChange={(e) => setLinkTags(e.target.value)}
                />
                <Button
                    className='button'
                    variant='contained'
                    color='primary'
                    type='submit'
                >Add Link</Button>

            </form>
        )
    } else return (
        <div></div>
    )
}

export default LinkForm;