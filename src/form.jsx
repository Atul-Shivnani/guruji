const Form = ({children}) => {
    return (
        <form className='flex flex-col bg-transparent w-full'>
            {children}
        </form>
    )
}

export default Form