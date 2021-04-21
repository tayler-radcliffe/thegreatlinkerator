const { getAllLinks, createLink, updateLink, getLinksByTagName, updateCount, getLinkById, deleteLink } = require('../db');

const apiRouter = require('express').Router();


apiRouter.get('/links', async (req, res, next) => {
  try {
    const links = await getAllLinks();

    res.send(
      links
    );
  } catch ({ name, message }) {
    console.log(name, message)
    next({ name: 'GettingLinksError'
      , message: 'Error getting the links.' });
  }
});



apiRouter.post('/links', async (req, res, next) => {
  const { url, comment, date, tags = [] } = req.body;
  const linkData = {
    url,
    comment,
    date,
    tags,
  };

  const tagArr = tags.trim().split(/\s+/)

  if (tagArr.length) {
    linkData.tags = tagArr;
  }

  try {
    const createdLink = await createLink(linkData);


    if(createdLink) { 
      res.send({ createdLink });
    }

  } catch ({ name, message }) {
    next({ name: 'CreateLinkError', 
    message: 'There was an error creating this link.'});
  }
});



apiRouter.patch('/links/:linkId', async (req, res, next) => {
  const { linkId } = req.params;
  const { url, comment } = req.body;

  const updateFields = {};

  if (url) {
    updateFields.url = url;
  }

  if (comment) {
    updateFields.comment = comment;
  }

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }

  try {
    const updatedLink = await updateLink({
      id: linkId,
      url: updateFields.url,
      comment: updateFields.comment
    });
      res.send({ 
        updatedLink: updatedLink })
 
    }
    catch ({ name, message }) {
    next({ name, message });
  }
});



apiRouter.get('/tags/:tagName/links', async (req, res, next) => {
  const tagName = req.params;
 
  try {
    const getTaggedLinks = await getLinksByTagName(tagName.tagName);
    res.send({ 
      getTaggedLinks 
    })
   
  } catch ({ name, message }) {
    next({ name, message });
  }
});


apiRouter.patch("/:linkId/count", async (req, res, next) => {
  const { linkId } = req.params;

  try {
    await updateCount(linkId);
    res.send({
      message: 'Link has been clicked'
    })
  } catch (error) {
    throw error;
  }

});


apiRouter.delete('/:linkId', async (req, res, next) => {
  const { linkId } = req.params;
  
  try {
     await deleteLink(linkId);

      res.send ({
        message: 'Link has been clicked'
      })

  } catch (error){
      throw(error);
  }
});



module.exports = apiRouter;
