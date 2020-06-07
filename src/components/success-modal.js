import React from "react"
import "./layout.css"
import { Modal, Button, Form, Overlay, Tooltip } from "react-bootstrap"
import CopyToClipboard from "react-copy-to-clipboard"

export default class SuccessModal extends React.Component {
    constructor(props) {
        super(props)
        this.copyToClipboard = this.copyToClipboard.bind(this)
        this.state = {
            showCopiedToolTip: false
        }
    }

    copyToClipboard = (event) => {
        this.setState({ showCopiedToolTip: true})
    }

    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.closeModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Successfully Posted Campaign</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    Below is the link to your campaign. Please copy this link and save it, you will not have access to it again form this site.
                    </Modal.Body>
                    <Modal.Body>
                        <CopyToClipboard text={this.props.data.link} onCopy={this.copyToClipboard}>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>URL Link</Form.Label>
                                    <Form.Control type="text" value={this.props.data.link}/>
                                    <Button variant="secondary">Copy</Button>
                                    {/* <Overlay show={this.state.showCopiedToolTip} placement="right">
                                        {(props) => (
                                        <Tooltip>
                                            Copied Link!
                                        </Tooltip>
                                        )}
                                    </Overlay> */}
                                </Form.Group>
                            </Form>
                        </CopyToClipboard>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={this.props.closeModal}>
                        Understood
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
