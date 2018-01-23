import React, {Component} from 'react'
import spotifyApi from '../api/init'
import Album from './Album'

class Songs extends Component {
    constructor(props) {
        super(props)

        const query = new URLSearchParams(props.location.search);
        const access_token = query.get('access_token')

        this.state = {
            albums: [],
            access_token
        }
    }

    componentWillMount() {
        this.getSongs(this.state.access_token)
    }

    getSongs = (access_token) => {
        spotifyApi("/browse/new-releases", {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          })
          .then(data => {
            const albums = data.data.albums.items
            this.setState(() => {
              return {
                albums
              }
            })
          })
          .catch(err => console.error(err.message))
    }

    render() {
        const albums = this.state.albums.map(album => {
            return <Album key={album.id} {...album} />
        })
        return <div className="albums">
            {albums}
        </div>
    }
}

export default Songs