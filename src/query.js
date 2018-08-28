const user = username =>
`
fragment UserDetails on RedditUser {
    fullnameId
    username
    created
    createdISO
    linkKarma
    commentKarma
}
  
query user {
    reddit {
      user(username: "${username}") {
        ...UserDetails
      }
    }
}
`

const subreddit = subredditName =>
`
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
  
  query subreddit {
    reddit {
      subreddit(name: "${subredditName}") {
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
        }
      }
    }
  }  
`

module.exports = {
    user,
    subreddit
}