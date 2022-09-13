import {useEffect, useRef, useState} from 'react'
import {FrontDoor,wall,floor,ExitDoor} from "../Game/objects";
import {printMap,move} from "../Game/actions"
import {player1} from "../Game/player";

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
        [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
        [wall,floor,floor,floor,floor,floor,floor,floor,floor,floor,wall],
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
        if(prevXY!==undefined) {
            const madeMove=move(rooms[roomNumber],positionX,positionY,prevXY,roomNumber,rooms)
            if(madeMove!==undefined) {
                setRooms([...rooms.slice(0, roomNumber), madeMove.newroom, ...rooms.slice(roomNumber + 1)])
                setPositionX(madeMove.newposX)
                setPositionY(madeMove.newposY)
                if(madeMove.newrnumber!==undefined){
                    setRoomNumber(madeMove.newrnumber)
                }
            }
        }
    },[positionX,positionY])



    const detectKeyDown = (e) => {
        const PossibleMoves = ["a","s","d","w"]
        if(PossibleMoves.includes(e.key)){
            if(e.key==="s"){
                setPositionY(positionY=>positionY+1)
            }
            if(e.key==="d"){
                setPositionX(positionX=>positionX+1)
            }
            if(e.key==="w"){
                setPositionY(positionY=>positionY-1)
            }
            if(e.key==="a"){
                setPositionX(positionX=>positionX-1)
            }
        }
    }


    return(
        <div>
            {rooms?printMap(rooms[roomNumber]):<div>321</div>}
            <div>
                {positionX+" "+positionY}
            </div>
        </div>
    )
}

export default NormalMode