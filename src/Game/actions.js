

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