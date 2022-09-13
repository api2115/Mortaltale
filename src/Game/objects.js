

class object{
    constructor(occupied,symbol) {
        this.occupied=occupied
        this.symbol=symbol
    }
}

class door{
    constructor(occupied,symbol,closed) {
        this.occupied=occupied
        this.symbol=symbol
        this.closed=closed
    }
}

const FrontDoor = new door(2,"🚪",0)
const ExitDoor = new door(3,"🚪",0)

const wall = new object(1,"# ")
const floor = new object(0,'\u00A0'+'\u00A0')

export {FrontDoor,wall,floor,ExitDoor}