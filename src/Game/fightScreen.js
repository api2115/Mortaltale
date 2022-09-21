import {useEffect, useState} from "react";
import {floor} from "./objects";

function FightScreen({enemy,setEnemy,player,setPlayer,fightOutcome,setFightOutcome}){
    const [fightmsg,setFightmsg] = useState("")

    useEffect(()=>{
        if(enemy.enemy.stats.hp<=0){
            const temp = [...enemy.Map.slice(0,enemy.enemyY),[...enemy.Map[enemy.enemyY].slice(0,enemy.enemyX),floor,...enemy.Map[enemy.enemyY].slice(enemy.enemyX+1)],...enemy.Map.slice(enemy.enemyY+1)]
            setFightOutcome({msg:"you won",newroom:temp})
        }
        if(player.stats.hp<=0){
            setFightOutcome({msg:"you lost"})

        }
    },[enemy,player])

    function damagecalc(e){
        const listQuick=[0.9,1,1,0.8,0.9,1,0.7,0.8,1.1,1,1,0.8]
        const listStrong=[1.1,0,1.2,0,0,1.6,1.5,1.7,1.4,1.3,1.4,1.3,1.5,1.2,0]

        if(e==="Quick"){
            const dmg = listQuick[Math.floor(Math.random()*listQuick.length)]
            const calcdmg = Math.round((dmg*player.stats.strength))
            return(calcdmg)
        }else if(e==="Strong"){
            const dmg = listStrong[Math.floor(Math.random()*listStrong.length)]
            const calcdmg = Math.round((dmg*player.stats.strength))
            return(calcdmg)
        }
    }

    function enemydamagecalc(){
        const listdmg = [1,1.1,1,1.1,0.9,1,0.7,0.8,1.2,0,1,1.6,0.9,0.8,1,0.8,0.9,1.1,1.2,]
        const dmg = listdmg[Math.floor(Math.random()*listdmg.length)]*enemy.enemy.stats.strength
        const calcdmg = Math.round(dmg * (1-(player.stats.defence/(player.stats.defence+100))))
        return(calcdmg)
    }

    function fight(e){
        const pdmg = damagecalc(e.target.id)
        const edmg = enemydamagecalc()
        if(player.stats.speed>enemy.enemy.stats.speed){
            setEnemy({enemy:{symbol:enemy.enemy.symbol,stats:{...enemy.enemy.stats,hp:enemy.enemy.stats.hp-pdmg}},enemyX:enemy.enemyX,enemyY:enemy.enemyY,Map:enemy.Map})
            if(enemy.enemy.stats.hp>0){
                setPlayer({symbol:player.symbol,stats:{...player.stats,hp:player.stats.hp-edmg}})
            }
        }else{
            setPlayer({symbol:player.symbol,stats:{...player.stats,hp:player.stats.hp-edmg}})
            if(player.stats.hp>0){
                setEnemy({enemy:{symbol:enemy.enemy.symbol,stats:{...enemy.enemy.stats,hp:enemy.enemy.stats.hp-pdmg}},enemyX:enemy.enemyX,enemyY:enemy.enemyY,Map:enemy.Map})
            }
        }
        setFightmsg(`Player-${edmg} Enemy-${pdmg}`)



    }


    return(
        <div>
            <div>Fight</div>
            <div>{enemy.enemy.symbol}</div>
            <div>
                {`${enemy.enemy.stats.hp}/${enemy.enemy.stats.maxhp}`}
            </div>
            <div>{fightmsg}</div>
            <button id={"Quick"} onClick={fight} >Quick attack</button>
            <button id={"Strong"} onClick={fight}>Strong attack</button>

            {/*<button onClick={()=>setPlayer({symbol:player.symbol,stats:{...player.stats,hp:player.stats.hp-1}})}>test</button>*/}
            {/*<button onClick={()=>setEnemy({symbol:enemy.symbol,stats:{...enemy.stats,hp:enemy.stats.hp-1}})}>test2</button>*/}
        </div>
    )
}

export default FightScreen