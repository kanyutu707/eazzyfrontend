import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDropleftCircle, IoMdArrowDropleft, IoMdArrowDroprightCircle } from "react-icons/io";
import { MdArrowCircleRight } from "react-icons/md";
import { Loader } from 'lucide-react';
import './ActiveBookings.css';

const ActiveBookings = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://eazzybackend-production.up.railway.app/applications/getAll",
                    {
                        headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`Network response was not ok`);
                }

                const data = await response.json();
                const loggedIn = parseInt(sessionStorage.getItem('id'));
                const filteredData = data.filter(userapplication => 
                    userapplication.applicant.id === loggedIn && 
                    userapplication.applicationStatus === "ACTIVE"
                );
                setApplications(filteredData);
            } catch (error) {
                setError(`Error encountered: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const moveToView = (id) => {
        navigate(`/client/activeuserview/${id}`);
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className='activebookingscontainer'>
            <header>ACTIVE APPLICATIONS</header>
            
            {isLoading ? (
                <div className="loading-container">
                    <Loader className="spinner" size={40} />
                    <p>Loading applications...</p>
                </div>
            ) : (
                <>
                    <div className="controls">
                        <IoIosArrowDropleftCircle className="control-icon" />
                        <IoMdArrowDropleft className="control-icon" />
                        <input 
                            type="search" 
                            placeholder='INPUT SEARCH ITEM'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span>1/25</span>
                        <IoMdArrowDroprightCircle className="control-icon" />
                        <MdArrowCircleRight className="control-icon" />
                    </div>

                    {applications.length === 0 ? (
                        <div className="no-data-message">
                            No active applications found.
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>POSITION</th>
                                    <th>JOB TYPE</th>
                                    <th>DESCRIPTION</th>
                                    <th>SALARY</th>
                                    <th>APPLICATION DATE</th>
                                    <th></th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application, index) => (
                                    <tr key={application.id}>
                                        <td>{index + 1}</td>
                                        <td className='titleStyle'>{application.posting?.title}</td>
                                        <td>{application.posting?.postType}</td>
                                        <td>{application.posting?.description}</td>
                                        <td>{application.posting?.salary}</td>
                                        <td>{application.applicationDate}</td>
                                        <td></td>
                                        <td>
                                            <button 
                                                className="view-button"
                                                onClick={() => moveToView(application.id)}
                                            >
                                                VIEW
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
}

export default ActiveBookings;