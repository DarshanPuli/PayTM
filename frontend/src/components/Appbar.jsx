export default function Appbar({user}){
    return(
        <div className="flex justify-between items-center p-5 shadow">
            <div className="font-bold text-xl">Payments App</div>
            <div className="flex items-center ">
                <div className="mr-10 font-medium">Hello, {user}</div>
                <button className="bg-gray-300 rounded-full w-10 h-10">U</button>
            </div>
        </div>
    )
}