import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';

export default function Detail(props) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])


    const myBreed = useSelector((state) => state.detail);

    return (
        <div>
            {
                myBreed.length > 0 ? 
                <div>
                    <h1>{myBreed[0].name}</h1>
                    {/* si decido cargarle fotito podria ponersela aca
                    
                    ademas tenfo que traer toda la data que me pide el readme */}
                </div> : <p>Loading...</p>
            }
            <Link to='/home'><button>Home</button></Link>
        </div>
    )
}