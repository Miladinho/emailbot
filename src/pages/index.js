import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"

import { Button } from "react-bootstrap"
import firebase from "gatsby-plugin-firebase"
import Layout from "../components/layout"
import MailTo from "../components/mailto"
import queryString from 'query-string'
import { useLocation } from '@reach/router'
import SEO from "../components/seo"

export default class IndexPage extends React.Component {
  // const [ showMailTo, setShowMailTo ] = useState(false)
  // const [ emails, setEmails ] = useState("")
  // const [ subject, setSubject ] = useState("")
  // const [ body, setBody ] = useState("")

  // const query = useLocation().search
  // const id = queryString.parse(query).id

  constructor(props) {
    super(props)
    this.state = {
      subject: "",
      emails: "",
      body: "",
      showMailTo: false
    }
  }

  componentDidUpdate() {
    const id = queryString.parse(this.props.location.search).id
    if (id === undefined)
      return

    firebase.database().ref(`campaigns/${id}`)
      .once("value")
      .then( snapshot => {
        const result = snapshot.val()
        if (result) {
          this.setState({
            emails: result.emails,
            subject: result.subject,
            body: result.content,
            showMailTo: true
          })
          this.forceUpdate()
        } 
      })
  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (id === undefined)
  //       return

  //     try {
  //       const ref = firebase.database().ref(`campaigns/${id}`)
  //       const snapshot = await ref.once("value")
  //       const result = snapshot.val()
  //       if (result) {
  //         setEmails(result.emails)
  //         setSubject(result.subject)
  //         setBody(result.content)
  //         setShowMailTo(true)
  //         console.log(result, result.content)
  //       }
  //     } catch(error) {
  //       alert("Server Error.")
  //     }
  //   }
  //   fetchData()
  // }, [id])
  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <MailTo recepients={this.state.emails} subject={this.state.subject} body={this.state.body} show={this.state.showMailTo} ></MailTo>
        <h1>About</h1>
        <p>In honor of the late George Floyd, this is a prototype application to allow for you to easily write email campagins for your elected representatives. We will give you a link that when clicked will open the email client with your prefilled campaign email. You can share this link with friends so they can easily just click and send on their behalf.</p>
        <p>Click on the "Create" button below to begin a new campaign. Click on the "Search" button to find a campaign </p>
        <Button variant="primary" size="lg" style={{background: `rebeccapurple`, color: `white`}} onClick={ event => {
          event.preventDefault()
          navigate('/page-2')
        }}>Create</Button>
        <br />
      </Layout>
    )
  }
}

// export default IndexPage
