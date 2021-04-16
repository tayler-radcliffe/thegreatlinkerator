// code to build and initialize DB goes here
const {
  client,
  createLink,
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(` 
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
     
    `);
    console.log("Finished dropping tables!");

    // build tables in correct order
    console.log("Starting to build tables...");
    await client.query(`
    CREATE TABLE links(
      id SERIAL PRIMARY KEY,
      url varchar(255) UNIQUE,
      count INTEGER DEFAULT 0,
      comment TEXT NOT NULL,
      date DATE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE tags (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
      );

      CREATE TABLE link_tags (
        "linkId" INTEGER REFERENCES links(id),
        "tagId" INTEGER REFERENCES tags(id),
        UNIQUE ("linkId", "tagId")
      );
  `);
      
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function populateInitialData() {
  try {
    const links = [
      { url: 'https://www.google.com/',
        comment: 'Search anything around the web',
        tags: ['searchEngine', 'google'] },
      { url: 'https://twitch.com/', 
        comment: 'Watch streamers play video games',
        tags: ['streamers', 'videoGames'] },
      { url: 'https://www.dreamdedicated.com/', 
        comment: 'Service for marketing using social media video ads!',
        tags: ['advertising', 'marketing'] }
    ]
    const createdLinks = await Promise.all(links.map((link) =>
      createLink({
        url: link.url, 
        comment: link.comment, 
        tags: link.tags})));
    console.log(createdLinks);
  
    console.log("Finished creating initial data!");
  } catch (error) {
    console.error("Error creating initial data!");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());