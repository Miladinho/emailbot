
const swapASCIINewLineWithUnicodeCRLF = (str) => str.split('\n').join('%0D%0A')

module.exports.getMailtoLink = (recepients, subject, body) => {
    if (!recepients || !subject || !body)
        return ""
    return `mailto:${recepients}?subject=${subject}&body=${swapASCIINewLineWithUnicodeCRLF(body)}`
}

module.exports.getGmailLink = (recepients, subject, body) => {
    if (!recepients || !subject || !body)
        return ""
    return `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${recepients}&su=${subject}&body=${swapASCIINewLineWithUnicodeCRLF(body)}`
}
