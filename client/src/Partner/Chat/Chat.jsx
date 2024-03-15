import React from 'react'

import avatar1 from '../../image/demo.jpg';
import avatar2 from '../../image/demo.jpg';
import avatar3 from '../../image/demo.jpg';
import avatar4 from '../../image/demo.jpg';
import avatar5 from '../../image/demo.jpg';
import avatar6 from '../../image/demo.jpg';
import avatar7 from '../../image/demo.jpg';

import g1 from '../../image/demo.jpg';
import g2 from '../../image/demo.jpg';
import Layout from '../Layout';

const Chat = () => {

    const toggleFullscreen = (e) => {
        e.preventDefault();
        const DIV_CARD = 'div.card';
        const cardFullscreen = e.target;
        const card = cardFullscreen.closest(DIV_CARD);
        
        if (card) {
            card.classList.toggle('fullscreen');
        }
    };

  return (
    <Layout>
    <div className="p-0 page-body">
       <div className="card bg-transparent border-0">
            <div className="card-body p-1">
                <div className="sub-layout d-flex flex-row">
                    {/* <!--[ Start:: user list ]--> */}
                    <div className="order-1 custom_scroll">
                        <div className="c-list p-3">
                            <input type="search" className="form-control" placeholder="Search for..."/>
                        </div>
                        <ul className="list-group list-group-flush user-list mb-0" role="tablist">
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex">
                                    <img className="avatar rounded-circle" src={avatar1} alt=""/>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Stephen McLean</span> <small className="msg-time">12:37 PM</small></h6>
                                        <span className="text-muted small">changed an issue from "In Progress" to</span>
                                    </div>
                                </a>
                            </li>
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex">
                                    <div className="avatar rounded-circle no-thumbnail">FG</div>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Friends Group</span> <small className="msg-time">10:45 AM</small></h6>
                                        <span className="text-muted small">It is a long established fact that a reader will be distracted</span>
                                    </div>
                                </a>
                            </li>
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex">
                                    <img className="avatar rounded-circle" src={avatar3} alt=""/>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Gordon Butler</span> <small className="msg-time">10:11 AM</small></h6>
                                        <span className="text-muted small">There are many variations of passages</span>
                                    </div>
                                </a>
                            </li>
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex active">
                                    <img className="avatar rounded-circle" src={avatar4} alt=""/>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Barbara Kelly</span> <small className="msg-time">Sat</small></h6>
                                        <span className="text-muted small">Contrary to popular belief</span>
                                    </div>
                                </a>
                            </li>
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex">
                                    <img className="avatar rounded-circle" src={avatar5} alt=""/>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Robert Hammer</span> <small className="msg-time">Fri</small></h6>
                                        <span className="text-muted small">making it over 2000 years old</span>
                                    </div>
                                </a>
                            </li>
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex">
                                    <img className="avatar rounded-circle" src={avatar6} alt=""/>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Gordon Butler</span> <small className="msg-time">Fri</small></h6>
                                        <span className="text-muted small">There are many variations of passages</span>
                                    </div>
                                </a>
                            </li>
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex">
                                    <img className="avatar rounded-circle" src={avatar7} alt=""/>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Rose Rivera</span> <small className="msg-time">Thu</small></h6>
                                        <span className="text-muted small">The generated Lorem Ipsum</span>
                                    </div>
                                </a>
                            </li>
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex">
                                    <img className="avatar rounded-circle" src={avatar1} alt=""/>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Stephen McLean</span> <small className="msg-time">Wed</small></h6>
                                        <span className="text-muted small">changed an issue from "In Progress" to</span>
                                    </div>
                                </a>
                            </li>
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex">
                                    <div className="avatar rounded-circle no-thumbnail">RH</div>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Robert Hammer</span> <small className="msg-time">Wed</small></h6>
                                        <span className="text-muted small">It is a long established fact that a reader will be distracted</span>
                                    </div>
                                </a>
                            </li>
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex">
                                    <img className="avatar rounded-circle" src={avatar3} alt=""/>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Gordon Butler</span> <small className="msg-time">13/10/2020</small></h6>
                                        <span className="text-muted small">There are many variations of passages</span>
                                    </div>
                                </a>
                            </li>
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex">
                                    <img className="avatar rounded-circle" src={avatar4} alt=""/>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Barbara Kelly</span> <small className="msg-time">13/10/2020</small></h6>
                                        <span className="text-muted small">Contrary to popular belief</span>
                                    </div>
                                </a>
                            </li>
                            <li className="list-group-item b-dashed">
                                <a href="#" className="d-flex">
                                    <img className="avatar rounded-circle" src={avatar5} alt=""/>
                                    <div className="flex-fill ms-3">
                                        <h6 className="d-flex justify-content-between mb-0"><span>Robert Hammer</span> <small className="msg-time">22/10/2020</small></h6>
                                        <span className="text-muted small">making it over 2000 years old</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <!--[ Start:: email details ]--> */}
                    <div className="order-2 flex-grow-1 custom_scroll border-start">
                        <div className="action-header px-xl-4">
                            <a className="d-flex" href="#group_detail" data-bs-toggle="offcanvas" title="">
                                <div className="avatar rounded-circle no-thumbnail">FG</div>
                                <div className="ms-3">
                                    <h6 className="mb-0">Friends Group</h6>
                                    <small className="text-muted">Online</small>
                                </div>
                            </a>
                            <div className="d-flex align-items-center">
                                <a className="gray-5 px-3" href="#" data-bs-toggle="collapse" data-bs-target="#chat-search"><i className="fa fa-search"></i></a>
                                <a className="gray-5 px-3 d-none d-lg-block" href="#" data-bs-toggle="modal" data-bs-target="#video_call"><i className="fa fa-video-camera"></i></a>
                                <a className="gray-5 px-3 d-none d-lg-block" href="#"><i className="fa fa-gear"></i></a>
                                <a className="card-fullscreen small text-warning text-decoration-none ms-sm-3" href="#" data-bs-toggle="tooltip" title="Card Full Screen" onMouseDown={toggleFullscreen}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillOpacity="0.4" d="M10 0.5C10 0.367392 10.0527 0.240215 10.1464 0.146447C10.2402 0.0526784 10.3674 0 10.5 0L14.5 0C14.8978 0 15.2794 0.158035 15.5607 0.43934C15.842 0.720644 16 1.10218 16 1.5V5.5C16 5.63261 15.9473 5.75979 15.8536 5.85355C15.7598 5.94732 15.6326 6 15.5 6C15.3674 6 15.2402 5.94732 15.1464 5.85355C15.0527 5.75979 15 5.63261 15 5.5V1.5C15 1.36739 14.9473 1.24021 14.8536 1.14645C14.7598 1.05268 14.6326 1 14.5 1H10.5C10.3674 1 10.2402 0.947322 10.1464 0.853553C10.0527 0.759785 10 0.632608 10 0.5ZM0.5 10C0.632608 10 0.759785 10.0527 0.853553 10.1464C0.947322 10.2402 1 10.3674 1 10.5V14.5C1 14.6326 1.05268 14.7598 1.14645 14.8536C1.24021 14.9473 1.36739 15 1.5 15H5.5C5.63261 15 5.75979 15.0527 5.85355 15.1464C5.94732 15.2402 6 15.3674 6 15.5C6 15.6326 5.94732 15.7598 5.85355 15.8536C5.75979 15.9473 5.63261 16 5.5 16H1.5C1.10218 16 0.720644 15.842 0.43934 15.5607C0.158035 15.2794 0 14.8978 0 14.5L0 10.5C0 10.3674 0.0526784 10.2402 0.146447 10.1464C0.240215 10.0527 0.367392 10 0.5 10ZM15.5 10C15.6326 10 15.7598 10.0527 15.8536 10.1464C15.9473 10.2402 16 10.3674 16 10.5V14.5C16 14.8978 15.842 15.2794 15.5607 15.5607C15.2794 15.842 14.8978 16 14.5 16H10.5C10.3674 16 10.2402 15.9473 10.1464 15.8536C10.0527 15.7598 10 15.6326 10 15.5C10 15.3674 10.0527 15.2402 10.1464 15.1464C10.2402 15.0527 10.3674 15 10.5 15H14.5C14.6326 15 14.7598 14.9473 14.8536 14.8536C14.9473 14.7598 15 14.6326 15 14.5V10.5C15 10.3674 15.0527 10.2402 15.1464 10.1464C15.2402 10.0527 15.3674 10 15.5 10Z"/>
                                        <path fillOpacity="0.9" d="M1.14645 1.14645C1.24021 1.05268 1.36739 1 1.5 1H5.5C5.63261 1 5.75979 0.947322 5.85355 0.853553C5.94732 0.759785 6 0.632608 6 0.5C6 0.367392 5.94732 0.240215 5.85355 0.146447C5.75979 0.0526784 5.63261 0 5.5 0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V5.5C0 5.63261 0.0526784 5.75979 0.146447 5.85355C0.240215 5.94732 0.367392 6 0.5 6C0.632608 6 0.759785 5.94732 0.853553 5.85355C0.947322 5.75979 1 5.63261 1 5.5V1.5C1 1.36739 1.05268 1.24021 1.14645 1.14645Z"/>
                                        <rect fillOpacity="0.9" x="3" y="5" width="11" height="6" rx="1"/>
                                    </svg>
                                </a>
                                <button type="button" className="btn btn-sm btn-danger close-toggle ms-4"><i className="fe fe-settings mr-2"></i>Close</button>
                            </div>
                        </div>
                        <div className="collapse bg-body" id="chat-search">
                            <div className="input-group py-2 px-lg-4 px-3">
                                <input type="search" className="form-control border-0" placeholder="Search. Components, Layouts, etc..."/>
                                <div className="input-group-append ms-3">
                                    <button className="btn btn-primary" type="submit">Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="action-body custom_scroll px-xl-4">
                            <ul className="list-unstyled mb-0">
                                {/* <!--[ Chat: left ]--> */}
                                <li className="mb-4 d-flex flex-row align-items-end">
                                    <div className="max-width-70">
                                        <div className="user-info mb-1">
                                            <img className="avatar xs rounded-circle me-1" src={avatar2} alt="avatar"/>
                                            <span className="text-muted small">10:10 AM, Today</span>
                                        </div>
                                        <div className="bg-info bg-opacity-10 p-2 rounded">
                                            <div className="message">Are we meeting today?</div>
                                        </div>
                                    </div>
                                    {/* <!--[ More option ]--> */}
                                    <div className="dropdown">
                                        <a href="#" className="nav-link py-2 px-3 text-muted" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                        <ul className="dropdown-menu border-0 shadow">
                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                            <li><a className="dropdown-item" href="#">Share</a></li>
                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </li>
                                {/* <!--[ Chat: left ]--> */}
                                <li className="mb-4 d-flex flex-row align-items-end">
                                    <div className="max-width-70">
                                        <div className="user-info mb-1">
                                            <img className="avatar xs rounded-circle me-1" src={avatar6} alt="avatar"/>
                                            <span className="text-muted small">10:10 AM, Today</span>
                                        </div>
                                        <div className="bg-info bg-opacity-10 p-2 rounded">
                                            <div className="message">Hi Aiden, how are you? How is the project coming along?</div>
                                        </div>
                                        <div className="bg-info bg-opacity-10 p-2 mt-1 rounded">
                                            <div className="message">Are we meeting today?</div>
                                        </div>
                                    </div>
                                    {/* <!--[ More option ]--> */}
                                    <div className="dropdown">
                                        <a href="#" className="nav-link py-2 px-3 text-muted" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                        <ul className="dropdown-menu border-0 shadow">
                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                            <li><a className="dropdown-item" href="#">Share</a></li>
                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </li>
                                {/* <!--[ Chat: right ]--> */}
                                <li className="mb-4 d-flex flex-row-reverse align-items-end">
                                    <div className="max-width-70 text-end">
                                        <div className="user-info mb-1">
                                            <span className="text-muted small">10:12 AM, Today</span>
                                        </div>
                                        <div className="p-2 bg-body rounded">
                                            <div className="message">Project has been already finished and I have results to show you.</div>
                                        </div>
                                    </div>
                                    {/* <!--[ More option ]--> */}
                                    <div className="dropdown">
                                        <a href="#" className="nav-link py-2 px-3 text-muted" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                        <ul className="dropdown-menu border-0 shadow">
                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                            <li><a className="dropdown-item" href="#">Share</a></li>
                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </li>
                                {/* <!--[ Chat: left ]--> */}
                                <li className="mb-4 d-flex flex-row align-items-end">
                                    <div className="max-width-70">
                                        <div className="user-info mb-1">
                                            <img className="avatar xs rounded-circle me-1" src={avatar3} alt="avatar"/>
                                            <span className="text-muted small">10:10 AM, Today</span>
                                        </div>
                                        <div className="bg-danger bg-opacity-10 p-2 rounded">
                                            <div className="message"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                                        </div>
                                    </div>
                                    {/* <!--[ More option ]--> */}
                                    <div className="dropdown">
                                        <a href="#" className="nav-link py-2 px-3 text-muted" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                        <ul className="dropdown-menu border-0 shadow">
                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                            <li><a className="dropdown-item" href="#">Share</a></li>
                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </li>
                                {/* <!--[ Chat: left ]--> */}
                                <li className="mb-4 d-flex flex-row align-items-end">
                                    <div className="max-width-70">
                                        <div className="user-info mb-1">
                                            <img className="avatar xs rounded-circle me-1" src={avatar4} alt="avatar"/>
                                            <span className="text-muted small">10:10 AM, Today</span>
                                        </div>
                                        <div className="bg-warning bg-opacity-10 p-2 rounded">
                                            <div className="message"> Contrary to popular belief, Lorem Ipsum is not simply random text.</div>
                                        </div>
                                    </div>
                                    {/* <!--[ More option ]--> */}
                                    <div className="dropdown">
                                        <a href="#" className="nav-link py-2 px-3 text-muted" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                        <ul className="dropdown-menu border-0 shadow">
                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                            <li><a className="dropdown-item" href="#">Share</a></li>
                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </li>
                                {/* <!--[ Chat: right ]--> */}
                                <li className="mb-4 d-flex flex-row-reverse align-items-end">
                                    <div className="max-width-70 text-end">
                                        <div className="user-info mb-1">
                                            <span className="text-muted small">10:12 AM, Today</span>
                                        </div>
                                        <div className="p-2 bg-body rounded">
                                            <div className="message">
                                                Yes, Orlando Allredy done <br/> There are many variations of passages of Lorem Ipsum available
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!--[ More option ]--> */}
                                    <div className="dropdown">
                                        <a href="#" className="nav-link py-2 px-3 text-muted" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                        <ul className="dropdown-menu border-0 shadow">
                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                            <li><a className="dropdown-item" href="#">Share</a></li>
                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </li>
                                {/* <!--[ Chat: left ]--> */}
                                <li className="mb-4 d-flex flex-row align-items-end">
                                    <div className="max-width-70">
                                        <div className="user-info mb-1">
                                            <img className="avatar xs rounded-circle me-1" src={avatar1} alt="avatar"/>
                                            <span className="text-muted small">10:10 AM, Today</span>
                                        </div>
                                        <div className="bg-success bg-opacity-10 p-2 rounded">
                                            <div className="message">
                                                <p>Please find attached images</p>
                                                <img className="img-thumbnail me-1" src={g1} alt="" style={{width: "100px"}} />
                                                <img className="img-thumbnail" src={g2} alt="" style={{width: "100px"}} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!--[ More option ]--> */}
                                    <div className="dropdown">
                                        <a href="#" className="nav-link py-2 px-3 text-muted" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                        <ul className="dropdown-menu border-0 shadow">
                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                            <li><a className="dropdown-item" href="#">Share</a></li>
                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </li>
                                {/* <!--[ Chat: right ]--> */}
                                <li className="mb-4 d-flex flex-row-reverse align-items-end">
                                    <div className="max-width-70 text-end">
                                        <div className="user-info mb-1">
                                            <span className="text-muted small">10:12 AM, Today</span>
                                        </div>
                                        <div className="p-2 bg-body rounded">
                                            <div className="message">Okay, will check and let you know.</div>
                                        </div>
                                    </div>
                                    {/* <!--[ More option ]--> */}
                                    <div className="dropdown">
                                        <a href="#" className="nav-link py-2 px-3 text-muted" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                        <ul className="dropdown-menu border-0 shadow">
                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                            <li><a className="dropdown-item" href="#">Share</a></li>
                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="action-footer chat-msg d-flex px-xl-4">
                            <div className="btn btn-link file-input">
                                <input type="file" className="form-control" name="file-input" id="file-input"/>
                                <label htmlFor="file-input" className="fa fa-paperclip"></label>
                            </div>
                            <input type="text" className="form-control bg-transparent border-0" placeholder="Enter text here..."/>
                            <button className="btn btn-dark text-uppercase" type="button">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!--[ Start:: chat group detail ]--> */}
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="group_detail">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">Group Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="avatar xl rounded-circle no-thumbnail fs-4">FG</div>
                <h4 className="mt-4">Friends Group</h4>
                <p>Washington, d.c.</p>
                <small className="text-muted">Email address: </small>
                <p>louispierce@example.com</p>
                <small className="text-muted">Group Admin: </small>
                <p>Louis Pierce</p>
                <small className="text-muted">Group Menmber: </small>
                <div className="avatar-list avatar-list-stacked mb-3 px-3">
                    <img className="avatar sm rounded-circle" src={avatar5} data-bs-toggle="tooltip" title="Avatar"/>
                    <img className="avatar sm rounded-circle" src={avatar6} data-bs-toggle="tooltip" title="Avatar"/>
                    <img className="avatar sm rounded-circle" src={avatar1} data-bs-toggle="tooltip" title="Avatar"/>
                    <img className="avatar sm rounded-circle" src={avatar4} data-bs-toggle="tooltip" title="Avatar"/>
                    <span>+4</span>
                </div>
                <small className="text-muted">Group Created: </small>
                <p className="mb-0">October 2021</p>
            </div>
        </div>
    </div> 
    </Layout>
  )
}

export default Chat