import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

import Jobs from '../../components/jobInfo/AllJobs'
import Pagination from '../../components/pagination/Pagination'
import { JobForm } from '../../components/cover_letter/CoverLetterForm';



const JobList = () => {
    let history = useHistory()

    const [accessToken] = useState(localStorage.getItem('access_token'))
    const [jobProps, setJobProps] = useState([])
    const [allJobs, setAllJobs] = useState([])
    const [next, setNext] = useState([])
    const [onPrevious, setOnPrevious] = useState([])
    const [loaded, setLoaded] = useState({isLoaded: false})
    const [pageIndex, setPageIndex] = useState(1)
    const [count, setCount] = useState(0)

    useEffect(() => {

        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`http://127.0.0.1:3000/api/jobs/`, )
        .then( res => {
            setAllJobs(res.data.results)
            return res
        })
        .then(response => {
            setAllJobs(response.data.results)
            setJobProps(response.data)
            setNext(response.data.next)
            setCount(response.data.count)
            setOnPrevious(response.data.previous)
        })
        .then(() => {
            setLoaded({isLoaded: true})
        })
        .catch(err => {
            history.push('/login')
            alert(err)
        })
    }, [])
    
    if (loaded.isLoaded) {
        if (allJobs.length) {
            return (
                <div>
                    <h1>All Jobs:</h1>
                    <div className="Jobs-container">
                        <Jobs jobs={allJobs} jobProps={jobProps}/>
                    </div>
                    <footer>
                        <Pagination 
                            pageIndex={pageIndex} 
                            total={count} 
                            perPage={20} 
                            onNext={next}
                            onPrevious={onPrevious}
                            setAllJobs={setAllJobs}
                            setNext = {setNext}
                            setOnPrevious={setOnPrevious}
                            setPageIndex={setPageIndex}
                        />
                    </footer>
                </div>
            )
        } else {
            return (
                <div>
                    No Jobs - Please create your first cover letter below.
                    <JobForm requestType="post" jobID={null} buttonTxt="Create Cover Letter" />
                </div>
            )
        }
    } else {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }

}

export default JobList