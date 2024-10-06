import Card from './components/card';
import Heading from './components/heading';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Success = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const heading = searchParams.get('state');
    const body = searchParams.get('msg');

    return(
        <Card>
            <Heading text={heading}/>
            {body}
            <button
          type="button"
          onClick={()=>{
            navigate("/")
          }}
          className="bg-purple-200 p-2 rounded-xl border-2 border-purple-300 text-sm md:text-base lg:text-lg hover:bg-purple-300 shadow-xl hover:border-purple-400 transition-all ease-in-out delay-75 hover:shadow-md"
        >
          {"Home"}
        </button>
        </Card>
    )
}


export default Success