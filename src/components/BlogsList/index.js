import {Component} from 'react'

import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogingData: [], loading: true}

  componentDidMount() {
    this.getbolgs()
  }

  getbolgs = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    console.log(data)
    const updatedata = data.map(each => ({
      id: each.id,
      title: each.title,
      imageUrl: each.image_url,
      avatarUrl: each.avatar_url,
      author: each.author,
      topic: each.topic,
    }))
    this.setState({blogingData: updatedata})
    this.setState({loading: false})
  }

  render() {
    const {blogingData, loading} = this.state
    return (
      <div className="blog-list-container">
        {loading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          <div>
            {blogingData.map(item => (
              <BlogItem blogData={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default BlogsList
