import axios from "axios"
import {user, subreddit} from "./query"
import { isObject, startsWith, forEach } from "lodash"

module.exports = async ({ apiURL = "https://www.graphqlhub.com/graphql", username, subredditName }) => {
  console.time("Fetch Reddit data")
  const query = username ? user(username) : subreddit(subredditName);
  const {data} = await axios({ url:apiURL,
                                  method: 'post',
                                  data: {
                                    query: query
                                  }
                                }).catch(error=>{
                                  console.log(error);
                                });
  console.timeEnd("Fetch Reddit data" )
  if (username) {
    return clean(data.data.reddit.user)
  } else if(subredditName){
    return clean(data.data.reddit.subreddit)
  } else {
    return []
  }
}

/**
 * Remove fields starting with `_` symbol.
 *
 * @param {object} item - Entry needing clean
 * @returns {object} output - Object cleaned
 */
const clean = item => {
  forEach(item, (value, key) => {
    if (startsWith(key, `__`)) {
      delete item[key]
    } else if (startsWith(key, `_`)) {
      delete item[key]
      item[key.slice(1)] = value
    } else if (isObject(value)) {
      item[key] = clean(value)
    }
  })

  return item
}