export default function Balance({balance}){
    return(
        <div className="flex p-5 text-lg">
            <div className="font-bold">Your Balance&nbsp;</div>
            <div className="font-bold">{balance}</div>
        </div>
    )
}