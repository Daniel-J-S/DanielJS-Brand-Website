const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const StoreTemplate = path.resolve('./src/templates/details.js');
    const ArticleTemplate = path.resolve('./src/templates/articleDetails.js');
    resolve(
      graphql(`
        {
          allContentfulProduct{
            edges{
              node{
                id
                slug
              }
            }
          }
          allContentfulArticles {
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
        result.data.allContentfulProduct.edges.forEach(edge => {
          createPage({
            path: edge.node.slug,
            component: StoreTemplate,
            context: {
              slug: edge.node.slug,
            },
          })
        });
        result.data.allContentfulArticles.edges.forEach(data => {
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
