// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'thegreatlinkerator'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
async function createLink({
  url,
  comment,
  date,
  tags
}) {

  if(!date) {
    date = null;
  }

  if (!tags) {
    tags = []
  };

  try {
    const { rows: [createdlink] } = await client.query(`
      INSERT INTO links(url, comment, date) 
      VALUES($1, $2, $3) 
      ON CONFLICT (url) DO NOTHING 
      RETURNING *;
    `, [url, comment, date]);

    const tagList = await createTags(tags);

    return await addTagsToLink(createdlink.id, tagList);

  } catch (error) {
    throw error;
  }
}


async function getAllLinks() {
  try {
    const { rows: links } = await client.query(`
      SELECT *
      FROM links;
    `);

    const link = await Promise.all(links.map(link => getLinkById(link.id)));

    return link;

  } catch (error) {
    throw error;
  }
}



async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertValues = tagList.map(
    (_, index) => `$${index + 1}`).join('), (');


  const selectValues = tagList.map(
    (_, index) => `$${index + 1}`).join(', ');


  try {
    const sqlInsert = `
      INSERT INTO tags(name)
      VALUES (${insertValues})
      ON CONFLICT (name) DO NOTHING`;

    await client.query(sqlInsert, tagList);

    const sqlSelect = `
      SELECT * FROM tags
      WHERE name
      IN (${selectValues})`;

    const { rows } = await client.query(sqlSelect, tagList);
    return rows;

  } catch (error) {
    throw error;
  }
}



async function createLinkTag(linkId, tagId) {
  try {
    await client.query(`
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `, [linkId, tagId]);
  } catch (error) {
    throw error;
  }
}


async function getLinkById(linkId) {
  try {
    const { rows: [link] } = await client.query(`
      SELECT *
      FROM links
      WHERE id=$1;
    `, [linkId]);

    const { rows: tags } = await client.query(`
      SELECT tags.*
      FROM tags
      JOIN link_tags ON tags.id=link_tags."tagId"
      WHERE link_tags."linkId"=$1;
    `, [linkId])

    link.tags = tags;

    return link;
  } catch (error) {
    throw error;
  }
}



async function addTagsToLink(linkId, tagList) {
  try {
    const createLinkTagPromises = tagList.map(
      tag => createLinkTag(linkId, tag.id)
    );

    await Promise.all(createLinkTagPromises);

    return await getLinkById(linkId);
  } catch (error) {
    throw error;
  }
}




async function getLinksByTagName(tagName) {
  try {
    const { rows: linkIds } = await client.query(`
      SELECT links.id
      FROM links
      JOIN link_tags ON links.id=link_tags."linkId"
      JOIN tags ON tags.id=link_tags."tagId"
      WHERE tagName=$1;
    `, [tagName]);

    return await Promise.all(linkIds.map(
      link => getLinkById(link.id)
    ));
  } catch (error) {
    throw error;
  }
}



async function updateLink({ id, url, comment }) {
  try {
    const { rows: [links] } = await client.query(`
        UPDATE links
        SET url = $2, comment = $3
        WHERE id = $1
        RETURNING *
    `, [id, url, comment]);

    return links;

  } catch (error) {
    throw error;
  }
}


async function updateTags({ id, name }) {

  try {
    const { rows: [tags] } = await client.query(`
      UPDATE tags
      SET NAME = $2
      WHERE id = $1
      RETURNING *
    `, [id, name]);

    return tags;

  } catch (error) {
    throw error;
  }
}

async function updateCount(linkId) {
  try {
    const { rows: links } = await client.query(`
      UPDATE links
      SET count = count + 1
      WHERE id = $1;
    `, [linkId])

  } catch (error) {
    throw error;
  }
}


// export
module.exports = {
  client,
  createLink,
  getAllLinks,
  createTags,
  createLinkTag,
  getLinkById,
  getLinksByTagName,
  addTagsToLink,
  updateLink,
  updateTags,
  updateCount


  // db methods
}