import fetchData from "./fetch"
import { Node } from "./nodes"
import crypto from 'crypto';

exports.sourceNodes = ({ actions, createNodeId }, configOptions) => {
  const { createNode } = actions
  const processData = data => {
    const nodeId = data.fullnameId ? createNodeId(data.fullnameId) : Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    const nodeContent = JSON.stringify(data)
    const nodeContentDigest = crypto
      .createHash('md5')
      .update(nodeContent)
      .digest('hex')

    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Reddit`,
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    })

    return nodeData
  }
  return (
    fetchData(configOptions)
      .then( response => {
        return response
      })
      .then( data => {
        const nodeData = processData(data);
        createNode(nodeData)
      }) 
  )
}