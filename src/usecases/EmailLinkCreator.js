
const swapASCIINewLineWithUnicodeCRLF = (str) => str.split('\n').join('%0D%0A')

module.exports.getMailtoLink = (recepients, subject, body) => {
    return `mailto:${recepients}?subject=${subject}&body=${swapASCIINewLineWithUnicodeCRLF(body)}`
}
