import axios from "axios"
import { useEffect, useState ,useRef,useCallback} from "react"


export const InfinteScroll=()=>{
  const Observer=useRef()
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(true)
  const [data,setData]=useState([])
  const LastRef=useCallback(node=>{
    if(Observer.current){
      Observer.current.disconnect()
    }
    Observer.current=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        setPage(page=>page+1)
      }
    })
    
    if(node){
      Observer.current.observe(node)
    }
  },[])
 
  useEffect(()=>{
    setLoading(true)
    axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=25`)
    .then(res=>{
      //console.log(res.data)
      setData([...data,...res.data])
      setLoading(false)
    })
  },[page])
  return <div style={{
    height:"550px",
    overflowY:"scroll"
  }}>
    <div style={{
    border:'10px solid blue',
    overflowY:"scroll",
    height:"300px"
  }}>
    {
      data?.map((e,index)=>{
        if(data.length===index+1){
          return <h4 ref={LastRef}  key={e.id}>{e.email}</h4>
        }else{
          return <h4 key={e.id}>{e.email}</h4>
        }
        
      })
    }
    </div>
    {
      loading?<img style={{
        width:"35px"
      }} src="https://i.stack.imgur.com/kOnzy.gif" alt="loading.."/>:null
    }
  </div>
  
}