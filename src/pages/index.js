import React, { useState } from "react"
import { navigate } from "gatsby"

import { Button } from "react-bootstrap"
import firebase from "gatsby-plugin-firebase"
import Layout from "../components/layout"
import MailTo from "../components/mailto"
import queryString from 'query-string'
import { useLocation } from '@reach/router'
import SEO from "../components/seo"

//const fakeData = [{name: "blah", url: "www.example.com"}, {name: "foo", url: "www.example.com"}, {name: "bar", url: "www.example.com"}]
const IndexPage = (props) => {
  // const state = {
  //   showMailTo: false,
  //   link: null
  // }
  const [ showMailTo, setShowMailTo ] = useState(0)
  const [ link, setLink ] = useState()

  const query = useLocation().search
  const id = queryString.parse(query).id
  console.log(id)
  if (id !== undefined) {
    firebase.database().ref(`campaigns/${id}`)
      .once("value")
      .then( (snapshot) => {
        let link = (snapshot.val() && snapshot.val().mailto) || null
        setLink(link)
        if (link) setShowMailTo(true)
      })
  }
  return (
    <Layout>
      <SEO title="Home" />
      <MailTo show={showMailTo} link={link}></MailTo>
      <h1>About</h1>
      <p>In honor of George Floyd, who was brutallly murdered at the hands of Minneapolis Police, this is a prototype application to allow for you to easily write email campagins for your elected representatives in the U.S. Congress and U.S. Senate, we will give you a link that when clicked will open the email cllient with your prefilled campaign email. You can share this link with friends so they can easily just click and send on their behalf. We do not intend to keep any personal information everything is intended to be public and transparent. Please use this application at your own risk, we take no responsibility with how you use this.</p>
      <p>Click on the "Create" button below to begin a new campaign. Click on the "Search" button to find a campaign </p>
      <Button variant="primary" size="lg" style={{background: `rebeccapurple`, color: `white`}} onClick={ event => {
        event.preventDefault()
        navigate('/page-2')
      }}>Create</Button>
      <br />
    </Layout>
  )
}

export default IndexPage