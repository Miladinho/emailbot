
const swapASCIINewLineWithUnicodeCRLF = (str) => str.split('\n').join('%0D%0A')

module.exports.getMailto = (recepients, subject, body) => {
    return `mailto:${recepients}?subject=${subject}&body=${swapASCIINewLineWithUnicodeCRLF(body)}`
}