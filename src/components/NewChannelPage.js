import { CallMissedSharp, Code } from '@material-ui/icons';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from './Header';

// https://www.billboard.com/charts/greatest-hot-100-singles/
const topSongs = [
  { title: 'Blinding Lights', artist: 'The Weeknd' },
  { title: 'The Twist', artist: 'Chubby Checker' },
  { title: 'Smooth', artist: 'Santana Ft Rob Thomas' },
  { title: 'Mack The Knife', artist: 'Bobby Darin' },
  { title: 'Uptown Funk!', artist: 'Mark Ronson Ft Bruno Mars' },
  { title: 'How Do I Live', artist: 'LeAnn Rimes' },
  { title: 'Party Rock Anthem', artist: 'LMFAO' },
  { title: 'I Gotta Feeling', artist: 'The Black Eyed Peas' },
  { title: 'Macarena', artist: 'Los Del Rio' },
  { title: 'Shape Of You', artist: 'Ed Sheeran' }
]

const NewChannelPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/channels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      },
      body: JSON.stringify({
        title: e.target.querySelector("#title").value,
        description: e.target.querySelector("#description").value,
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      dispatch({ type: 'ADD_CHANNEL', channel: data})
      history.push('./channels')
    })
  }
  return (


    <div>
<Header />
<div className={classes.topRibbon}>
    Create a Channel
</div>
<Card className={classes.topRibbonDivider} variant="outlined"></Card>
<Card className={classes.card} variant="outlined">
    <form onSubmit={(e) => handleSubmit(e)}>
        <input className={classes.textInputs} placeholder='Title(max 300)' id="title" style={{width: 683}} />
        <textarea className={classes.textInputs} id="description" placeholder="Description(optional)" cols='100' rows='8'></textarea>
        <button type="submit" className={classes.submitButton}>Create</button>
    </form>
</Card>
</div>
  // Same code but throwing a syntax error
  // <div>
  // <Header />
  // <div>
  //   Create Channel
  // </div>
  //   <Card className={classes.topRibbon}></Card>
  //   <Card className={classes.topRibbonDivider} variant="outlined">
  //     <form onSubmit={(e) => handleSubmit(e)}>
  //       <input className={classes.textInputs} placeholder='Title(max 50)' id="title" style={{width: 683}} />
  //       <textarea className={classes.textInputs} id="description" placeholder="Description(optional)" cols='100' rows='8'></textarea>
  //       <button type="submit" className={classes.submitButton}>Create</button>
  //     </form>
  //   </Card>
  // </div>
  )
}

export default NewChannelPage;