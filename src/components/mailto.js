import React from "react"
import Layout from "../components/layout"
import { Button, Modal } from "react-bootstrap"

export default class MailTo extends React.Component {

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
                        {/* <Button>Gmail</Button>
                        <Button>Yahoo</Button> */}
                        <Button href={this.props.link}>Open Email</Button>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}