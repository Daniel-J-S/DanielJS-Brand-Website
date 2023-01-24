const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const ArticleTemplate = path.resolve('./src/templates/articleDetails.js');
    resolve(
      graphql(`
        {
          allContentfulArticle {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.allContentfulArticle.edges.forEach(data => {
          createPage({
            path: data.node.slug,
            component: ArticleTemplate,
            context: {
              slug: data.node.slug
            }
          });
        });
      })
    )
  });
};
