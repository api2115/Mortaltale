import {floor} from "./objects";
import {player1} from "./player";
import "../Style/NormalMode.scss"

export function printMap(Map){
    return (
        <div>
            {Map!==undefined?
                <div>
                    {Map.map((row,index)=>{
                        return(
                            <div key={index} >
                                {row[0].symbol+row[1].symbol+row[2].symbol+row[3].symbol+row[4].symbol+row[5].symbol+row[6].symbol+row[7].symbol+row[8].symbol+row[9].symbol+row[10].symbol}
                            </div>
                        )
                    })}
                </div>
                :<div>Loading map</div>}
        </div>

    )
}

export function printStat(player){
    return(
        <div className={"stats"}>
            <div>
                {`HP:${player.stats.hp}/${player.stats.maxhp} Strength:${player.stats.strength} Defence:${player.stats.defence} Inteligence:${player.stats.inteligence} Speed:${player.stats.speed}`}
            </div>
            <div>
                {`LVL:${player.stats.lvl} EXP:${player.stats.exp}/${player.stats.maxexp}`}
            </div>
        </div>

    )
}

export function move(Map,positionX,positionY,prevXY,roomnumber,rooms){
    if(Map!==undefined) {
        if (Map[positionY][positionX].occupied === 1) {
            return ({newroom: Map, newposX: prevXY.x, newposY: prevXY.y})
        } else if (Map[positionY][positionX].occupied === 0) {
            if (positionX !== prevXY.x) {
                if (positionX > prevXY.x) {
                    const temp = [...Map.slice(0, positionY), [...Map[positionY].slice(0, positionX - 1), floor, player1, ...Map[positionY].slice(positionX + 1)], ...Map.slice(positionY + 1)]
                    return ({newroom: temp, newposX: positionX, newposY: positionY})
                } else {
                    const temp = [...Map.slice(0, positionY), [...Map[positionY].slice(0, positionX), player1, floor, ...Map[positionY].slice(positionX + 2)], ...Map.slice(positionY + 1)]
                    return ({newroom: temp, newposX: positionX, newposY: positionY})
                }
            } else {
                if (positionY > prevXY.y) {
                    const temp = [...Map.slice(0, positionY - 1), [...Map[positionY - 1].slice(0, positionX), floor, ...Map[positionY - 1].slice(positionX + 1)], [...Map[positionY].slice(0, positionX), player1, ...Map[positionY].slice(positionX + 1)], ...Map.slice(positionY + 1)]
                    return ({newroom: temp, newposX: positionX, newposY: positionY})
                } else {
                    const temp = [...Map.slice(0, positionY), [...Map[positionY].slice(0, positionX), player1, ...Map[positionY].slice(positionX + 1)], [...Map[positionY + 1].slice(0, positionX), floor, ...Map[positionY + 1].slice(positionX + 1)], ...Map.slice(positionY + 2)]
                    return ({newroom: temp, newposX: positionX, newposY: positionY})
                }
            }
        } else if (Map[positionY][positionX].occupied === 2) {
            if (Map[positionY][positionX].closed === 0) {
                return ({newroom: Map, newposX: 5, newposY: 9, newrnumber: roomnumber + 1})
            }
        }else if(Map[positionY][positionX].occupied === 3){
            for(let i =1; i<10; i++){
                if(rooms[roomnumber-1][1][i]===player1){
                    return({newroom: Map, newposX: i, newposY: 1, newrnumber: roomnumber - 1})
                }else if(rooms[roomnumber-1][i][1]===player1){
                    return({newroom: Map, newposX: 1, newposY: i, newrnumber: roomnumber - 1})
                }else if(rooms[roomnumber-1][i][8]===player1){
                    return({newroom: Map, newposX: 8, newposY: i, newrnumber: roomnumber - 1})
                }
            }
        }
    }
}

export function checkFight(Map,positionX,positionY){
    if(Map[positionY-1][positionX].constructor.name==="enemy"){
        return({posX:positionX,posY:positionY-1})
    }else if(Map[positionY+1][positionX].constructor.name==="enemy"){
        return({posX:positionX,posY:positionY+1})
    }else if(Map[positionY][positionX-1].constructor.name==="enemy"){
        return({posX:positionX-1,posY:positionY})
    }else if(Map[positionY][positionX+1].constructor.name==="enemy"){
        return({posX:positionX+1,posY:positionY})
    }
}

export function findPlayer(Map){
    for(let i=1; i<10; i++){
        for(let e=1; e<10; e++){
            if(Map[i][e]===player1){
                return({x:e,y:i})
            }
        }
    }
}