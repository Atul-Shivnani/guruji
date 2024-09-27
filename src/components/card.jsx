
const Card = ({children}) =>{
    return (
        <div className="fixed min-w-fit w-1/4 p-10 rounded-3xl bg-purple-200 border bg-opacity-75 flex flex-col justify-center items-center gap-8 shadow-2xl shadow-purple-300">
            {children}
        </div>
    )
}

export default Card;