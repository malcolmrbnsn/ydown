import React from 'react'
import VideoCard from '../components/VideoCard';
import VideoForm from "../components/VideoForm"

import Container from 'react-bootstrap/Container'
import CardColumns from 'react-bootstrap/CardColumns'

function Home(props) {
    return (
        <div>
                {
                    props.isLoggedIn && <VideoForm showAlert={props.showAlert} addVideo={props.addVideo} />
                }
            <Container fluid>
                {props.isFetching ?
                    <h1>Loading...</h1> :
                    <CardColumns>
                        {props.videos.map((video) =>
                            <VideoCard deleteVideo={props.deleteVideo} video={video} key={video._id} />
                        )}
                    </CardColumns>
                }
            </Container>
        </div>
    );
}

export default Home;
