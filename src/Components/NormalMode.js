import {useEffect, useRef, useState} from 'react'
import {FrontDoor,wall,floor} from "../Game/objects";
import {printMap,move} from "../Game/actions"
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
    const prevXY = usePrevious({x:positionX,y:positionY})
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
            [wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall]
        ]
    )



    useEffect(()=>{
        document.addEventListener('keydown',detectKeyDown,true)
    },[])

    useEffect(()=>{
        if(prevXY!==undefined) {
            const madeMove=move(Map,positionX,positionY,prevXY)
            if(madeMove!==undefined) {
                setMap(madeMove.newroom)
                setPositionX(madeMove.newposX)
                setPositionY(madeMove.newposY)
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
            {printMap(Map)}
            <div>
                {positionX+" "+positionY}
            </div>
        </div>
    )
}

export default NormalMode