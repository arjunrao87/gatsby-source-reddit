# gatsby-source-reddit ![npm](https://img.shields.io/npm/v/gatsby-source-reddit.svg) ![npm](https://img.shields.io/npm/dt/gatsby-source-reddit.svg)

Source plugin for pulling data into Gatsby from [Reddit API](https://www.graphqlhub.com/playground/reddit)

# Usage

## NPM

Package available [here](https://www.npmjs.com/package/gatsby-source-reddit)

## Available parameters
- username : user for who you want to query data
- subredditName : subreddit for which you want to query data

If neither is provided, then an empty node with a random ID is passed back

## gatsby-config.js
```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-reddit`,
    options: {
      username:`gallowboob`
    }
  },
]
```

or

```javascript
plugins: [
  {
    resolve: `gatsby-source-reddit`,
    options: {
      subreddit:`pics`
    }
  },
]
```

# GraphQL queries
```
fragment UserDetails on RedditUser {
  fullnameId
  username
  created
  createdISO
  linkKarma
  commentKarma
}

fragment CommentDetails on RedditComment {
  author {
    ...UserDetails
  }
  body
}

query user {
  reddit {
    user(username: "aristotle") {
      ...UserDetails
    }
  }
}

query subreddit {
  reddit {
    subreddit(name: "dataisbeautiful") {
      name
      fullnameId
      title
      publicDescription
      accountsActive
      subscribers
      created
      createdISO
      hotListings {
        title
        fullnameId
        score
        numComments
        url
        author {
          ...UserDetails
        }
        comments {
          ...CommentDetails
        }
      }
      newListings {
        title
        fullnameId
        score
        numComments
        url
        author {
          ...UserDetails
        }
        comments {
          ...CommentDetails
        }
      }
      risingListings {
        title
        fullnameId
        score
        numComments
        url
        author {
          ...UserDetails
        }
        comments {
          ...CommentDetails
        }
      }
      controversialListings {
        title
        fullnameId
        score
        numComments
        url
        author {
          ...UserDetails
        }
        comments {
          ...CommentDetails
        }
      }
      topListings {
        title
        fullnameId
        score
        numComments
        url
        author {
          ...UserDetails
        }
        comments {
          ...CommentDetails
        }
      }
    }
  }
}
```