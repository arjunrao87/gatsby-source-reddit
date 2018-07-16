import fetchData from "./fetch"
import { Node } from "./nodes"
import { capitalize } from "lodash"

exports.sourceNodes = async (
  { boundActionCreators },
  {
    apiURL = `https://www.graphqlhub.com/graphql`,
    username,
    subredditName
  }
) => {
  const { createNode } = boundActionCreators
  const data = await fetchData({
    apiURL,
    username,
    subredditName,
  })
  const node = Node(capitalize(data.fullnameId), data)
  createNode(node)
}