module.exports = (stations, timestamp) => {
    const buttons = {
        prev: {
            do: 'prev',
            d: timestamp,
            f: stations.from,
            t: stations.to
        },
        next: {
            do: 'next',
            d: timestamp,
            f: stations.from,
            t: stations.to
        },
        back: {
            do: 'back'
        }
    }

    return [
        [{
            text: '⏮',
            callback_data: JSON.stringify(buttons.prev)
        },{
            text: '⏭',
            callback_data: JSON.stringify(buttons.next)
        }
        ],[
            {
                text: 'К выбору направления',
                callback_data: JSON.stringify(buttons.back)
            }
        ]
    ]
}