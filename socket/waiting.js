const init = async (waitingAdminIO) => {
    waitingAdminIO.emit('plusWaitingCount');
};

const destroy = (waitingAdminIO) => {
    waitingAdminIO.emit('minusWaitingCount');
};

module.exports = {
    init,
    destroy,
}