import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Header from './Header'
import PostCard from './PostCard'



const ChannelPage = () => {
    const dispatch = useDispatch();
    const URL = useParams()

    const currentUser = useSelector(state => state.user.currentUser)

    const allChannels = useSelector(state => state.channels.allChannels)
    const posts = useSelector(state => state.posts.allPosts)
    const [ allPosts, setAllPosts ] = useState(posts)

    const userFetch = useSelector(state => state.user.userFetch)

    const stateJoined = useSelector(state => state.user.joined)

    const [ moderator, setModerator ] = useState(false)

    let currentChannelPosts = false
    let currentChannel

    if (userFetch) {
        currentChannel = allChannels.find(channel => channel.title === URL.channel_title)
        if (currentChannel.channelPmembers.find(chanMember => chanMember.user_id === currentUser.id) && stateJoined === false){
            console.log("current channel if statement")
            dispatch({type: 'SET_JOINED', joined: true})
        } else if (!currentChannel.channel.members.find(chanMembers => chanMembers.user_id === currentUser.id) && stateJoined === true ){
            dispatch({type: 'SET_JOINED', joined: false })
        }
        const channelPosts = allPosts.filter(post => post.postable_type === "Channel")
        currentChannelPosts = channelPosts.filter(post => post.postable_id === currentChannel.id)
    }

    if (currentChannel) {
        if (currentChannel.channel_owners.find(chanOwners => chanOwners.user_id === currentUser.id) && moderator == false){
            setModerator(true)
        } else if (!currentChannel.channel_owners.find(chanOwner => chanOwner.user_id === currentUser.id) && moderator === true){
            setModerator(false)
        }
    }

    const handleJoin = (e) => {

        if (stateJoined){
            let chanMembs = currentChannel.channel_members.find(chanMemb => chanMemb.user_id === currentUser.id)

            fetch(`fetch('http://localhost:3000/channel_members/${chanMembs.id})`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-key': localStorage.getItem('auth_key')
                }
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
        }
    }


    const removePost = (post) => {
        setAllPosts(allPosts.filter(p => p.id !== post.id))
    }


  return (
    <div>
        {(currentChannelPosts) ?
            <div>
                <Header />
                    <div></div>
                    {(currentChannel) ? <div>
                        <div>
                            <div>
                                <div>

                                </div>

                                <div>


                                </div>
                            </div>
                        </div>
                    </div> : null }

                    <div>
                        <p></p>
                        <div>
                            {
                            (moderator) ?
                            <Card>
                                <div>

                                </div>
                            </Card>
                            : null
                            }
                        </div>
                        <Grid>
                            {currentChannelPosts.map(post => <PostCard key={post.id} post={post} mod={moderator} deletePost={removePost} channel={currentChannel}/>)}
                        </Grid>
                    </div>

            <div/>
            : null
        }

    </div>
  )
}

export default ChannelPage;