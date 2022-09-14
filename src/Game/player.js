class player{
    constructor(symbol,stats) {
        this.symbol=symbol
        this.stats=stats
    }
}

const player1 = new player('\ua19c ',{hp:20,maxhp:20,strength:10,inteligence:10,speed:5,defence:10,lvl:1,exp:0,maxexp:100})

export {player1}