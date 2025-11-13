async function increase(duration) {

    //first, let's increase time
    await web3.currentProvider.sendAsync({
        jsonrpc: "2.0",
        method: "evm_increaseTime",
        params: [duration], // there are 86400 seconds in a day
        id: new Date().getTime()
    }, () => {});

    //next, let's mine a new block
    web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_mine',
        params: [],
        id: new Date().getTime()
    })

}