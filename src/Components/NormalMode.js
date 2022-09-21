import {useEffect, useRef, useState} from 'react'
import {FrontDoor,wall,floor,ExitDoor} from "../Game/objects";
import {printMap, move, printStat, checkFight, findPlayer} from "../Game/actions"
import {player1} from "../Game/player";
import "../Style/NormalMode.scss"
import {Rat} from "../Game/enemies";
import FightScreen from "../Game/fightScreen";

function usePrevious(value){
    const ref = useRef()
    useEffect(()=>{
        ref.current = value
    },[value])
    return ref.current
}

const defroom =[
    [wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall],
    [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
    [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
    [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
    [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
    [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
    [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
    [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
    [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
    [wall,floor,floor,floor,floor,player1,floor,floor,floor,floor,wall],
    [wall,wall,wall,wall,wall,ExitDoor,wall,wall,wall,wall,wall]
]

function NormalMode(){
    const [player,setPlayer] = useState(player1)
    const [fight,setFight] = useState(false)
    const [fightOutcome,setFightOutcome] = useState(null)
    const [enemy,setEnemy] = useState(null)
    const [positionX,setPositionX] = useState(5)
    const [positionY,setPositionY] = useState(9)
    const prevXY = usePrevious({x:positionX,y:positionY})
    const [roomNumber,setRoomNumber] = useState(0)
    const [rooms,setRooms] = useState([[
        [wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall],
        [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
        [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
        [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
        [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
        [FrontDoor,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
        [wall,floor,floor,Rat,floor,floor,floor,floor,floor,floor,wall],
        [wall,floor,floor,floor,floor,floor,floor,floor,Rat,floor,wall],
        [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
        [wall,floor,floor,floor,floor,player1,floor,floor,floor,floor,wall],
        [wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall]
    ],[
            [wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall],
            [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
            [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
            [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
            [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
            [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
            [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
            [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
            [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
            [wall,floor,floor,floor,floor,player1,floor,floor,floor,floor,wall],
            [wall,wall,wall,wall,wall,ExitDoor,wall,wall,wall,wall,wall]
        ]]
        )



    useEffect(()=>{
        document.addEventListener('keydown',detectKeyDown,true)
    },[])


    useEffect(()=>{
        if(prevXY!==undefined && !fight) {
            const madeMove=move(rooms[roomNumber],positionX,positionY,prevXY,roomNumber,rooms)
            if(madeMove!==undefined) {
                setRooms([...rooms.slice(0, roomNumber), madeMove.newroom, ...rooms.slice(roomNumber + 1)])
                setPositionX(madeMove.newposX)
                setPositionY(madeMove.newposY)
                const checkfight=checkFight(madeMove.newroom,madeMove.newposX,madeMove.newposY)
                if(checkfight){
                    setFight(!fight)
                    setEnemy({enemy:madeMove.newroom[checkfight.posY][checkfight.posX],enemyX:checkfight.posX,enemyY:checkfight.posY,Map:madeMove.newroom})
                }
                if(madeMove.newrnumber!==undefined){
                    setRoomNumber(madeMove.newrnumber)
                }
            }
        }
    },[positionX,positionY])

    useEffect(()=>{
        if(fightOutcome && fightOutcome.msg==="you won"){
            setRooms([...rooms.slice(0, roomNumber), fightOutcome.newroom, ...rooms.slice(roomNumber + 1)])
            setFight(!fight)
            const pos=findPlayer(fightOutcome.newroom)
            setPositionY(pos.y)
            setPositionX(pos.x)
        }else if(fightOutcome && fightOutcome.msg==="you lost"){
            window.alert("YOU LOST!!!")
            window.location.reload()
        }
    },[fightOutcome])



    const detectKeyDown = (e) => {
        const PossibleMoves = ["a","s","d","w"]
        if(PossibleMoves.includes(e.key.toLowerCase())){
            if(e.key.toLowerCase()==="s"){
                setPositionY(positionY=>positionY+1)
            }
            if(e.key.toLowerCase()==="d"){
                setPositionX(positionX=>positionX+1)
            }
            if(e.key.toLowerCase()==="w" ){
                setPositionY(positionY=>positionY-1)
            }
            if(e.key.toLowerCase()==="a"){
                setPositionX(positionX=>positionX-1)
            }
        }
    }


    return(
        <div className={"game"}>
            <div>
                {rooms?printMap(rooms[roomNumber]):<div>321</div>}
            </div>
            <div className={"stats"}>
                {printStat(player)}
            </div>
            <div>
                {fight?<FightScreen enemy={enemy} setEnemy={setEnemy} player={player} setPlayer={setPlayer} fightOutcome={fightOutcome} setFightOutcome={setFightOutcome} />:null}
            </div>
        </div>
    )
}

export default NormalMode