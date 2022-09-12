import {floor} from "./objects";
import {player1} from "./player";


export function printMap(Map){
    return (
        <div>
            {Map.length>0?
                <div>
                    {Map.map(row=>{
                        return(
                            <div key={Math.floor(Math.random()*9999)}>
                                {row[0].symbol+row[1].symbol+row[2].symbol+row[3].symbol+row[4].symbol+row[5].symbol+row[6].symbol+row[7].symbol+row[8].symbol+row[9].symbol+row[10].symbol}
                            </div>
                        )
                    })}
                </div>
                :<div>Loading map</div>}
        </div>

    )
}

export function move(Map,positionX,positionY,prevXY){
    if(Map[positionY][positionX].occupied===1){
        return({newroom:Map,newposX:prevXY.x,newposY:prevXY.y})
    }else if(Map[positionY][positionX].occupied===0){
        if(positionX!==prevXY.x){
            if(positionX>prevXY.x) {
                const temp = [...Map.slice(0, positionY), [...Map[positionY].slice(0, positionX-1), floor, player1, ...Map[positionY].slice(positionX + 1)], ...Map.slice(positionY + 1)]
                return({newroom:temp,newposX:positionX,newposY:positionY})
            }else{
                const temp = [...Map.slice(0, positionY), [...Map[positionY].slice(0, positionX), player1,floor, ...Map[positionY].slice(positionX + 2)], ...Map.slice(positionY + 1)]
                return({newroom:temp,newposX:positionX,newposY:positionY})
            }
        }else {
            if(positionY>prevXY.y){
                const temp = [...Map.slice(0, positionY-1), [...Map[positionY-1].slice(0, positionX), floor, ...Map[positionY-1].slice(positionX + 1)], [...Map[positionY].slice(0, positionX), player1, ...Map[positionY].slice(positionX + 1)], ...Map.slice(positionY + 1)]
                return({newroom:temp,newposX:positionX,newposY:positionY})
            }else{
                const temp = [...Map.slice(0, positionY), [...Map[positionY].slice(0, positionX), player1, ...Map[positionY].slice(positionX + 1)], [...Map[positionY+1].slice(0, positionX), floor, ...Map[positionY+1].slice(positionX + 1)], ...Map.slice(positionY + 2)]
                return({newroom:temp,newposX:positionX,newposY:positionY})
            }
        }
    }
}