import axios from 'axios'
import { useState } from 'react'
import _ from 'lodash'

const ChatContainer = () => {
  const [loaded, setLoaded] = useState(false)
  // const { authContext } = useContext(AuthContext);
  // const { token } = authContext;
  const [matchList, setMatchList] = useState({})

  const fetchCurrentUserMatches = () => {
    axios
      .get(`${process.env.REACT_APP_PUBLIC_API_URL}/chat/`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          // 'x-access-token': token,
          'x-access-token': '',
        },
      })
      .then((response) => {
        setMatchList(response.data)
        return response.data
      })
      .catch((error) => {
        if (process.env.REACT_APP_VERBOSE === 'true') console.log(error)
      })
  }

  if (_.isEmpty(matchList) && loaded === false) {
    fetchCurrentUserMatches()
    setLoaded(true)
  }
  return { matchList }
}

export default ChatContainer
