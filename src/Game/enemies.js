
class enemy{
    constructor(symbol,stats) {
        this.symbol=symbol
        this.stats=stats
    }
}

const Rat = new enemy("R ",{hp:10,maxhp:10,strength:2,speed:10})



export {Rat,enemy}