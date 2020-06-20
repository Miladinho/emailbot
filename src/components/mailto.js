import React from "react"
import { Button, Modal } from "react-bootstrap"
const { getMailtoLink } = require("../usecases/EmailLinkCreator")

export default class MailTo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mailtoLink: getMailtoLink(props.recepients, props.subject, props.body),
        }
        console.log('data under..', props)
        console.log(getMailtoLink(props.recepients, props.subject, props.body))
    }

    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    // onHide={this.props.closeModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Click on the button below to open this campaign in your desired email client :)
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button>Gmail</Button>
                        {/* <Button>Yahoo</Button> */}
                        <Button href={this.props.link}>Open Email</Button>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
