'use strict;'

const assert = require('assert')
const { getMailtoLink, getGmailLink } = require('./EmailLinkCreator')

describe('Email Link Creator Tests', () => {
    const subject = 'An email subject'
    const body = 'This is a message'

    context('Get Plain Mailto Link', () => {
        it('should make valid link for 1 recepient', () => {
            const recepient = "someone@email.com"
            const expectedResult = 
                "mailto:"+recepient+"?subject="+subject+"&body="+body
            assert.equal(
                getMailtoLink(recepient, subject, body),
                expectedResult
            )
        })
        it('should make a valid link for multiple recepients', () => {
            const recepients = ['someone@email.com', 'person@person.com']
            const expectedResult = 
                `mailto:${recepients[0]},${recepients[1]}?subject=${subject}&body=${body}`
            assert.equal(
                getMailtoLink(recepients, subject, body),
                expectedResult
            )
        })
        it('should make a valid link for multi-line body message', () => {
            const body = 'hello\nthis is a\nmessage'
            const recepients = ['someone@email.com', 'person@person.com']
            const expectedResult = 
                `mailto:${recepients[0]},${recepients[1]}?subject=${subject}&body=hello%0D%0Athis is a%0D%0Amessage`
            assert.equal(
                getMailtoLink(recepients, subject, body),
                expectedResult
            )
        })
    })

    context('Get Gmail Link', () => {
        it('should make valid link for 1 recepient', () => {
            const recepient = "someone@email.com"
            const expectedResult = 
            `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${recepient}&su=${subject}&body=${body}`
            assert.equal(
                getGmailLink(recepient, subject, body),
                expectedResult
            )
        })
        it('should make a valid link for multiple recepients', () => {
            const recepients = ['someone@email.com', 'person@person.com']
            const expectedResult = 
                `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${recepients[0]},${recepients[1]}&su=${subject}&body=${body}`
            assert.equal(
                getGmailLink(recepients, subject, body),
                expectedResult
            )
        })
        it('should make a valid link for multi-line body message', () => {
            const body = 'hello\nthis is a\nmessage'
            const recepients = ['someone@email.com', 'person@person.com']
            const expectedResult = 
                `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${recepients[0]},${recepients[1]}&su=${subject}&body=hello%0D%0Athis is a%0D%0Amessage`
            assert.equal(
                getGmailLink(recepients, subject, body),
                expectedResult
            )
        })
    })
})
