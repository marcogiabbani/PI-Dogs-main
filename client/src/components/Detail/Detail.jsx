import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import "./Detail.css"

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
                <div className='detail'>
                    <div className='detail-card'>
                    <h1>{myBreed[0].name}</h1>
                    <img src={myBreed[0].image}/>
                    
                    <h2>Temperament: {myBreed[0].temperament}</h2>
                    <h2>Weight renge: {myBreed[0].weight.metric} KGs</h2>
                    <h2>Height range: {myBreed[0].height.metric} mts.</h2>
                    <h2>Life span range: {myBreed[0].life_span} years</h2>
                    </div>
                </div> : <p>Loading...</p>
            }
            <Link to='/home'><button>Home</button></Link>
        </div>
    )
}