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
  subredditName = "aristotle"
  const data = await fetchData({
    apiURL,
    username,
    subredditName,
  })
  const node = Node(capitalize(data.fullNameId), datum)
  createNode(node)
}