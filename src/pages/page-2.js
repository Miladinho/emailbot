import React from "react"
import { Link, navigate } from "gatsby"

import { Form, Button } from "react-bootstrap"
import Layout from "../components/layout"
import SuccessModal from "../components/success-modal"
import SEO from "../components/seo"
import firebase from "gatsby-plugin-firebase"
import uniqid from "uniqid"
const { getMailtoLink } = require("../usecases/EmailLinkCreator")

export default class SecondPage extends React.Component {
  constructor(props) {
    super(props)
    this.show = false
    this.data = new Map()
    this.state = {
      emails: [],
      identifier: "",
      subject: "",
      content: "",
      mailto: "",
      link: "",
      show: false
    }
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.data.set([name], value)
    this.setState({
      [name]: value,
    })
  }

  closeModal = () => {
    this.setState({show: false})
    navigate("/")
  }

  showModal = () => this.setState({show: true})
  
  handleSubmit = event => {
    event.preventDefault()

    const id = uniqid.time()
    this.data.set("mailto", getMailtoLink(this.state.emails, this.state.subject, this.state.content))
    this.data.set("identifier", id)
    this.data.set("link", `georgefloyd.help/?id=${id}`)
    this.data.set("timestamp", (new Date()).getTime())
    this.data.set("views", 0)
    this.data.set("clicks", 0)

    setTimeout(()=>{}, 3000)

    firebase.database().ref(`campaigns/${id}`).set(Object.fromEntries(this.data), 
      (error) => {
        if (error) alert(error)
        else this.showModal()
      })
  }

  render() {
    return (
      <Layout>
        <SEO title="Create Campaign" />
        <h1>Create a campagin below by filing out the form</h1>
        <SuccessModal show={this.state.show} data={Object.fromEntries(this.data)} closeModal={this.closeModal}></SuccessModal>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Email addresses (seperate by comma)</Form.Label>
            <Form.Control name="emails" type="email" placeholder="rep1@entity.gov, rep2@entity.gov" onChange={this.handleInputChange} required/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title/Description</Form.Label>
            <Form.Control name="subject" type="text" placeholder="What is this about?" onChange={this.handleInputChange} required/>
        </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your message here...</Form.Label>
            <Form.Control name="content" as="textarea" rows="10" placeholder="To Whom it May Concern ..." onChange={this.handleInputChange} required/>
          </Form.Group>
          <Button variant="primary" type="submit" style={{background: `rebeccapurple`, color: `white`}}>Create</Button>
        </Form>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}
