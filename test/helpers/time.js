// La fonction n'a plus besoin d'être "async"
function increase(duration) {
    const id = Date.now();

    return new Promise((resolve, reject) => {
        // 1. Envoyer la commande evm_increaseTime
        web3.currentProvider.send(
            {
                jsonrpc: '2.0',
                method: 'evm_increaseTime',
                params: [duration],
                id: id,
            },
            err1 => {
                if (err1) return reject(err1);

                // 2. Envoyer la commande evm_mine pour forcer la création d'un bloc
                web3.currentProvider.send(
                    {
                        jsonrpc: '2.0',
                        method: 'evm_mine',
                        params: [],
                        id: id + 1,
                    },
                    (err2, res) => {
                        // Résoudre la Promise seulement après le minage
                        return err2 ? reject(err2) : resolve(res);
                    }
                );
            }
        );
    });
}

const duration = {
    // ... (Le reste de l'objet duration reste inchangé)
    seconds: function (val) {
        return val;
    },
    minutes: function (val) {
        return val * this.seconds(60);
    },
    hours: function (val) {
        return val * this.minutes(60);
    },
    days: function (val) {
        return val * this.hours(24);
    },
}

module.exports = {
    increase,
    duration,
};