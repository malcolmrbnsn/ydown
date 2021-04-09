import React from 'react'
import VideoCard from '../components/VideoCard';
import VideoForm from "../components/VideoForm"

import Container from 'react-bootstrap/Container'
import CardColumns from 'react-bootstrap/CardColumns'

function Home(props) {
    return (
        <div>
            <Container fluid>
                {
                    props.loggedIn && <VideoForm newVideo={props.newVideo} />
                }

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
