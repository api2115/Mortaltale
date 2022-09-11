import {useEffect, useRef, useState} from 'react'
import {FrontDoor,wall,floor} from "../Game/objects";
import {printMap} from "../Game/actions"
import {player1} from "../Game/player";

function usePrevious(value){
    const ref = useRef()
    useEffect(()=>{
        ref.current = value
    },[value])
    return ref.current
}

function NormalMode(){
    const [positionX,setPositionX] = useState(5)
    const [positionY,setPositionY] = useState(9)
    const prevX = usePrevious(positionX)
    const prevY = usePrevious(positionY)
    const [Map,setMap]=useState(
        [
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
            [wall,wall,wall,wall,wall,FrontDoor,wall,wall,wall,wall,wall]
        ]
    )



    useEffect(()=>{
        document.addEventListener('keydown',detectKeyDown,true)
    },[])

    useEffect(()=>{
        if(prevX!==undefined) {
            if(positionX>prevX) {
                const temp = [...Map.slice(0, positionY), [...Map[positionY].slice(0, positionX-1), floor, player1, ...Map[positionY].slice(positionX + 1)], ...Map.slice(positionY + 1)]
                setMap(temp)
            }else {
                const temp = [...Map.slice(0, positionY), [...Map[positionY].slice(0, positionX), player1,floor, ...Map[positionY].slice(positionX + 2)], ...Map.slice(positionY + 1)]
                setMap(temp)
            }
        }
    },[positionX])

    useEffect(()=>{
        if(prevY!==undefined){
            if(positionY>prevY){
                const temp = [...Map.slice(0, positionY-1), [...Map[positionY-1].slice(0, positionX), floor, ...Map[positionY-1].slice(positionX + 1)], [...Map[positionY].slice(0, positionX), player1, ...Map[positionY].slice(positionX + 1)], ...Map.slice(positionY + 1)]
                setMap(temp)
            }else {
                const temp = [...Map.slice(0, positionY), [...Map[positionY].slice(0, positionX), player1, ...Map[positionY].slice(positionX + 1)], [...Map[positionY+1].slice(0, positionX), floor, ...Map[positionY+1].slice(positionX + 1)], ...Map.slice(positionY + 2)]
                setMap( temp)
            }
        }
    },[positionY])




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
            {printMap(Map)}
            <div>
                {positionX+" "+positionY}
            </div>
        </div>
    )
}

export default NormalMode