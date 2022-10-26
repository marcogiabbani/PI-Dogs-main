import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, clearDetail } from '../../actions';
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
                <div className='detailContainer'>
                    <h1 className="welcome-title">{myBreed[0].name}</h1>
                    <div className='container'>
                        <img className='detailImg' src={myBreed[0].image}/>
                        <h2>Temperament: {myBreed[0].temperament}</h2>
                        <h2>Weight renge: {myBreed[0].weight} KGs</h2>
                        <h2>Height range: {myBreed[0].height} cm.</h2>
                        <h2>Life span range: {myBreed[0].life_span} years</h2>
                        <Link to='/home'><button className='button-53'>Home</button></Link>
                    </div>
                </div> : <><p>Loading...</p><Link to='/home'><button className='homeButton'>Home</button></Link></>
            }
            
        </div>
    )
}