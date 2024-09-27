import Card from './components/card';
import Heading from './components/heading';
import { useSearchParams } from 'react-router-dom';


const Success = () => {
    const [searchParams] = useSearchParams();
    const heading = searchParams.get('state');
    const body = searchParams.get('msg');

    return(
        <Card>
            <Heading text={heading}/>
            {body}
        </Card>
    )
}


export default Success